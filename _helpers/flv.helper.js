const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getFlvTax: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var flv = paystubConfig[year].flv;
        output['flv_total'] = 0;
		output['flv_ytd_total'] = 0;
		if (isset(flv[state]) && !empty(flv[state])) {
			formula = flv[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = flv[state]['maxtax'][0];
					percent = flv[state]['percent'][0];
					max = flv[state]['max'][0];
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
    },
    getFlvTaxYTD: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var flv = paystubConfig[year].flv;
        output['flv_total'] = 0;
		output['flv_ytd_total'] = 0;
		if (isset(flv[state]) && !empty(flv[state])) {
			formula = flv[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = flv[state]['maxtax'][0];
					percent = flv[state]['percent'][0];
					max = flv[state]['max'][0];
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
    }
};