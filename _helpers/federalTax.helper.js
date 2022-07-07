// const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getFederalTax: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null, output) => {
        if (exemp == null) {
            exemp = 0;
        }
        var federal_tax = paystubConfig[year].federal_tax;
        var exp = paystubConfig[year].exp;
        var deduction = federal_tax[maritalStatus]['deduction'];
        var brackets = federal_tax[maritalStatus]['brackets'];
        var rates = federal_tax[maritalStatus]['rates'];
        var income = paymentTotal * paymentMode - deduction;
        income = income > 0 ? income : 0;
        var tax = 0;

        if (exemp > 0)
            income = income - (exp['annual']['rate'] * exemp);

        for (let i = 0; i < brackets.length; i++) {
            if (income >= brackets[i]) {
                var nextBracket = brackets[i + 1] ? Math.min(brackets[i + 1], income) : income;
                tax += (nextBracket - brackets[i]) * rates[i] / 100;
            } else {
                break;
            }
        }
        output['testing'] = "Testing";
        tax = paymentMode ? tax / paymentMode : tax;
        // console.log ("Tax: ",Math.round(tax* 100) / 100);
        if (tax > 0)
            return Math.round(tax * 100) / 100;
        else
            return Math.round(0 * 100) / 100;

    },
    getFederalTaxByAnnual: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {

        if (exemp == null) {
            exemp = 0;
        }

        var annual = paystubConfig[year].annual;

        var exp = paystubConfig[year].exp;

        var federalTax = 0;
        var federalDuration = "annual";

        if (exemp > 0) {
            var taxableAmount = (paymentTotal * paymentMode) - (exp[year][federalDuration][year]['rate'] * exemp);
        } else {
            taxableAmount = paymentTotal * paymentMode;
        }

        for (var i = 0; i <= 6; i++) {
            var federalTaxExceed = annual[maritalStatus][i]['exceed'];
            var federalTaxRate = annual[maritalStatus][i]['percent'];
            var federalTaxSub = annual[maritalStatus][i]['sub'];
            var federalTaxMin = annual[maritalStatus][i]['min'];
            var federalTaxMax = annual[maritalStatus][i]['max'];
            if(typeof annual[maritalStatus][i]!== 'undefined'){
                if (i == 0) {
                    if (taxableAmount < federalTaxMin) {
                       var federal_tax_total = 0;
                        break;
                    }
                    else if (taxableAmount >= federalTaxMin && taxableAmount <= federalTaxMax) {
                        federalTax = federalTaxRate / 100;
                        break;
                    }
                }
                else {
                    if (taxableAmount >= federalTaxMin && taxableAmount <= federalTaxMax) {
                        federalTax = federalTaxRate / 100;
                        break;
                    }
                    else if (taxableAmount >= federalTaxMin && federalTaxMax == '') {
                        federalTax = federalTaxRate / 100;
                        break;
                    }
                }
            }
        }
        var totalTaxAmount = federalTaxSub + (taxableAmount - federalTaxExceed) * federalTax;
        console.log(totalTaxAmount);

        if (totalTaxAmount == 0 || paymentMode == 0)
        {
           federal_tax_total = 0;
        }
        else
        {
            federal_tax_total = totalTaxAmount / paymentMode;
        }

        return federal_tax_total;

    },
    getFederalTaxYTD: async (federalTax, pre_stub_federal_tax_ytd_total, previ_payDate_year, current_payDate_year, month, term, exemp) => {
        var federal_tax_ytd_total = 0;
        if (federalTax == 0 && exemp != 0) {
            federalTax = Math.round(0 * 100) / 100;
            if (typeof pre_stub_federal_tax_ytd_total !== 'undefined') {
                federal_tax_ytd_total = Math.round(pre_stub_federal_tax_ytd_total * 100) / 100;
            } else {
                federal_tax_ytd_total = federalTax;
            }
        } else if (federalTax != 0) {
            if (typeof pre_stub_federal_tax_ytd_total !== 'undefined') {
                if (previ_payDate_year && current_payDate_year && previ_payDate_year != current_payDate_year) {
                    federal_tax_ytd_total = federalTax;
                } else {
                    federal_tax_ytd_total = Math.round((federalTax + pre_stub_federal_tax_ytd_total) * 100) / 100;
                }
            } else {
                federal_tax_ytd_total = Math.round((federalTax * month * term) * 100) / 100;
            }
        }
        return federal_tax_ytd_total;
    }

};