const moment = require('moment');

const FEDERALTAXHELPER = require("./federalTax.helper");
const STATETAXHELPER = require("./stateTax.helper");
const FLVTAXHELPER = require("./flv.helper");
const MEDITAXHELPER = require("./medi.helper");
const SDITAXHELPER = require("./sdi.helper");
const SOCIALTAXHELPER = require("./social.helper");
const WCTAXHELPER = require("./wc.helper");
const WFTAXHELPER = require("./wf.helper");

const SUITAXHELPER = require("./sui.helper");
const REGEXPATTERN = require("../utils/regexPattern");

module.exports = {

	calculate: async (payload, pre_stub, i_index, total_hours = 0) => {
		// var payload = req.body;
		// paymentTotal, paymentMode

		var paymentTotal = REGEXPATTERN.converttofloat(payload.cTotal);
		var current1 = REGEXPATTERN.converttofloat(payload.current1);
		var current2 = REGEXPATTERN.converttofloat(payload.current2);
		var current3 = REGEXPATTERN.converttofloat(payload.current3);
		var current4 = REGEXPATTERN.converttofloat(payload.current4);
		var current5 = REGEXPATTERN.converttofloat(payload.current5);
		var current6 = REGEXPATTERN.converttofloat(payload.current6);
		var current7 = REGEXPATTERN.converttofloat(payload.current7);
		var current8 = REGEXPATTERN.converttofloat(payload.current8);
		var custome_deduction_count = payload.custome_deduction_count;
		var custome_earnings_count = payload.custome_earnings_count;
		// var totalCustomeEarnings = 0;
		// var totalYtdCustomeEarnings = 0;
		var state = payload.state;
		var paymentMode = payload.payMode;
		var exemp = parseInt(payload.exemp);
		var maritalStatus = payload.mStatus.toLowerCase();
		var pay_date = payload.pay_date;
		// var away_date =typeof payload.away_date ? payload.away_date : '';
		var empYTD = payload.empYTD;
		var empType = payload.empType;
		// var paymentType = payload.paymentType;
		var pay_period_start = payload.pay_period_start;
		var pay_period_end = payload.pay_period_end;
		var output = {};
		var duration = '';
		var month = new Date(pay_date).getMonth() + 1; //  date("m", strtotime(pay_date));
		var year = new Date(pay_date).getFullYear(); //date("Y", strtotime(pay_date));
		// var day = new Date(pay_date).getDate(); //date("d", strtotime(pay_date));
		var term = 0;

		var current_payDate_year = year;

		var diffDate = moment(new Date(pay_period_end), "MM/DD/YYYY").diff(moment(new Date(pay_period_start), "MM/DD/YYYY")); //new Date(pay_period_end).getTime() - new Date(pay_period_start).getTime();

		var diffDay = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

		var previ_payDate_year = moment(new Date(pay_date), "MM/DD/YYYY").subtract(diffDay+1,'days').format("YYYY"); //new Date("Y", Date.parse("-", (diffDay + 1), " days", Date.parse(pay_date)));

		output['pay_period_end'] = pay_period_end.replace("/", "/");
		output['pay_date'] = pay_date;

		var ddate = new Date(Date.parse(pay_date)).toISOString();
		console.log(ddate);
		var date = new Date(ddate);

		// Calculate working days of ther year
		var endDate = Date.parse(ddate);
		var startDate = Date.parse(year, "-01-01");
		var days = (endDate - startDate) / 86400 + 1;
		var no_full_weeks = parseInt(days / 7);
		var no_remaining_days =days % 7;
		var the_first_day_of_week = getWeekdayISO8601(startDate); // date("N", startDate);
		var the_last_day_of_week = getWeekdayISO8601(endDate); // date("N", endDate);
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
		var months = 0;
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

				months = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); // date -> format("m");
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

				months = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1); // date -> format("m");
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

		// check if year is same or else generate as first stub
		// var year2 = date("Y", Date.parse(output['pay_period_start']));
		var makeItNew = 0;

		if (previ_payDate_year != current_payDate_year) {
			makeItNew = 1;
			term = 1;
		}

		var tdiff = 1;
		var indexn = i_index + 1;
		if (empYTD != '') {
			if (indexn == empYTD) {
				tdiff = 0;
			} else if (empYTD > term) {
				tdiff = Math.abs(term - 1);
			} else {
				tdiff = empYTD - indexn;
			}
		} else {
			tdiff = Math.abs(term - 1);
		}
		if (empType == 'contractor') {
			if (pre_stub.length<0) {
				if (makeItNew == 1) {
					output['tytd'] = paymentTotal;
					output['ytd1'] = current1;
					output['ytd2'] = current2;
					output['ytd3'] = current3;
					output['ytd4'] = current4;
					output['ytd5'] = current5;
					output['ytd6'] = current6;
					output['ytd7'] = current7;
					output['ytd8'] = current8;
					for (let k = 1; k <= custome_earnings_count; k++) {
						output['custome_earnings_ytd'+k+''] = payload.custome_earnings_current[k];
					}
				}
				else {
					output['tytd'] = paymentTotal + REGEXPATTERN.converttofloat(pre_stub.tytd);
					output['ytd1'] = current1 + REGEXPATTERN.converttofloat(pre_stub.ytd1);
					output['ytd2'] = current2 + REGEXPATTERN.converttofloat(pre_stub.ytd2);
					output['ytd3'] = current3 + REGEXPATTERN.converttofloat(pre_stub.ytd3);
					output['ytd4'] = current4 + REGEXPATTERN.converttofloat(pre_stub.ytd4);
					output['ytd5'] = current5 + REGEXPATTERN.converttofloat(pre_stub.ytd5);
					output['ytd6'] = current6 + REGEXPATTERN.converttofloat(pre_stub.ytd6);
					output['ytd7'] = current7 + REGEXPATTERN.converttofloat(pre_stub.ytd7);
					output['ytd8'] = current8 + REGEXPATTERN.converttofloat(pre_stub.ytd8);
					for (let k = 1; k <= custome_earnings_count; k++) {
						output['custome_earnings_ytd'+k+''] = payload.custome_earnings_current.k + REGEXPATTERN.converttofloat(pre_stub.custome_earnings_ytd+k+'');
					}
				}
			} else {

				output['tytd'] = REGEXPATTERN.number_format(paymentTotal * month * tdiff);
				output['ytd1'] = REGEXPATTERN.number_format(current1 * month * tdiff);
				output['ytd2'] = REGEXPATTERN.number_format(current2 * month * tdiff);
				output['ytd3'] = REGEXPATTERN.number_format(current3 * month * tdiff);
				output['ytd4'] = REGEXPATTERN.number_format(current4 * month * tdiff);
				output['ytd5'] = REGEXPATTERN.number_format(current5 * month * tdiff);
				output['ytd6'] = REGEXPATTERN.number_format(current6 * month * tdiff);
				output['ytd7'] = REGEXPATTERN.number_format(current7 * month * tdiff);
				output['ytd8'] = REGEXPATTERN.number_format(current8 * month * tdiff);
				for (let k = 1; k <= custome_earnings_count; k++) {
					output['custome_earnings_ytd'+k+''] = REGEXPATTERN.number_format(payload.custome_earnings_current[k] * month * tdiff);
				}
			}

			var totalCustomeDeduction = 0;

			for (let k = 1; k <= custome_deduction_count; k++) {
				if (typeof pre_stub.custome_deduction_ytd_total+k+''!== 'undefined'() &&pre_stub.custome_deduction_ytd_total+k+'' !== "") {
					if (previ_payDate_year != current_payDate_year) {
						output['custome_deduction_ytd_total'+k+''] = payload.custome_deduction_total[k];
					} else {
						if (payload.custome_deduction_total+k+'' !=0) {
							output['custome_deduction_ytd_total'+k+''] = payload.custome_deduction_total+k+'' + REGEXPATTERN.converttofloat(pre_stub.custome_deduction_ytd_total+k+'');
						} else {
							output['custome_deduction_ytd_total'+k+'']=payload.custome_deduction_total+k+'';
						}
					}
				}
				else {
					output['custome_deduction_ytd_total'+k+'']=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(payload.custome_deduction_total+k+''*tdiff));
				}
				totalCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalCustomeDeduction.replace(",", "")) + REGEXPATTERN.converttofloat(payload.custome_deduction_total[k].replace(",", ""))));
				totalYtdCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalYtdCustomeDeduction.replace(",", "")) + REGEXPATTERN.converttofloat(output['custome_deduction_ytd_total'+k+''].replace(",", ""))));

				// totalCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloatstr_replace(",", "", totalCustomeDeduction) + REGEXPATTERN.converttofloatstr_replace(",", "", payload.custome_deduction_total[k])));
				// totalYtdCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloatstr_replace(",", "", totalYtdCustomeDeduction) + REGEXPATTERN.converttofloatstr_replace(",", "", output['custome_deduction_ytd_total'+k+''])));
			}

			output['deductions'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(totalCustomeDeduction));
			output['net_pay'] = REGEXPATTERN.converttofloat(paymentTotal - Math.round(REGEXPATTERN.converttofloat(output['deductions'])*100)/100);
			output['ytd_deductions'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalYtdCustomeDeduction.replace(",", ""))));
			output['ytd_net_pay'] = REGEXPATTERN.converttofloat(output['tytd'] - Math.round(output['ytd_deductions']*100)/100);
			return output;
		}


		if (pre_stub.length > 0) {
			if (makeItNew == 1) {
				output['tytd'] = paymentTotal;
				output['ytd1'] = current1;
				output['ytd2'] = current2;
				output['ytd3'] = current3;
				output['ytd4'] = current4;
				output['ytd5'] = current5;
				output['ytd6'] = current6;
				output['ytd7'] = current7;
				for (let k = 1; k <= custome_earnings_count; k++) {
					output['custome_earnings_ytd'+k+'']=payload.custome_earnings_current+k+'';
				}
			}
			else {
				output['tytd'] = paymentTotal + REGEXPATTERN.converttofloat(pre_stub.tytd);
				output['ytd1'] = current1 + REGEXPATTERN.converttofloat(pre_stub.ytd1);
				output['ytd2'] = current2 + REGEXPATTERN.converttofloat(pre_stub.ytd2);
				output['ytd3'] = current3 + REGEXPATTERN.converttofloat(pre_stub.ytd3);
				output['ytd4'] = current4 + REGEXPATTERN.converttofloat(pre_stub.ytd4);
				output['ytd5'] = current5 + REGEXPATTERN.converttofloat(pre_stub.ytd5);
				output['ytd6'] = current6 + REGEXPATTERN.converttofloat(pre_stub.ytd6);
				output['ytd7'] = current7 + REGEXPATTERN.converttofloat(pre_stub.ytd7);
				for (let k = 1; k <= custome_earnings_count; k++) {
					output['custome_earnings_ytd'+k+'']=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(payload.custome_earnings_current+k+'')+REGEXPATTERN.converttofloat(pre_stub.custome_earnings_ytd+k+''));
				}
			}
		}
		else {
			output['tytd'] = REGEXPATTERN.number_format(paymentTotal * month * tdiff);
			output['ytd1'] = REGEXPATTERN.number_format(current1 * month * tdiff);
			output['ytd2'] = REGEXPATTERN.number_format(current2 * month * tdiff);
			output['ytd3'] = REGEXPATTERN.number_format(current3 * month * tdiff);
			output['ytd4'] = REGEXPATTERN.number_format(current4 * month * tdiff);
			output['ytd5'] = REGEXPATTERN.number_format(current5 * month * tdiff);
			output['ytd6'] = REGEXPATTERN.number_format(current6 * month * tdiff);
			output['ytd7'] = REGEXPATTERN.number_format(current7 * month * tdiff);
			for (let k = 1; k <= custome_earnings_count; k++) {
				output['custome_earnings_ytd'+k+'']=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(payload.custome_earnings_current+k+'')*month*tdiff);
			}
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

		console.log("outputArray: " , JSON.stringify(output));

		/////////////////////////////////////////////////////////
		////////////////////Cutome deduction ////////////////////

		totalCustomeDeduction = 0;
		var totalYtdCustomeDeduction = 0;
		for(let k=1;k<=custome_deduction_count;k++){
			if (typeof pre_stub.custome_deduction_ytd_total+k+'' !== 'undefined' && pre_stub.custome_deduction_ytd_total+k+''!== "") {
				if (previ_payDate_year != current_payDate_year) {
					output['custome_deduction_ytd_total'+k+''] =payload.custome_deduction_total.k;
				}else{
					if(payload.custome_deduction_total+k+'' !=0){
						output['custome_deduction_ytd_total'+k+'']= payload.custome_deduction_total+k+'' + REGEXPATTERN.converttofloat(pre_stub.custome_deduction_ytd_total+k+'');
					}else{
						output['custome_deduction_ytd_total'+k+'']=payload.custome_deduction_total+k+'';
					}
				}
			} else {
				output['custome_deduction_ytd_total'+k+'']=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(payload.custome_deduction_total+k+''*tdiff));
			}
			totalCustomeDeduction=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalCustomeDeduction.replace(",", ""))+REGEXPATTERN.converttofloat(payload.custome_deduction_total+k+''.replace(",", ""))));
			totalYtdCustomeDeduction=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(totalYtdCustomeDeduction.replace(",", ""))+REGEXPATTERN.converttofloat(output['custome_deduction_ytd_total'+k+''].replace(",", "" ))));
		}
		console.log("outputArray: " + output.toString());

		////////////////////Cutome deduction ////////////////////
		/////////////////////////////////////////////////////////

		output['tytd'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['tytd']));
		output['ytd1'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['ytd1']));
		output['ytd2'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['ytd2']));
		output['ytd3'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['ytd3']));
		output['ytd4'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['ytd4']));
		output['ytd5'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['ytd5']));
		output['ytd6'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['ytd6']));
		output['ytd7'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['ytd7']));
		output['sdi_total'] = REGEXPATTERN.number_format(output['sdi_total']);
		output['sui_total'] = REGEXPATTERN.number_format(output['sui_total']);
		output['flv_total'] = REGEXPATTERN.number_format(output['flv_total']);
		output['wc_total'] = REGEXPATTERN.number_format(output['wc_total']);
		output['wf_total'] = REGEXPATTERN.number_format(output['wf_total']);
		output['deductions'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(output['state_tax_total'] + output['fica_medicare_total'] + output['federal_tax_total'] + output['fica_social_security_total'] + output['sdi_total'] + output['sui_total'] + output['flv_total'] + output['wc_total'] + output['wf_total'] + totalCustomeDeduction));
		output['net_pay'] = REGEXPATTERN.converttofloat(paymentTotal - Math.round(output['deductions']*100)/100); //+sRestAmount
		output['ytd_deductions'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(REGEXPATTERN.converttofloat(output['fica_medicare_ytd_total']) + REGEXPATTERN.converttofloat(output['fica_social_security_ytd_total']) + REGEXPATTERN.converttofloat(output['federal_tax_ytd_total']) + REGEXPATTERN.converttofloat(output['state_tax_ytd_total']) + REGEXPATTERN.converttofloat( output['sdi_ytd_total']) + REGEXPATTERN.converttofloat(output['sui_ytd_total']) + REGEXPATTERN.converttofloat(output['flv_ytd_total']) + REGEXPATTERN.converttofloat(output['wc_ytd_total']) + REGEXPATTERN.converttofloat( output['wf_ytd_total']) + REGEXPATTERN.converttofloat(totalYtdCustomeDeduction)));
		output['ytd_net_pay'] = REGEXPATTERN.converttofloat(output['tytd'] - Math.round(output['ytd_deductions']*100)/100);
		return output;

	},

};
Date.prototype.dayOfYear= function(){
	var j1= new Date(this);
	j1.setMonth(0, 0);
	return Math.round((this-j1)/8.64e7);
};

function getWeekdayISO8601(dateStr) {
    const dt = new Date(dateStr);
    const day = dt.getDay();
    return (day === 0 ? 7 : day);
}