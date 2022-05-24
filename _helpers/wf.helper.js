const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

	getWFTax: async (year, state, paymentTotal, duration, tytd) => {
		var wf = paystubConfig[year].wf;
		var wf_total = 0;
		// var wf_ytd_total= 0;
		if (typeof wf[state] !== 'undefined'() && !empty(wf[state])) {
			var formula = wf[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wf[state]['maxtax'][0];
					percent = wf[state]['percent'][0];
					max = wf[state]['max'][0];
					wf_tax = 0;
					if (tytd < max) {
						wf_total = REGEXPATTERN.number_format(paymentTotal * (percent / 100)); //wf_tax/(month*tdiff);
						wf_total = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(wf_total));
						if (typeof pre_stub_wf_ytd_total !== 'undefined') {
							//diff = wf_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_wf_ytd_total));
							wf_tax = wf_total + REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_wf_ytd_total));
						} else {
							wf_tax = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(tytd * (percent / 100)));
						}
						//echo "<br />";
					} else if (tytd >= max) {
						wf_tax = maxtax;
						if (typeof pre_stub_wf_ytd_total !== 'undefined') {
							diff = wf_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_wf_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							wf_total = REGEXPATTERN.number_format(diff);
						} else {
							wf_total = 0;
						}
					}
					// if (typeof   pre_stub_wf_ytd_total  !== 'undefined') {
					// 	if (previ_payDate_year != current_payDate_year) {
					// 		wf_ytd_total = wf_total;
					// 	}else{
					// 		if(pre_stub_wf_ytd_total >=maxtax){
					// 			wf_ytd_total=maxtax;
					// 		}else{
					// 			wf_ytd_total = wf_total + REGEXPATTERN.converttofloat(pre_stub_wf_ytd_total);
					// 		}
					// 	}
					// } else {
					// 	wf_ytd_total = wf_tax;
					// }
					break;
				case 3:
					wf_tax = 0;
					if (duration == 'weekly') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['weekly'][0] / 100));
					} else if (duration == 'biweekly') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['biweekly'][0] / 100));
					} else if (duration == 'semimonthly') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['semimonthly'][0] / 100));
					} else if (duration == 'monthly') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['monthly'][0] / 100));
					} else if (duration == 'annual') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['annual'][0] / 100));
					} else if (duration == 'quarterly') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['quarterly'][0] / 100));
					} else if (duration == 'semiannual') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['semiannual'][0] / 100));
					} else if (duration == 'daily') {
						wf_tax = REGEXPATTERN.number_format(paymentTotal * (wf[state]['daily'][0] / 100));
					} else {
						wf_tax = 0;
					}
					wf_total = wf_tax;
					// if (typeof   pre_stub_wf_ytd_total  !== 'undefined') {
					// 	if (previ_payDate_year != current_payDate_year) {
					// 		wf_ytd_total = wf_total;
					// 	}else{
					// 		wf_ytd_total = wf_total + REGEXPATTERN.converttofloat(pre_stub_wf_ytd_total);
					// 	}
					// } else {
					// 	wf_ytd_total = REGEXPATTERN.number_format(wf_tax * month * tdiff);
					// }
					break;
			}
		}
		wf_total = REGEXPATTERN.converttofloat(wf_total);
		// wf_ytd_total = REGEXPATTERN.converttofloat(wf_ytd_total);
	},
	getWFTaxYTD: async (year, state, paymentTotal, duration, wf_total, previ_payDate_year, current_payDate_year, pre_stub_wf_ytd_total, month, tdiff) => {
		var wf = paystubConfig[year].wf;
		// var wf_total = 0;
		var wf_ytd_total
		if (typeof wf[state] !== 'undefined' && wf[state] !== "") {
			var formula = wf[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wf[state]['maxtax'][0];
					percent = wf[state]['percent'][0];
					max = wf[state]['max'][0];

					if (typeof pre_stub_wf_ytd_total !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wf_ytd_total = wf_total;
						} else {
							if (pre_stub_wf_ytd_total >= maxtax) {
								wf_ytd_total = maxtax;
							} else {
								wf_ytd_total = wf_total + REGEXPATTERN.converttofloat(pre_stub_wf_ytd_total);
							}
						}
					} else {
						wf_ytd_total = wf_tax;
					}
					break;
				case 3:

					if (typeof pre_stub_wf_ytd_total !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wf_ytd_total = wf_total;
						} else {
							wf_ytd_total = wf_total + REGEXPATTERN.converttofloat(pre_stub_wf_ytd_total);
						}
					} else {
						wf_ytd_total = REGEXPATTERN.number_format(wf_total * month * tdiff);
					}
					break;
			}
		}
		
		wf_ytd_total = REGEXPATTERN.converttofloat(wf_ytd_total);
	}
};