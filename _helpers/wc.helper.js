const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getWCTax: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var wc = paystubConfig[year].wc;
        output['wc_total'] = 0;
		output['wc_ytd_total'] = 0;
		if (isset(wc[state]) && !empty(wc[state])) {
			formula = wc[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wc[state]['maxtax'][0];
					percent = wc[state]['percent'][0];
					max = wc[state]['max'][0];
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
						wc_tax = wc[state]['weekly'][0]; //cTotal*(wc[state]['weekly'][0]/100);
					} else if (duration == 'biweekly') {
						wc_tax = wc[state]['biweekly'][0]; //cTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'semimonthly') {
						wc_tax = wc[state]['semimonthly'][0]; //cTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'monthly') {
						wc_tax = wc[state]['monthly'][0]; //cTotal*(wc[state]['biweekly'][0]/100);
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
					wc_tax = total_hours * wc[state]['percent'][0];
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
    },
    getWCTaxYTD: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var wc = paystubConfig[year].wc;
        output['wc_total'] = 0;
		output['wc_ytd_total'] = 0;
		if (isset(wc[state]) && !empty(wc[state])) {
			formula = wc[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = wc[state]['maxtax'][0];
					percent = wc[state]['percent'][0];
					max = wc[state]['max'][0];
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
						wc_tax = wc[state]['weekly'][0]; //cTotal*(wc[state]['weekly'][0]/100);
					} else if (duration == 'biweekly') {
						wc_tax = wc[state]['biweekly'][0]; //cTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'semimonthly') {
						wc_tax = wc[state]['semimonthly'][0]; //cTotal*(wc[state]['biweekly'][0]/100);
					} else if (duration == 'monthly') {
						wc_tax = wc[state]['monthly'][0]; //cTotal*(wc[state]['biweekly'][0]/100);
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
					wc_tax = total_hours * wc[state]['percent'][0];
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
    }
};