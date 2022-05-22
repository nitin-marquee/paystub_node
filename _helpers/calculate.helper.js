const FEDERALTAXHELPER = require('federalTax.helper');
const STATETAXHELPER = require('stateTax.helper');
const FLVTAXHELPER = require('flv.helper');
const MEDITAXHELPER = require('medi.helper');
const SDITAXHELPER = require('sdi.helper');
const SOCIALTAXHELPER = require('social.helper');
const WCTAXHELPER = require('wc.helper');
const WFTAXHELPER = require('wf.helper');
const EXPTAXHELPER = require('exp.helper');
const SUITAXHELPER = require('sui.helper');
const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    calculate: async () => {

        
        ////////////////////Federal Tax//////////////////////////////////
        /////////////////////////////////////////////////////////////////
        var federal_tax = paystubConfig[year].federal_tax;
        var federalTax = 0.00;
        if (federal_tax) {
            federalTax = FEDERALTAXHELPER.getFederalTax(year, maritalStatus, paymentTotal, paymentMode, exemp);
        } else {
            federalTax = FEDERALTAXHELPER.getFederalTaxByAnnual(year, maritalStatus, paymentTotal, paymentMode, exemp);
        }
        var federal_tax_ytd_total = FEDERALTAXHELPER.getFederalTaxYTD(federalTax, pre_stub_federal_tax_ytd_total, previ_payDate_year, current_payDate_year,  month, term) 
        // var federal_tax_ytd_total = 0;
        // if (federalTax == 0 && exemp != 0) {
        //     federalTax = Math.round(0 * 100) / 100;
        //     if (pre_stub_federal_tax_ytd_total) {
        //         federal_tax_ytd_total = Math.round(pre_stub_federal_tax_ytd_total * 100) / 100;
        //     } else {
        //         federal_tax_ytd_total = federalTax;
        //     }
        // } else if (federalTax != 0) {
        //     if (pre_stub_federal_tax_ytd_total) {
        //         if (previ_payDate_year && current_payDate_year && previ_payDate_year != current_payDate_year) {
        //             federal_tax_ytd_total = federalTax;
        //         } else {
        //             federal_tax_ytd_total = Math.round((federalTax + pre_stub_federal_tax_ytd_total) * 100) / 100;
        //         }
        //     } else {
        //         federal_tax_ytd_total = Math.round((federalTax * month * term) * 100) / 100;
        //     }
        // }

        ////////////////////Federal Tax//////////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////stateTax/////////////////////////////////////

        var state_tax_total = STATETAXHELPER.getStateTax(year, maritalStatus, paymentTotal, paymentMode, state);
        var state_tax_ytd_total = STATETAXHELPER.getStateTaxYTD(state_tax_total, pre_stub_state_tax_ytd_total, previ_payDate_year, current_payDate_year,  month, tdiff);
        // if (pre_stub_state_tax_ytd_total) {
        //     if (previ_payDate_year != current_payDate_year) {
        //         var state_tax_ytd_total = Math.round(state_tax_total * 100) / 100;
        //     } else {
        //        var state_tax_ytd_total = Math.round((tate_tax_total + pre_stub_state_tax_ytd_total)*100)/100;
        //     }
        // } else {
        //     var state_tax_ytd_total =  Math.round(state_tax_total * month * tdiff*100)/100;
        // }
        ////////////////////stateTax/////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        
		/////////////////////////////////////////////////////////////////
		////////////////////MEDICARE/////////////////////////////////////
        var fica_medicare_total = MEDITAXHELPER.getMedicareTax(year, paymentTotal, paymentMode);
		
         var fica_medicare_ytd_total = MEDITAXHELPER.getMedicareTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);
		//fica_medicare_total = number_format(round(fica_medicare_total * 100) / 100, 2, '.', '');
		// if (pre_stub_fica_medicare_ytd_total) {
		// 	if (previ_payDate_year != current_payDate_year) {
		// 		fica_medicare_ytd_total = fica_medicare_total;
		// 	}else{
		// 		if(mTaxRate !=0){
		// 			var fica_medicare_ytd_total =Math.round((fica_medicare_total + pre_stub_fica_medicare_ytd_total)*100)/100;
		// 		}else{
		// 			var fica_medicare_ytd_total = fica_medicare_total;
		// 		}
		// 	}
		// } else {
		// 	fica_medicare_ytd_total = Math.round(fica_medicare_total* month * tdiff*100)/100;
		// }

		////////////////////MEDICARE/////////////////////////////////////
		/////////////////////////////////////////////////////////////////

		
		/////////////////////////////////////////////////////////////////
		////////////////////SCOAIL SECURITY//////////////////////////////
		social = output['tytd'] * soci[year]['p1']; //18600
		sRestAmount = 0;
		sTotal = cTotal * soci[year]['p1'];
		if (social > soci[year]['max']) {
			sRestAmount = social - soci[year]['max']; //11253
			social = soci[year]['max'];
			sTotal = 0;
			if (isset(pre_stub['fica_social_security_ytd_total'])) {
				sTotal = social - number_format(this->converttofloat(pre_stub['fica_social_security_ytd_total']), 2, '.', '');
			} else {
				sTotal = cTotal * soci[year]['p1'];
			}
			if(sTotal>0){
				output['fica_social_security_total'] = number_format(sTotal, 2, '.', '');
			}else if(sTotal==0){
				sTotal += cTotal * soci[year]['p1'];
			} else {
 				output['fica_social_security_total'] = 0;
			}
			output['fica_social_security_ytd_total'] = number_format(social , 2, '.', '');
		} else {
			output['fica_social_security_total'] = number_format(this->converttofloat(sTotal), 2, '.', '');
			if (isset(pre_stub['fica_social_security_ytd_total'])) {
				if (previ_payDate_year != current_payDate_year) {
					output['fica_social_security_ytd_total'] = number_format(output['fica_social_security_total'], 2, '.', '');
				}else{
					if(pre_stub['fica_social_security_ytd_total'] > soci[year]['max']){
						output['fica_social_security_ytd_total'] = number_format(soci[year]['max'], 2, '.', '');
					}else{
						output['fica_social_security_ytd_total'] = number_format(output['fica_social_security_total'] + this->converttofloat(pre_stub['fica_social_security_ytd_total']), 2, '.', '');
					}
				}
			} else {
				output['fica_social_security_ytd_total'] = number_format(this->converttofloat(social), 2, '.', '');
			}
		}

		////////////////////SCOAIL SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////SDI SECURITY//////////////////////////////

		output['sdi_total'] = 0;
		output['sdi_ytd_total'] = 0;
		if (isset(sdi[year][state]) && !empty(sdi[year][state])) {
			formula = sdi[year][state][year]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sdi[year][state][year]['maxtax'][0];
					percent = sdi[year][state][year]['percent'][0];
					max = sdi[year][state][year]['max'][0];
					sdi_tax = 0;
					if (output['tytd'] < max) {
						sdi_tax = output['tytd'] * (percent / 100);
						output['sdi_total'] = number_format(cTotal * (percent / 100), 2, '.', ''); //sdi_tax/(month*term);
					} else if (output['tytd'] >= max) {
						sdi_tax = maxtax;
						if (isset(pre_stub['sdi_ytd_total'])) {
							diff = sdi_tax - number_format(this->converttofloat(pre_stub['sdi_ytd_total']), 2, '.', '');
						} else {
							diff = 0;
						}
						if (diff > 0) {
							output['sdi_total'] = diff;
						} else {
							output['sdi_total'] = 0;
						}
					}

					if (isset(pre_stub['sdi_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['sdi_ytd_total'] = output['sdi_total'];
						}else{
							if(pre_stub['sdi_ytd_total'] >=maxtax){
								output['sdi_ytd_total']=maxtax;
							}else{
								output['sdi_ytd_total'] = output['sdi_total'] + this->converttofloat(pre_stub['sdi_ytd_total']);
							}
						}
					} else {
						output['sdi_ytd_total'] = number_format(sdi_tax , 2, '.', '');
					}
					break;
				case 2:
					percent = sdi[year][state][year]['percent'][0];
					maxtax = sdi[year][state][year]['maxtax'][0];
					sdi_tax = 0;
					sdi_tax = number_format(cTotal * (percent / 100), 2, '.', '');
					if (duration == 'weekly') {
						if (sdi_tax >= maxtax) {
							sdi_tax = number_format(maxtax, 2, '.', '');
							output['sdi_total'] = sdi_tax;
						} else {
							output['sdi_total'] = sdi_tax;
						}
					} else if (duration == 'biweekly' || duration == 'semimonthly') {
						maxtax = maxtax * 2;
						if (sdi_tax >= maxtax) {
							sdi_tax = number_format(maxtax, 2, '.', '');
							output['sdi_total'] = sdi_tax;
						} else {
							output['sdi_total'] = sdi_tax;
						}
					} else if (duration == 'monthly') {
						maxtax = maxtax * 4;
						if (sdi_tax >= maxtax) {
							sdi_tax = number_format(maxtax, 2, '.', '');
							output['sdi_total'] = sdi_tax;
						} else {
							output['sdi_total'] = sdi_tax;
						}
					}else if (duration == 'annual') {
						maxtax = maxtax * 52;
						if (sdi_tax >= maxtax) {
							sdi_tax = number_format(maxtax, 2, '.', '');
							output['sdi_total'] = sdi_tax;
						} else {
							output['sdi_total'] = sdi_tax;
						}
					}else if (duration == 'quarterly') {
						maxtax = maxtax * 12;
						if (sdi_tax >= maxtax) {
							sdi_tax = number_format(maxtax, 2, '.', '');
							output['sdi_total'] = sdi_tax;
						} else {
							output['sdi_total'] = sdi_tax;
						}
					}else if (duration == 'semiannual') {
						maxtax = maxtax * 24;
						if (sdi_tax >= maxtax) {
							sdi_tax = number_format(maxtax, 2, '.', '');
							output['sdi_total'] = sdi_tax;
						} else {
							output['sdi_total'] = sdi_tax;
						}
					}else if (duration == 'daily') {
						maxtax = maxtax / 7;
						if (sdi_tax >= maxtax) {
							sdi_tax = number_format(maxtax, 2, '.', '');
							output['sdi_total'] = sdi_tax;
						} else {
							output['sdi_total'] = sdi_tax;
						}
					}
					if (isset(pre_stub['sdi_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['sdi_ytd_total'] = output['sdi_total'];
						}else{
							output['sdi_ytd_total'] = output['sdi_total'] + this->converttofloat(pre_stub['sdi_ytd_total']);
						}
						//echo output['sdi_ytd_total']." = ".output['sdi_total']."+".pre_stub['sdi_ytd_total']; echo ":<br>";
					} else {
						output['sdi_ytd_total'] = number_format(sdi_tax * month * tdiff, 2, '.', '');
					}
					break;
			}
		}
		output['sdi_total'] = this->converttofloat(output['sdi_total']);
		output['sdi_ytd_total'] = this->converttofloat(output['sdi_ytd_total']);

		////////////////////SDI SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////SUI SECURITY//////////////////////////////

		output['sui_total'] = 0;
		output['sui_ytd_total'] = 0;
		if (isset(sui[year][state]) && !empty(sui[year][state])) {
			formula = sui[year][state][year]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sui[year][state][year]['maxtax'][0];
					percent = sui[year][state][year]['percent'][0];
					max = sui[year][state][year]['max'][0];
					sui_tax = 0;
					if (output['tytd'] < max) {
						sui_tax = number_format(output['tytd'] * (percent / 100), 2, '.', '');
						output['sui_total'] = number_format(cTotal * (percent / 100), 2, '.', ''); //sui_tax/(month*term);
						//echo sui_tax." = ".output['tytd']."*(".(percent/100).")";echo "<br/>";
						//echo output['sui_total']." = ".sui_tax."/(".month*term.")";echo "<br/>";
					} else if (output['tytd'] >= max) {
						//print_r(output);
						sui_tax = maxtax;
						if (isset(pre_stub['sui_ytd_total'])) {
							diff = sui_tax - number_format(this->converttofloat(pre_stub['sui_ytd_total']), 2, '.', '');
						} else {
							diff = 0;
						}
						if (diff > 0) {
							output['sui_total'] = diff;
						} else {
							output['sui_total'] = 0;
						}
					}
					if (isset(pre_stub['sui_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['sui_ytd_total'] = output['sui_total'];
						}else{
							if(pre_stub['sui_ytd_total'] >=maxtax){
								output['sui_ytd_total']=maxtax;
							}else{
								output['sui_ytd_total'] = output['sui_total'] + this->converttofloat(pre_stub['sui_ytd_total']);
							}
						}
					} else {
						output['sui_ytd_total'] = number_format(sui_tax, 2, '.', '');
					}

					break;
				case 5:
					percent = sui[year][state][year]['percent'][0];
					sui_tax = number_format(output['tytd'] * (percent / 100), 2, '.', '');
					output['sui_total'] = number_format(cTotal * (percent / 100), 2, '.', ''); //sui_tax/(month*term);
					if (isset(pre_stub['sui_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['sui_ytd_total'] = output['sui_total'];
						}else{
							output['sui_ytd_total'] = output['sui_total'] + this->converttofloat(pre_stub['sui_ytd_total']);
						}
					} else {
						output['sui_ytd_total'] = number_format(sui_tax, 2, '.', '');
					}
					break;
			}
		}
		output['sui_total'] = this->converttofloat(output['sui_total']);
		output['sui_ytd_total'] = this->converttofloat(output['sui_ytd_total']);

		////////////////////SUI SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////flv SECURITY//////////////////////////////

		output['flv_total'] = 0;
		output['flv_ytd_total'] = 0;
		if (isset(flv[year][state]) && !empty(flv[year][state])) {
			formula = flv[year][state][year]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = flv[year][state][year]['maxtax'][0];
					percent = flv[year][state][year]['percent'][0];
					max = flv[year][state][year]['max'][0];
					flv_tax = 0;
					if (output['tytd'] < max) {
						flv_tax = output['tytd'] * (percent / 100);
						output['flv_total'] = cTotal * (percent / 100); //flv_tax/(month*term);
					} else if (output['tytd'] >= max) {
						flv_tax = maxtax;
						if (isset(pre_stub['flv_ytd_total'])) {
							diff = flv_tax - number_format(this->converttofloat(pre_stub['flv_ytd_total']), 2, '.', '');
						} else {
							diff = 0;
						}
						if (diff > 0) {
							output['flv_total'] = diff;
						} else {
							output['flv_total'] = 0;
						}

					}
					if (isset(pre_stub['flv_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['flv_ytd_total'] = output['flv_total'];
						}else{
							if(pre_stub['flv_ytd_total'] >=maxtax){
								output['flv_ytd_total']=maxtax;
							}else{
								output['flv_ytd_total'] = output['flv_total'] + this->converttofloat(pre_stub['flv_ytd_total']);
							}
						}
					} else {
						output['flv_ytd_total'] = number_format(flv_tax, 2, '.', '');
					}
					break;
			}
		}
		output['flv_total'] = this->converttofloat(output['flv_total']);
		output['flv_ytd_total'] = this->converttofloat(output['flv_ytd_total']);

		////////////////////SUI SECURITY/////////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////WC SECURITY/////////////////////////////////

		output['wc_total'] = 0;
		output['wc_ytd_total'] = 0;
		if (isset(wc[year][state]) && !empty(wc[year][state])) {
			formula = wc[year][state][year]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wc[year][state][year]['maxtax'][0];
					percent = wc[year][state][year]['percent'][0];
					max = wc[year][state][year]['max'][0];
					wc_tax = 0;
					if (output['tytd'] < max) {
						wc_tax = output['tytd'] * (percent / 100);
						output['wc_total'] = cTotal * (percent / 100); //wc_tax/(month*term);
					} else if (output['tytd'] >= max) {
						wc_tax = maxtax;
						if (isset(pre_stub['wc_ytd_total'])) {
							diff = wc_tax - number_format(this->converttofloat(pre_stub['wc_ytd_total']), 2, '.', '');
						} else {
							diff = 0;
						}
						if (diff > 0) {
							output['wc_total'] = diff;
						} else {
							output['wc_total'] = 0;
						}
					}
					if (isset(pre_stub['wc_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['wc_ytd_total'] = output['wc_total'];
						}else{
							output['wc_ytd_total'] = output['wc_total'] + this->converttofloat(pre_stub['wc_ytd_total']);
						}
					} else {
						output['wc_ytd_total'] = number_format(wc_tax, 2, '.', '');
					}
					break;
				case 3:
					wc_tax = 0;
					if (duration == 'weekly') {
						wc_tax = wc[year][state][year]['weekly'][0]; //cTotal*(wc[year][state]['weekly'][0]/100);
					} else if (duration == 'biweekly') {
						wc_tax = wc[year][state][year]['biweekly'][0]; //cTotal*(wc[year][state]['biweekly'][0]/100);
					} else if (duration == 'semimonthly') {
						wc_tax = wc[year][state][year]['semimonthly'][0]; //cTotal*(wc[year][state]['biweekly'][0]/100);
					} else if (duration == 'monthly') {
						wc_tax = wc[year][state][year]['monthly'][0]; //cTotal*(wc[year][state]['biweekly'][0]/100);
					} else if (duration == 'annual') {
						wc_tax = wc[year][state][year]['annual'][0];
					}else if (duration == 'quarterly') {
						wc_tax = wc[year][state][year]['quarterly'][0];
					}else if (duration == 'semiannual') {
						wc_tax = wc[year][state][year]['semiannual'][0];
					}else if (duration == 'daily') {
						wc_tax = wc[year][state][year]['daily'][0];
					} else {
						wc_tax = 0;
					}
					output['wc_total'] = wc_tax;
					if (isset(pre_stub['wc_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['wc_ytd_total'] = output['wc_total'];
						}else{
							output['wc_ytd_total'] = output['wc_total'] + this->converttofloat(pre_stub['wc_ytd_total']);
						}
					} else {
						output['wc_ytd_total'] = number_format(wc_tax * month * tdiff, 2, '.', '');
					}
					break;
				case 4:
					wc_tax = 0;
					wc_tax = total_hours * wc[year][state][year]['percent'][0];
					output['wc_total'] = wc_tax;
					if (isset(pre_stub['wc_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['wc_ytd_total'] = output['wc_total'];
						}else{
							output['wc_ytd_total'] = output['wc_total'] + this->converttofloat(pre_stub['wc_ytd_total']);
						}
					} else {
						output['wc_ytd_total'] = number_format(wc_tax * month * tdiff, 2, '.', '');
					}
					break;
			}
		}
		output['wc_total'] = this->converttofloat(output['wc_total']);
		output['wc_ytd_total'] = this->converttofloat(output['wc_ytd_total']);

		////////////////////WC SECURITY//////////////////////////////////
		/////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////
		////////////////////WF SECURITY//////////////////////////////
		output['wf_total'] = 0;
		output['wf_ytd_total'] = 0;
		if (isset(wf[year][state]) && !empty(wf[year][state])) {
			formula = wf[year][state][year]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wf[year][state][year]['maxtax'][0];
					percent = wf[year][state][year]['percent'][0];
					max = wf[year][state][year]['max'][0];
					wf_tax = 0;
					if (output['tytd'] < max) {
						output['wf_total'] = number_format(cTotal * (percent / 100), 2, '.', ''); //wf_tax/(month*tdiff);
						output['wf_total'] = number_format(this->converttofloat(output['wf_total']), 2, '.', '');
						if (isset(pre_stub['wf_ytd_total'])) {
							//diff = wf_tax - number_format(this->converttofloat(pre_stub['wf_ytd_total']), 2, '.', '');
							wf_tax = output['wf_total'] + number_format(this->converttofloat(pre_stub['wf_ytd_total']), 2, '.', '');
						} else {
							wf_tax = number_format(this->converttofloat(output['tytd'] * (percent / 100)), 2, '.', '');
						}
						//echo "<br />";
					} else if (output['tytd'] >= max) {
						wf_tax = maxtax;
						if (isset(pre_stub['wf_ytd_total'])) {
							diff = wf_tax - number_format(this->converttofloat(pre_stub['wf_ytd_total']), 2, '.', '');
						} else {
							diff = 0;
						}
						if (diff > 0) {
							output['wf_total'] = number_format(diff, 2, '.', '');
						} else {
							output['wf_total'] = 0;
						}
					}
					if (isset(pre_stub['wf_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['wf_ytd_total'] = output['wf_total'];
						}else{
							if(pre_stub['wf_ytd_total'] >=maxtax){
								output['wf_ytd_total']=maxtax;
							}else{
								output['wf_ytd_total'] = output['wf_total'] + this->converttofloat(pre_stub['wf_ytd_total']);
							}
						}
					} else {
						output['wf_ytd_total'] = wf_tax;
					}
					break;
				case 3:
					wf_tax = 0;
					if (duration == 'weekly') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['weekly'][0] / 100), 2, '.', '');
					} else if (duration == 'biweekly') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['biweekly'][0] / 100), 2, '.', '');
					} else if (duration == 'semimonthly') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['semimonthly'][0] / 100), 2, '.', '');
					} else if (duration == 'monthly') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['monthly'][0] / 100), 2, '.', '');
					}else if (duration == 'annual') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['annual'][0] / 100), 2, '.', '');
					}else if (duration == 'quarterly') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['quarterly'][0] / 100), 2, '.', '');
					}else if (duration == 'semiannual') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['semiannual'][0] / 100), 2, '.', '');
					} else if (duration == 'daily') {
						wf_tax = number_format(cTotal * (wf[year][state][year]['daily'][0] / 100), 2, '.', '');
					}   else {
						wf_tax = 0;
					}
					output['wf_total'] = wf_tax;
					if (isset(pre_stub['wf_ytd_total'])) {
						if (previ_payDate_year != current_payDate_year) {
							output['wf_ytd_total'] = output['wf_total'];
						}else{
							output['wf_ytd_total'] = output['wf_total'] + this->converttofloat(pre_stub['wf_ytd_total']);
						}
					} else {
						output['wf_ytd_total'] = number_format(wf_tax * month * tdiff, 2, '.', '');
					}
					break;
			}
		}
		output['wf_total'] = this->converttofloat(output['wf_total']);
		output['wf_ytd_total'] = this->converttofloat(output['wf_ytd_total']);
		////////////////////WF SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////
		////////////////////Cutome deduction ////////////////////

		totalCustomeDeduction=0;
		totalYtdCustomeDeduction=0;

		for(k=1;k<=custome_deduction_count;k++){
			if (isset(pre_stub['custome_deduction_ytd_total'.k.''])) {
				if (previ_payDate_year != current_payDate_year) {
					output['custome_deduction_ytd_total'.k.''] = postarr['custome_deduction_total'.k.''];
				}else{
					if(postarr['custome_deduction_total'.k.''] !=0){
						output['custome_deduction_ytd_total'.k.''] = postarr['custome_deduction_total'.k.''] + this->converttofloat(pre_stub['custome_deduction_ytd_total'.k.'']);
					}else{
						output['custome_deduction_ytd_total'.k.'']=postarr['custome_deduction_total'.k.''];
					}
				}
			} else {
				output['custome_deduction_ytd_total'.k.'']=number_format(this->converttofloat(postarr['custome_deduction_total'.k.'']*tdiff), 2, '.', '');
			}
			totalCustomeDeduction=number_format(this->converttofloat((float)str_replace(",", "", totalCustomeDeduction)+(float)str_replace(",", "", postarr['custome_deduction_total'.k.''])), 2, '.', '');
			totalYtdCustomeDeduction=number_format(this->converttofloat((float)str_replace(",", "", totalYtdCustomeDeduction)+(float)str_replace(",", "", output['custome_deduction_ytd_total'.k.''])), 2, '.', '');
		}

		////////////////////Cutome deduction ////////////////////
		/////////////////////////////////////////////////////////

    }
};