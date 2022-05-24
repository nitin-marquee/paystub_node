const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getSocialTax: async (year, tytd, paymentTotal) => {

        var soci = paystubConfig[year].social;
        social = tytd * soci['p1']; //18600
		sRestAmount = 0;
		sTotal = paymentTotal * soci['p1'];
		if (social > soci['max']) {
			sRestAmount = social - soci['max']; //11253
			social = soci['max'];
			sTotal = 0;
			if (typeof pre_stub_fica_social_security_ytd_total !== 'undefined') {
				sTotal = social - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_fica_social_security_ytd_total ));
			} else {
				sTotal = paymentTotal * soci['p1'];
			}
			if(sTotal>0){
				fica_social_security_total = REGEXPATTERN.number_format(sTotal);
			}else if(sTotal==0){
				sTotal += paymentTotal * soci['p1'];
			} else {
 				fica_social_security_total = 0;
			}
			fica_social_security_ytd_total = REGEXPATTERN.number_format(social );
		} else {
			fica_social_security_total = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(sTotal));
			if (typeof pre_stub_fica_social_security_ytd_total !== 'undefined') {
				if (previ_payDate_year != current_payDate_year) {
					fica_social_security_ytd_total = REGEXPATTERN.number_format(fica_social_security_total);
				}else{
					if(pre_stub_fica_social_security_ytd_total  > soci['max']){
						fica_social_security_ytd_total = REGEXPATTERN.number_format(soci['max']);
					}else{
						fica_social_security_ytd_total = REGEXPATTERN.number_format(fica_social_security_total + REGEXPATTERN.converttofloat(pre_stub_fica_social_security_ytd_total ));
					}
				}
			} else {
				fica_social_security_ytd_total = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(social));
			}
		}

    },
    getSocialTaxYTD: async (year,tytd,paymentTotal, fica_social_security_total,pre_stub_fica_social_security_ytd_total) => {

        var soci = paystubConfig[year].social;
        social = tytd * soci['p1']; //18600
		sRestAmount = 0;
		sTotal = paymentTotal * soci['p1'];
		if (social > soci['max']) {
			sRestAmount = social - soci['max']; //11253
			social = soci['max'];
			sTotal = 0;
			if (typeof pre_stub_fica_social_security_ytd_total !== 'undefined') {
				sTotal = social - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(pre_stub_fica_social_security_ytd_total ));
			} else {
				sTotal = paymentTotal * soci['p1'];
			}
			if(sTotal>0){
				fica_social_security_total = REGEXPATTERN.number_format(sTotal);
			}else if(sTotal==0){
				sTotal += paymentTotal * soci['p1'];
			} else {
 				fica_social_security_total = 0;
			}
			fica_social_security_ytd_total = REGEXPATTERN.number_format(social );
		} else {
			fica_social_security_total = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(sTotal));
			if (typeof pre_stub_fica_social_security_ytd_total !== 'undefined') {
				if (previ_payDate_year != current_payDate_year) {
					fica_social_security_ytd_total = REGEXPATTERN.number_format(fica_social_security_total);
				}else{
					if(pre_stub_fica_social_security_ytd_total  > soci['max']){
						fica_social_security_ytd_total = REGEXPATTERN.number_format(soci['max']);
					}else{
						fica_social_security_ytd_total = REGEXPATTERN.number_format(fica_social_security_total + REGEXPATTERN.converttofloat(pre_stub_fica_social_security_ytd_total ));
					}
				}
			} else {
				fica_social_security_ytd_total = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(social));
			}
		}

    }
};