const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    getMedicareTax: async (year, paymentTotal, paymentMode) => {
        var mTaxRate = 0;
		var medicare = 0;
        var medi =  paystubConfig[year].medi;
		var taxableIncome = paymentTotal * paymentMode;
		if (taxableIncome < medi['max']) {
			medicare = taxableIncome * medi['p1'];
			mTaxRate = medi['p1'];
		} else if (taxableIncome >= medi['max']) {
			medicare = medi['max'] * medi['p1'];
			r = taxableIncome - medi['max'];
			medicare += r * medi['p2'];
			mTaxRate = medi['p2'];
		}

		medicare = medicare / paymentMode;
        if (medicare > 0)
            return  Math.round(medicare * 100) / 100;
        else
            return Math.round(0 * 100) / 100;
        
    },
    getMedicareTaxYTD: async (year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff) => {
        var mTaxRate = 0;
		var fica_medicare_ytd_total = 0;
        var medi =  paystubConfig[year].medi;
		var taxableIncome = paymentTotal * paymentMode;
		if (taxableIncome < medi['max']) {
			mTaxRate = medi['p1'];
		} else if (taxableIncome >= medi['max']) {

			mTaxRate = medi['p2'];
		}
        if (typeof pre_stub_fica_medicare_ytd_total !== 'undefined' ) {
			if (previ_payDate_year != current_payDate_year) {
			    fica_medicare_ytd_total = fica_medicare_total;
			}else{
				if(mTaxRate !=0){
					fica_medicare_ytd_total =Math.round((fica_medicare_total + pre_stub_fica_medicare_ytd_total)*100)/100;
				}else{
					fica_medicare_ytd_total = fica_medicare_total;
				}
			}
		} else {
			fica_medicare_ytd_total = Math.round(fica_medicare_total* month * tdiff*100)/100;
		}

        return fica_medicare_ytd_total;
    }

};