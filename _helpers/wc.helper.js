const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getWCTax: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var wc = paystubConfig[year].wc;
        wc_total = 0;
		if (typeof wc[state]  !== 'undefined' && wc[state]  !== "") {
			var formula =  wc[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wc[state]['maxtax'][0];
					percent = wc[state]['percent'][0];
					max = wc[state]['max'][0];
					wc_tax = 0;
					if (tytd < max) {
						wc_tax = tytd * (percent / 100);
						wc_total = paymentTotal * (percent / 100); //wc_tax/(month*term);
					} else if (tytd >= max) {
						wc_tax = maxtax;
						if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
							diff = wc_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							wc_total = diff;
						} else {
							wc_total = 0;
						}
					}
					if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wc_ytd_total = wc_total;
						}else{
							wc_ytd_total = wc_total + REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total);
						}
					} else {
						wc_ytd_total = REGEXPATTERN.number_format(wc_tax);
					}
					break;
				case 3:
					wc_tax = 0;
					if (duration == 'weekly') {
						wc_tax = wc[state]['weekly'][0]; //paymentTotal*(wc[state]['weekly'][0]/100);
					} else if (duration == 'biweekly') {
						wc_tax = wc[state]['biweekly'][0]; //paymentTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'semimonthly') {
						wc_tax = wc[state]['semimonthly'][0]; //paymentTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'monthly') {
						wc_tax = wc[state]['monthly'][0]; //paymentTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'annual') {
						wc_tax = wc[state]['annual'][0];
					}else if (duration == 'quarterly') {
						wc_tax = wc[state]['quarterly'][0];
					}else if (duration == 'semiannual') {
						wc_tax = wc[state]['semiannual'][0];
					}else if (duration == 'daily') {
						wc_tax = wc[state]['daily'][0];
					} else {
						wc_tax = 0;
					}
					wc_total = wc_tax;
					if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wc_ytd_total = wc_total;
						}else{
							wc_ytd_total = wc_total + REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total);
						}
					} else {
						wc_ytd_total = REGEXPATTERN.number_format(wc_tax * month * tdiff);
					}
					break;
				case 4:
					wc_tax = 0;
					wc_tax = total_hours * wc[state]['percent'][0];
					wc_total = wc_tax;
					if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wc_ytd_total = wc_total;
						}else{
							wc_ytd_total = wc_total + REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total);
						}
					} else {
						wc_ytd_total = REGEXPATTERN.number_format(wc_tax * month * tdiff);
					}
					break;
			}
		}
		wc_total = REGEXPATTERN.converttofloat(wc_total);
		wc_ytd_total = REGEXPATTERN.converttofloat(wc_ytd_total);
    },
    getWCTaxYTD: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var wc = paystubConfig[year].wc;
        wc_total = 0;
		wc_ytd_total = 0;
		if (typeof(wc[state])   !== 'undefined' && wc[state]  !== "") {
			var formula =  wc[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wc[state]['maxtax'][0];
					percent = wc[state]['percent'][0];
					max = wc[state]['max'][0];
					wc_tax = 0;
					if (tytd < max) {
						wc_tax = tytd * (percent / 100);
						wc_total = paymentTotal * (percent / 100); //wc_tax/(month*term);
					} else if (tytd >= max) {
						wc_tax = maxtax;
						if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
							diff = wc_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							wc_total = diff;
						} else {
							wc_total = 0;
						}
					}
					if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wc_ytd_total = wc_total;
						}else{
							wc_ytd_total = wc_total + REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total);
						}
					} else {
						wc_ytd_total = REGEXPATTERN.number_format(wc_tax);
					}
					break;
				case 3:
					wc_tax = 0;
					if (duration == 'weekly') {
						wc_tax = wc[state]['weekly'][0]; //paymentTotal*(wc[state]['weekly'][0]/100);
					} else if (duration == 'biweekly') {
						wc_tax = wc[state]['biweekly'][0]; //paymentTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'semimonthly') {
						wc_tax = wc[state]['semimonthly'][0]; //paymentTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'monthly') {
						wc_tax = wc[state]['monthly'][0]; //paymentTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'annual') {
						wc_tax = wc[state]['annual'][0];
					}else if (duration == 'quarterly') {
						wc_tax = wc[state]['quarterly'][0];
					}else if (duration == 'semiannual') {
						wc_tax = wc[state]['semiannual'][0];
					}else if (duration == 'daily') {
						wc_tax = wc[state]['daily'][0];
					} else {
						wc_tax = 0;
					}
					wc_total = wc_tax;
					if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wc_ytd_total = wc_total;
						}else{
							wc_ytd_total = wc_total + REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total);
						}
					} else {
						wc_ytd_total = REGEXPATTERN.number_format(wc_tax * month * tdiff);
					}
					break;
				case 4:
					wc_tax = 0;
					wc_tax = total_hours * wc[state]['percent'][0];
					wc_total = wc_tax;
					if (typeof pre_stub_wc_ytd_total   !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							wc_ytd_total = wc_total;
						}else{
							wc_ytd_total = wc_total + REGEXPATTERN.converttofloat(pre_stub_wc_ytd_total);
						}
					} else {
						wc_ytd_total = REGEXPATTERN.number_format(wc_tax * month * tdiff);
					}
					break;
			}
		}
		wc_total = REGEXPATTERN.converttofloat(wc_total);
		wc_ytd_total = REGEXPATTERN.converttofloat(wc_ytd_total);
    }
};