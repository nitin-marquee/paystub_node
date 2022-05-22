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
				sTotal = social - number_format(this->converttofloat(pre_stub_fica_social_security_ytd_total ), 2, '.', '');
			} else {
				sTotal = paymentTotal * soci['p1'];
			}
			if(sTotal>0){
				fica_social_security_total = number_format(sTotal, 2, '.', '');
			}else if(sTotal==0){
				sTotal += paymentTotal * soci['p1'];
			} else {
 				fica_social_security_total = 0;
			}
			fica_social_security_ytd_total = number_format(social , 2, '.', '');
		} else {
			fica_social_security_total = number_format(this->converttofloat(sTotal), 2, '.', '');
			if (typeof pre_stub_fica_social_security_ytd_total !== 'undefined') {
				if (previ_payDate_year != current_payDate_year) {
					fica_social_security_ytd_total = number_format(fica_social_security_total, 2, '.', '');
				}else{
					if(pre_stub_fica_social_security_ytd_total  > soci['max']){
						fica_social_security_ytd_total = number_format(soci['max'], 2, '.', '');
					}else{
						fica_social_security_ytd_total = number_format(fica_social_security_total + this->converttofloat(pre_stub_fica_social_security_ytd_total ), 2, '.', '');
					}
				}
			} else {
				fica_social_security_ytd_total = number_format(this->converttofloat(social), 2, '.', '');
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
				sTotal = social - number_format(this->converttofloat(pre_stub_fica_social_security_ytd_total ), 2, '.', '');
			} else {
				sTotal = paymentTotal * soci['p1'];
			}
			if(sTotal>0){
				fica_social_security_total = number_format(sTotal, 2, '.', '');
			}else if(sTotal==0){
				sTotal += paymentTotal * soci['p1'];
			} else {
 				fica_social_security_total = 0;
			}
			fica_social_security_ytd_total = number_format(social , 2, '.', '');
		} else {
			fica_social_security_total = number_format(this->converttofloat(sTotal), 2, '.', '');
			if (typeof pre_stub_fica_social_security_ytd_total !== 'undefined') {
				if (previ_payDate_year != current_payDate_year) {
					fica_social_security_ytd_total = number_format(fica_social_security_total, 2, '.', '');
				}else{
					if(pre_stub_fica_social_security_ytd_total  > soci['max']){
						fica_social_security_ytd_total = number_format(soci['max'], 2, '.', '');
					}else{
						fica_social_security_ytd_total = number_format(fica_social_security_total + this->converttofloat(pre_stub_fica_social_security_ytd_total ), 2, '.', '');
					}
				}
			} else {
				fica_social_security_ytd_total = number_format(this->converttofloat(social), 2, '.', '');
			}
		}

    }
};