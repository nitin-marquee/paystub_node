const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getWFTax: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
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
    },
    getWFTaxYTD: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
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
    }
};