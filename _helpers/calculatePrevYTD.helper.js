
const FEDERALTAXHELPER = require("./federalTax.helper");
const STATETAXHELPER = require("./stateTax.helper");
const FLVTAXHELPER = require("./flv.helper");
const MEDITAXHELPER = require("./medi.helper");
const SDITAXHELPER = require("./sdi.helper");
const SOCIALTAXHELPER = require("./social.helper");
const WCTAXHELPER = require("./wc.helper");
const WFTAXHELPER = require("./wf.helper");
// const EXPTAXHELPER = require("./exp.helper");
const SUITAXHELPER = require("./sui.helper");
const REGEXPATTERN = require("../utils/regexPattern");

module.exports = {

    calculatePreviousYtd: async (var1, payload, pre_stub, i_index, total_hours = 0) => {
        // var payload = req.body;

        var output = {};
        var custome_earnings_count = payload.custome_earnings_count;
        // var totalCustomeEarnings = 0;
        var totalYtdCustomeEarnings = 0;

        output['ytd1'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd1']));
        output['ytd2'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd2']));
        output['ytd3'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd3']));
        output['ytd4'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd4']));
        output['ytd5'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd5']));
        output['ytd6'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd6']));
        output['ytd7'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd7']));
        output['tytd'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_tytd']));

        for (let k = 1; k <= custome_earnings_count; k++) {
            output['custome_earnings_ytd'+k+'']=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_custome_earnings_ytd'+k+'']));
            totalYtdCustomeEarnings = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalYtdCustomeEarnings.replace(",", "",)) + REGEXPATTERN.converttofloat(output['custome_earnings_ytd'+k+''].replace(",", "", ))));
        }

        output['tytd'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(var1['pre_ytd1'].replace(",", "",)) + REGEXPATTERN.converttofloat(var1['pre_ytd2'].replace(",", "",)) + REGEXPATTERN.converttofloat(var1['pre_ytd3'].replace(",", "",)) + REGEXPATTERN.converttofloat(var1['pre_ytd4'].replace(",", "",)) + REGEXPATTERN.converttofloat(var1['pre_ytd5'].replace(",", "",)) + REGEXPATTERN.converttofloat(var1['pre_ytd6'].replace(",", "",)) + REGEXPATTERN.converttofloat(var1['pre_ytd7'].replace(",", "",)) + REGEXPATTERN.converttofloat(totalYtdCustomeEarnings.replace(",", ""))));


        var paymentTotal = REGEXPATTERN.converttofloat(payload.cTotal);
        var state = payload.state;
        var paymentMode = payload.payMode;
        var exemp = parseInt(payload.exemp);
        var maritalStatus = payload.mStatus.toLowerCase();
        var pay_date = payload.pay_date;

        // var away_date = typeof payload.away_date ? payload.away_date : '';
        var empYTD = payload.empYTD;
        var custome_deduction_count = payload.custome_deduction_count;

        var pay_period_start = payload.pay_period_start;
        var pay_period_end = payload.pay_period_end;

        var duration = '';

        var month = new Date(pay_date).getMonth() + 1; //  date("m", strtotime(pay_date));
		var year = new Date(pay_date).getYear(); //date("Y", strtotime(pay_date));
		// var day = new Date(pay_date).getDate(); //date("d", strtotime(pay_date));
        var term = 0;


        var current_payDate_year = year;

        var diffDate = Math.abs(new Date(pay_period_end), new date(pay_period_start));

        var diffDay = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

        var previ_payDate_year = new Date("Y", Date.parse("-", (diffDay + 1), " days", Date.parse(pay_date)));

        output['pay_period_end'] = pay_period_end.replace("/", "/"); //str_replace("/", "/", pay_period_end);
        output['pay_date'] = pay_date;

        var ddate = new Date(Date.parse(pay_date)).toISOString();
		console.log(ddate);
		var date = new Date(ddate);

        // Calculate working days of ther year
        var endDate = Date.parse(ddate);
        var startDate = Date.parse(year, "-01-01");
        var days = (endDate - startDate) / 86400 + 1;
        var no_full_weeks = parseInt(days / 7);
        var no_remaining_days = days % 7;
        var the_first_day_of_week = date("N", startDate);
        var the_last_day_of_week = date("N", endDate);

        if (the_first_day_of_week <= the_last_day_of_week) {
            if (the_first_day_of_week <= 6 && 6 <= the_last_day_of_week) no_remaining_days--;
            if (the_first_day_of_week <= 7 && 7 <= the_last_day_of_week) no_remaining_days--;
        }
        else {
            if (the_first_day_of_week == 7) {
                no_remaining_days--;

                if (the_last_day_of_week == 6) {
                    no_remaining_days--;
                }
            }
            else {
                no_remaining_days -= 2;
            }
        }
        var workingDays = no_full_weeks * 5;
        if (no_remaining_days > 0) {
            workingDays += no_remaining_days;
        }

        switch (paymentMode) {
            case 260:
                duration = 'daily';

                term = workingDays;
                break;
            case 52:
                duration = 'weekly';

                days = date.dayOfYear(); //date -> format("z") + 1;
                term = Math.ceil(days / 7);
                term = term == 53 ? 52 : term;
                break;
            case 26:
                duration = 'biweekly';

                days = date.dayOfYear(); //date -> format("z") + 1;
                term = Math.ceil(days / 14);
                term = term == 27 ? 26 : term;
                break;
            case 12:
                duration = 'monthly';

                term = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); // date -> format("m");
                term = term == 13 ? 12 : term;
                break;
            case 24:
                duration = 'semimonthly';

                days = date.dayOfYear(); //date -> format("z") + 1;
                term = Math.ceil(days / 15);
                term = term == 25 ? 24 : term;
                break;
            case 4:
                duration = 'quarterly';

                var months = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); // date -> format("m");
                term = Math.ceil(months / 3);
                break;
            case 2:
                duration = 'semiannual';

                months = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); // date -> format("m");
                term = Math.ceil(months / 6);
                break;
            case 1:
                duration = 'annual';

                term = 1;
                break;
        }
        output['pay_period_start'] = pay_period_start;

        // var makeItNew = 0;

        if ( previ_payDate_year != current_payDate_year) {
            // makeItNew = 1;
            term = 1;
        }

        var tdiff = 1;
        var indexn = i_index + 1;
        if (empYTD != '') {
            if (indexn == empYTD) {
                tdiff = 0;
            } else if (empYTD > term) {
                tdiff = term - 1;
            } else {
                tdiff = empYTD - indexn;
            }
        } else {
            tdiff = term - 1;
        }

        ////////////////////Federal Tax//////////////////////////////////
		/////////////////////////////////////////////////////////////////
		console.log("Year: ",year);
		var federal_tax = paystubConfig[year].federal_tax;
		var federalTax = 0;
		if (typeof federal_tax !== 'undefined' && federal_tax !== '') {
			federalTax = await FEDERALTAXHELPER.getFederalTax(year, maritalStatus, paymentTotal, paymentMode, exemp,output);
		} else {
			federalTax = await FEDERALTAXHELPER.getFederalTaxByAnnual(year, maritalStatus, paymentTotal, paymentMode, exemp);
		}
		var federal_tax_ytd_total = await FEDERALTAXHELPER.getFederalTaxYTD(federalTax, pre_stub['federal_tax_ytd_total'], previ_payDate_year, current_payDate_year, month, term);
		console.log("federalTax: ",federalTax);
		console.log("federal_tax_ytd_total: ",federal_tax_ytd_total);
		output['federal_tax_total'] = federalTax;
		output['federal_tax_ytd_total'] = federal_tax_ytd_total;

		////////////////////Federal Tax//////////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////stateTax/////////////////////////////////////

		var state_tax_total = await STATETAXHELPER.getStateTax(year, maritalStatus, paymentTotal, paymentMode, state);
		var state_tax_ytd_total = await STATETAXHELPER.getStateTaxYTD(state_tax_total, pre_stub.state_tax_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);
		console.log("state_tax_total: ",state_tax_total);
		console.log("state_tax_ytd_total: ",state_tax_ytd_total);
		output['state_tax_total'] = state_tax_total;
		output['state_tax_ytd_total'] = state_tax_ytd_total;

		////////////////////stateTax/////////////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////MEDICARE/////////////////////////////////////
		var fica_medicare_total = await MEDITAXHELPER.getMedicareTax(year, paymentTotal, paymentMode);

		var fica_medicare_ytd_total = await MEDITAXHELPER.getMedicareTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub.fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);
		console.log("fica_medicare_total: ",fica_medicare_total);
		console.log("fica_medicare_ytd_total: ",fica_medicare_ytd_total);
		output['fica_medicare_total'] = fica_medicare_total;
		output['fica_medicare_ytd_total'] = fica_medicare_ytd_total;

		////////////////////MEDICARE/////////////////////////////////////
		/////////////////////////////////////////////////////////////////


		/////////////////////////////////////////////////////////////////
		////////////////////SCOAIL SECURITY//////////////////////////////

		var social_total = await SOCIALTAXHELPER.getSocialTax(year, output['tytd'],paymentTotal,pre_stub.fica_social_security_ytd_total);

		var social_ytd_total = await SOCIALTAXHELPER.getSocialTaxYTD(year,output['tytd'],paymentTotal, social_total,pre_stub.fica_social_security_ytd_total, previ_payDate_year, current_payDate_year);
		console.log("social_total: ",social_total);
		console.log("social_ytd_total: ",social_ytd_total);


		output['fica_social_security_total'] = social_total;
		output['fica_social_security_ytd_total'] = social_ytd_total;


		////////////////////SCOAIL SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////SDI SECURITY//////////////////////////////

		var sdi_total = await SDITAXHELPER.getSdiTax(year, pre_stub.sdi_ytd_total, output['tytd'], state, paymentTotal, duration);

		var sdi_ytd_total = await SDITAXHELPER.getSdiTaxYTD(year, sdi_total, pre_stub.sdi_ytd_total, output['tytd'], paymentTotal, month , tdiff, previ_payDate_year , current_payDate_year,state,duration);
		console.log("sdi_total: ",sdi_total);
		console.log("sdi_ytd_total: ",sdi_ytd_total);
		output['sdi_total'] = sdi_total;
		output['sdi_ytd_total'] = sdi_ytd_total;


		////////////////////SDI SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////SUI SECURITY//////////////////////////////
		var sui_total = await SUITAXHELPER.getSuiTax(year, paymentTotal, previ_payDate_year, current_payDate_year,state,pre_stub.sui_ytd_total, output['tytd']);
		var sui_ytd_total = await SUITAXHELPER.getSuiTaxYTD(year, paymentTotal, previ_payDate_year, current_payDate_year, sui_total, pre_stub.sui_ytd_total,state, output['tytd']);
		console.log("sui_total: ",sui_total);
		console.log("sui_ytd_total: ",sui_ytd_total);
		output['sui_total'] = sui_total;
		output['sui_ytd_total'] = sui_ytd_total;

		////////////////////SUI SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////flv SECURITY//////////////////////////////
		var flv_total = await FLVTAXHELPER.getFlvTax(year, state, paymentTotal, pre_stub.flv_ytd_total, output['tytd']);
		var flv_ytd_total = await FLVTAXHELPER.getFlvTaxYTD(year, state, paymentTotal, output['tytd'], previ_payDate_year, current_payDate_year, flv_total, pre_stub.flv_ytd_total,);
		console.log("flv_total: ", flv_total);
		console.log("flv_ytd_total: ", flv_ytd_total);
		output['flv_total'] = flv_total;
		output['flv_ytd_total'] = flv_ytd_total;


		////////////////////flv SECURITY/////////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////WC SECURITY/////////////////////////////////

		var wc_total = await WCTAXHELPER.getWCTax(year, paymentTotal, duration, total_hours, pre_stub.wc_ytd_total,state,output['tytd']) ;
		var wc_ytd_total = await WCTAXHELPER.getWCTaxYTD(year, wc_total, previ_payDate_year, current_payDate_year, pre_stub.wc_ytd_total,state, month, tdiff, paymentTotal, duration, total_hours, output['tytd']) ;
		console.log("wc_total: ", wc_total);
		console.log("wc_ytd_total: ", wc_ytd_total);
		output['wc_total'] = wc_total;
		output['wc_ytd_total'] = wc_ytd_total;


		////////////////////WC SECURITY//////////////////////////////////
		/////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////
		////////////////////WF SECURITY//////////////////////////////

		var wf_total = await WFTAXHELPER.getWFTax(year, state, paymentTotal, duration, output['tytd'],pre_stub.wf_ytd_total) ;
		var wf_ytd_total = await WFTAXHELPER.getWFTaxYTD(year, state, paymentTotal, duration, wf_total, previ_payDate_year, current_payDate_year, pre_stub.wf_ytd_total, month, tdiff, output['tytd']) ;
		// console.log("wf_total: ", wf_total);
		// console.log("wf_ytd_total: ", wf_ytd_total);
		output['wf_total'] = wf_total;
		output['wf_ytd_total'] = wf_ytd_total;

		////////////////////WF SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////


        ////////////////////Cutome deduction /////////////////

        var totalCustomeDeduction = 0;
        var totalYtdCustomeDeduction = 0;

        for (let k = 1; k <= custome_deduction_count; k++) {
            if (output['tytd'] == 0) {
                output['custome_deduction_ytd_total'+k+''] = 0;
            } else if (typeof pre_stub.custome_deduction_ytd_total+k+'' !=='undefined' && pre_stub.custome_deduction_ytd_total+k+'' !== "") {
                if ( previ_payDate_year != current_payDate_year) {
                    output['custome_deduction_ytd_total'+k+''] = payload.custome_deduction_total[k];
                } else {
                    if (payload.custome_deduction_total[k] != 0) {
                        output['custome_deduction_ytd_total'+k+''] = payload.custome_deduction_total[k] + REGEXPATTERN.converttofloat(pre_stub.custome_deduction_ytd_total+k+'');
                    } else {
                        output['custome_deduction_ytd_total'+k+''] = payload.custome_deduction_total[k];
                    }
                }
            } else {
                output['custome_deduction_ytd_total'+k+''] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(payload.custome_deduction_total+k+'' * tdiff));
            }
            totalCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalCustomeDeduction.replace(",", "")) + REGEXPATTERN.converttofloat((payload.custome_deduction_total+k).replace(",", ""))));
            totalYtdCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalYtdCustomeDeduction.replace(",", "")) + REGEXPATTERN.converttofloat(output['custome_deduction_ytd_total'+k+''].replace(",", ""))));
        }
        if (output['tytd'] == 0) {
            output['fica_medicare_ytd_total'] = REGEXPATTERN.number_format(0);
            output['fica_social_security_ytd_total'] = REGEXPATTERN.number_format(0);
            output['federal_tax_ytd_total'] = REGEXPATTERN.number_format(0);
            output['state_tax_ytd_total'] = REGEXPATTERN.number_format(0);
            output['sdi_ytd_total'] = REGEXPATTERN.number_format(0);
            output['sui_ytd_total'] = REGEXPATTERN.number_format(0);
            output['flv_ytd_total'] = REGEXPATTERN.number_format(0);
            output['wc_ytd_total'] = REGEXPATTERN.number_format(0);
            output['wf_ytd_total'] = REGEXPATTERN.number_format(0);
        }
        output['sdi_total'] = REGEXPATTERN.number_format(output['sdi_total']);
        output['sui_total'] = REGEXPATTERN.number_format(output['sui_total']);
        output['flv_total'] = REGEXPATTERN.number_format(output['flv_total']);
        output['wc_total'] = REGEXPATTERN.number_format(output['wc_total']);
        output['wf_total'] = REGEXPATTERN.number_format(output['wf_total']);
        output['deductions'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['state_tax_total'] + output['fica_medicare_total'] + output['federal_tax_total'] + output['fica_social_security_total'] + output['sdi_total'] + output['sui_total'] + output['flv_total'] + output['wc_total'] + output['wf_total'] + totalCustomeDeduction));
        output['net_pay'] = REGEXPATTERN.converttofloat(paymentTotal - Math.round(output['deductions']*100)/100);
        output['ytd_deductions'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(output['fica_medicare_ytd_total'].replace(",", "", )) + REGEXPATTERN.converttofloatstr_replace(",", "", output['fica_social_security_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", output['federal_tax_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", output['state_tax_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", output['sdi_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", output['sui_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", output['flv_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", output['wc_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", output['wf_ytd_total']) + REGEXPATTERN.converttofloatstr_replace(",", "", totalYtdCustomeDeduction)));
        output['ytd_net_pay'] = REGEXPATTERN.converttofloat(output['tytd'] - Math.round(output['ytd_deductions']*100)/100);

        return output;
    }
};