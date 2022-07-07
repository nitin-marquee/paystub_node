const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getFlvTax: async (year,state, paymentTotal, pre_stub_flv_ytd_total, tytd) => {
		var flv = paystubConfig[year].flv;
        var flv_total = 0;
		if ( typeof flv[state] !=='undefined' && flv[state] !== "") {
			var formula = flv[state]['flag'][0];
			switch (formula) {
				case 1:
					var maxtax = flv[state]['maxtax'][0];
					var percent = flv[state]['percent'][0];
					var max = flv[state]['max'][0];
					var flv_tax = 0;
					if (tytd < max) {
						flv_tax = tytd * (percent / 100);
						flv_total = paymentTotal * (percent / 100); //flv_tax/(month*term);
					} else if (tytd >= max) {
						flv_tax = maxtax;
						if (typeof pre_stub_flv_ytd_total !== 'undefined' ) {
							var diff = flv_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_flv_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							flv_total = diff;
						} else {
							flv_total = 0;
						}
					}
					break;
			}
		}

		flv_total = REGEXPATTERN.converttofloat(flv_total);

		return flv_total;
    },
    getFlvTaxYTD: async (year,state, paymentTotal, tytd ,previ_payDate_year, current_payDate_year, flv_total, pre_stub_flv_ytd_total, ) => {
		var flv = paystubConfig[year].flv;
		var flv_ytd_total = 0;
		if (typeof flv[state] !== 'undefined' && flv[state] !== "") {
			var formula = flv[state]['flag'][0];
			switch (formula) {
				case 1:
					var maxtax = flv[state]['maxtax'][0];
					var percent = flv[state]['percent'][0];
					var max = flv[state]['max'][0];
					var flv_tax = 0;
					if (tytd < max) {
						flv_tax = tytd * (percent / 100);
						flv_total = paymentTotal * (percent / 100); //flv_tax/(month*term);
					} else if (tytd >= max) {
						flv_tax = maxtax;
						if (typeof pre_stub_flv_ytd_total !== 'undefined' ) {
							var diff = flv_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_flv_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							flv_total = diff;
						} else {
							flv_total = 0;
						}

					}

					if (typeof pre_stub_flv_ytd_total !== 'undefined' ) {
						if (previ_payDate_year != current_payDate_year) {
							flv_ytd_total = flv_total;
						}else{
							if(pre_stub_flv_ytd_total >=maxtax){
								flv_ytd_total=maxtax;
							}else{
								flv_ytd_total = flv_total + REGEXPATTERN.converttofloat(pre_stub_flv_ytd_total);
							}
						}
					} else {
						flv_ytd_total = REGEXPATTERN.number_format(flv_tax);
					}
					break;
			}
		}

		flv_ytd_total = REGEXPATTERN.converttofloat(flv_ytd_total);
		return flv_ytd_total;
    }
};