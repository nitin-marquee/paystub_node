const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getStateTax: async (year, maritalStatus, paymentTotal, paymentMode, state) => {

        var stateTax = 0;
        // var annualDuration = 'annual';
        var taxableIncome = paymentTotal * paymentMode;
        var tax = paystubConfig[year].state_tax;
        var stateTaxRules = tax[state][maritalStatus];
        // console.log("stateTaxRules: ", stateTaxRules)
        var stateTaxBrackets = stateTaxRules['brackets'];
        // console.log("stateTaxBrackets: ", stateTaxBrackets)
        // console.log("stateTaxBracketsCount: ", stateTaxBrackets.length)
        var stateTaxRates = stateTaxRules['rates'];
        var stateTaxdeDuctions = stateTaxRules['deductions'];


        if (taxableIncome > 0 && typeof stateTaxdeDuctions !== 'undefined' && stateTaxdeDuctions) {
            taxableIncome = taxableIncome - stateTaxdeDuctions;
        }

        if (taxableIncome < 0) {
            taxableIncome = 0;
        }


        var processedIncome = 0;
        var stateTaxBracketsCount = stateTaxBrackets.length;
        // console.log("stateTaxBracketsCount: ", stateTaxBracketsCount)
        for (let i = 0; i < stateTaxBracketsCount; i++) {
            if (taxableIncome >= stateTaxBrackets[i]) {

                let chunk = 0;
                if (typeof stateTaxBrackets[i + 1] !== 'undefined' && stateTaxBrackets[i + 1] !== 0) {
                    if (stateTaxBrackets[i + 1] < taxableIncome) {
                        chunk = stateTaxBrackets[i + 1] - processedIncome;
                    } else {
                        chunk = taxableIncome - processedIncome;
                    }
                } else {
                    chunk = taxableIncome - processedIncome;
                }
                processedIncome += chunk;
                stateTax += chunk * stateTaxRates[i] / 100;
            }
        }
        if (stateTax == 0 || paymentMode == 0) {
            stateTax = 0;
        }
        else {
            stateTax = stateTax / paymentMode;
        }

        var state_tax_total = Math.round(stateTax * 100) / 100;

        return state_tax_total;

    },
    getStateTaxYTD: async (state_tax_total, pre_stub_state_tax_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff)=> {
        var state_tax_ytd_total = 0;
        if (typeof pre_stub_state_tax_ytd_total !== 'undefined') {
            if (previ_payDate_year != current_payDate_year) {
                state_tax_ytd_total = Math.round(state_tax_total * 100) / 100;
            } else {
               state_tax_ytd_total = Math.round((state_tax_total + pre_stub_state_tax_ytd_total)*100)/100;
            }
        } else {
            state_tax_ytd_total = Math.round(state_tax_total * month * tdiff*100)/100;
        }

        return state_tax_ytd_total;
    }
};
