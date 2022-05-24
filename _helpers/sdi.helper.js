const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getSdiTax: async (year, pre_stub_sdi_ytd_total, tytd, state, paymentTotal) => {
        var sdi = paystubConfig[year].sdi;
        sdi_total = 0;
		// sdi_ytd_total = 0;
		if (typeof sdi[state] !=='undefined' &&  sdi[state] === "") {
			var formula =  sdi[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sdi[state]['maxtax'][0];
					percent = sdi[state]['percent'][0];
					max = sdi[state]['max'][0];
					sdi_tax = 0;
					if (tytd < max) {
						sdi_tax = tytd * (percent / 100);
						sdi_total = REGEXPATTERN.number_format(paymentTotal * (percent / 100)); //sdi_tax/(month*term);
					} else if (tytd >= max) {
						sdi_tax = maxtax;
						if (typeof pre_stub_sdi_ytd_total !=='undefined') {
							diff = sdi_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_sdi_ytd_total));
						} else {
							diff = 0;
						}
						if (diff > 0) {
							sdi_total = diff;
						} else {
							sdi_total = 0;
						}
					}

					if (typeof pre_stub_sdi_ytd_total !=='undefined') {
						if (previ_payDate_year != current_payDate_year) {
							sdi_ytd_total = sdi_total;
						}else{
							if(pre_stub_sdi_ytd_total >=maxtax){
								sdi_ytd_total=maxtax;
							}else{
								sdi_ytd_total = sdi_total + REGEXPATTERN.converttofloat(pre_stub_sdi_ytd_total);
							}
						}
					} else {
						sdi_ytd_total = REGEXPATTERN.number_format(sdi_tax );
					}
					break;
				case 2:
					percent = sdi[state]['percent'][0];
					maxtax = sdi[state]['maxtax'][0];
					sdi_tax = 0;
					sdi_tax = REGEXPATTERN.number_format(paymentTotal * (percent / 100));
					if (duration == 'weekly') {
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					} else if (duration == 'biweekly' || duration == 'semimonthly') {
						maxtax = maxtax * 2;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					} else if (duration == 'monthly') {
						maxtax = maxtax * 4;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'annual') {
						maxtax = maxtax * 52;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'quarterly') {
						maxtax = maxtax * 12;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'semiannual') {
						maxtax = maxtax * 24;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'daily') {
						maxtax = maxtax / 7;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}
					if (typeof pre_stub_sdi_ytd_total !=='undefined') {
						if (previ_payDate_year != current_payDate_year) {
							sdi_ytd_total = sdi_total;
						}else{
							sdi_ytd_total = sdi_total + REGEXPATTERN.converttofloat(pre_stub_sdi_ytd_total);
						}
					} else {
						sdi_ytd_total = REGEXPATTERN.number_format(sdi_tax * month * tdiff);
					}
					break;
			}
		}
		sdi_total = REGEXPATTERN.converttofloat(sdi_total);
		// sdi_ytd_total = REGEXPATTERN.converttofloat(sdi_ytd_total);

    },
    getSdiTaxYTD: async (year, sdi_total, pre_stub_sdi_ytd_total, tytd, paymentTotal, month , tdiff, previ_payDate_year , current_payDate_year) => {
        var sdi = paystubConfig[year].sdi;
        // sdi_total = 0;
		sdi_ytd_total = 0;
		if (typeof sdi[state] !=='undefined' &&  sdi[state] === "") {
			var formula =  sdi[state]['flag'][0];
			switch (formula) {
				case 1:
					maxtax = sdi[state]['maxtax'][0];
					percent = sdi[state]['percent'][0];
					max = sdi[state]['max'][0];
					sdi_tax = 0;

					if (typeof pre_stub_sdi_ytd_total !=='undefined') {
						if (previ_payDate_year != current_payDate_year) {
							sdi_ytd_total = sdi_total;
						}else{
							if(pre_stub_sdi_ytd_total >=maxtax){
								sdi_ytd_total=maxtax;
							}else{
								sdi_ytd_total = sdi_total + REGEXPATTERN.converttofloat(pre_stub_sdi_ytd_total);
							}
						}
					} else {
						sdi_ytd_total = REGEXPATTERN.number_format(sdi_tax );
					}
					break;
				case 2:
					percent = sdi[state]['percent'][0];
					maxtax = sdi[state]['maxtax'][0];
					sdi_tax = 0;
					sdi_tax = REGEXPATTERN.number_format(paymentTotal * (percent / 100));
					if (duration == 'weekly') {
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					} else if (duration == 'biweekly' || duration == 'semimonthly') {
						maxtax = maxtax * 2;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					} else if (duration == 'monthly') {
						maxtax = maxtax * 4;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'annual') {
						maxtax = maxtax * 52;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'quarterly') {
						maxtax = maxtax * 12;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'semiannual') {
						maxtax = maxtax * 24;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}else if (duration == 'daily') {
						maxtax = maxtax / 7;
						if (sdi_tax >= maxtax) {
							sdi_tax = REGEXPATTERN.number_format(maxtax);
							sdi_total = sdi_tax;
						} else {
							sdi_total = sdi_tax;
						}
					}
					if (typeof pre_stub_sdi_ytd_total !=='undefined') {
						if (previ_payDate_year != current_payDate_year) {
							sdi_ytd_total = sdi_total;
						}else{
							sdi_ytd_total = sdi_total + REGEXPATTERN.converttofloat(pre_stub_sdi_ytd_total);
						}
					} else {
						sdi_ytd_total = REGEXPATTERN.number_format(sdi_total * month * tdiff);
					}
					break;
			}
		}
		// sdi_total = REGEXPATTERN.converttofloat(sdi_total);
		sdi_ytd_total = REGEXPATTERN.converttofloat(sdi_ytd_total);
	}
};