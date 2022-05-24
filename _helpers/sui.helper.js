const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getSuiTax: async (year, paymentTotal,previ_payDate_year , current_payDate_year) => {
		var sui = paystubConfig[year].sui;
        var sui_total = 0;
		// var sui_ytd_total = 0;
		if (typeof  sui[state]!== 'undefined'  && sui[state] !== "") {
			var formula =  sui[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sui[state]['maxtax'][0];
					percent = sui[state]['percent'][0];
					max = sui[state]['max'][0];
					var sui_tax = 0;
					if (tytd < max) {
						sui_tax = REGEXPATTERN.number_format(tytd * (percent / 100));
						sui_total = REGEXPATTERN.number_format(paymentTotal * (percent / 100)); //sui_tax/(month*term);
						
					} else if (tytd >= max) {
						
						sui_tax = maxtax;
						if (typeof pre_stub_sui_ytd_total !== 'undefined') {
							diff = sui_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_sui_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							sui_total = diff;
						} else {
							sui_total = 0;
						}
					}
					if (typeof  pre_stub_sui_ytd_total !== 'undefined' ) {
						if (previ_payDate_year != current_payDate_year) {
							sui_ytd_total = sui_total;
						}else{
							if(pre_stub_sui_ytd_total >=maxtax){
								sui_ytd_total=maxtax;
							}else{
								sui_ytd_total = sui_total + REGEXPATTERN.converttofloat(pre_stub_sui_ytd_total);
							}
						}
					} else {
						sui_ytd_total = REGEXPATTERN.number_format(sui_tax);
					}

					break;
				case 5:
					percent = sui[state]['percent'][0];
					sui_tax = REGEXPATTERN.number_format(tytd * (percent / 100));
					sui_total = REGEXPATTERN.number_format(paymentTotal * (percent / 100)); //sui_tax/(month*term);
					if (typeof  pre_stub_sui_ytd_total !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							sui_ytd_total = sui_total;
						}else{
							sui_ytd_total = sui_total + REGEXPATTERN.converttofloat(pre_stub_sui_ytd_total);
						}
					} else {
						sui_ytd_total = REGEXPATTERN.number_format(sui_tax);
					}
					break;
			}
		}
		sui_total = REGEXPATTERN.converttofloat(sui_total);
		sui_ytd_total = REGEXPATTERN.converttofloat(sui_ytd_total);

    },
    getSuiTaxYTD: async (year, paymentTotal,previ_payDate_year , current_payDate_year, sui_total, pre_stub_sui_ytd_total) => { 	
		var sui = paystubConfig[year].sui;
        sui_total = 0;
		sui_ytd_total = 0;
		if (typeof sui[state] !== 'undefined'  && sui[state]!== "") {
			var formula =  sui[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sui[state]['maxtax'][0];
					percent = sui[state]['percent'][0];
					max = sui[state]['max'][0];
					sui_tax = 0;
					if (tytd < max) {
						sui_tax = REGEXPATTERN.number_format(tytd * (percent / 100));
						sui_total = REGEXPATTERN.number_format(paymentTotal * (percent / 100)); //sui_tax/(month*term);
						//echo sui_tax." = ".tytd."*(".(percent/100).")";echo "<br/>";
						//echo sui_total." = ".sui_tax."/(".month*term.")";echo "<br/>";
					} else if (tytd >= max) {
						//print_r(output);
						sui_tax = maxtax;
						if (typeof  pre_stub_sui_ytd_total !== 'undefined') {
							diff = sui_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_sui_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							sui_total = diff;
						} else {
							sui_total = 0;
						}
					}
					if (typeof  pre_stub_sui_ytd_total !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							sui_ytd_total = sui_total;
						}else{
							if(pre_stub_sui_ytd_total >=maxtax){
								sui_ytd_total=maxtax;
							}else{
								sui_ytd_total = sui_total + REGEXPATTERN.converttofloat(pre_stub_sui_ytd_total);
							}
						}
					} else {
						sui_ytd_total = REGEXPATTERN.number_format(sui_tax);
					}

					break;
				case 5:
					percent = sui[state]['percent'][0];
					sui_tax = REGEXPATTERN.number_format(tytd * (percent / 100));
					sui_total = REGEXPATTERN.number_format(paymentTotal * (percent / 100)); //sui_tax/(month*term);
					if (typeof  pre_stub_sui_ytd_total !== 'undefined') {
						if (previ_payDate_year != current_payDate_year) {
							sui_ytd_total = sui_total;
						}else{
							sui_ytd_total = sui_total + REGEXPATTERN.converttofloat(pre_stub_sui_ytd_total);
						}
					} else {
						sui_ytd_total = REGEXPATTERN.number_format(sui_tax);
					}
					break;
			}
		}
		sui_total = REGEXPATTERN.converttofloat(sui_total);
		sui_ytd_total = REGEXPATTERN.converttofloat(sui_ytd_total);

    }
};