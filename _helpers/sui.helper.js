const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getSuiTax: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var sui = paystubConfig[year].sui;
        output['sui_total'] = 0;
		output['sui_ytd_total'] = 0;
		if (isset(sui[state][state]) && !empty(sui[state][state])) {
			formula = sui[state][state][state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sui[state][state][state]['maxtax'][0];
					percent = sui[state][state][state]['percent'][0];
					max = sui[state][state][state]['max'][0];
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
					percent = sui[state][state][state]['percent'][0];
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

    },
    getSuiTaxYTD: async (year, maritalStatus, paymentTotal, paymentMode, exemp = null) => {
		var sui = paystubConfig[year].sui;
        output['sui_total'] = 0;
		output['sui_ytd_total'] = 0;
		if (isset(sui[state][state]) && !empty(sui[state][state])) {
			formula = sui[state][state][state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sui[state][state][state]['maxtax'][0];
					percent = sui[state][state][state]['percent'][0];
					max = sui[state][state][state]['max'][0];
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
					percent = sui[state][state][state]['percent'][0];
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

    }
};