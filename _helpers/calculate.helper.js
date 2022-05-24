const FEDERALTAXHELPER = require('federalTax.helper');
const STATETAXHELPER = require('stateTax.helper');
const FLVTAXHELPER = require('flv.helper');
const MEDITAXHELPER = require('medi.helper');
const SDITAXHELPER = require('sdi.helper');
const SOCIALTAXHELPER = require('social.helper');
const WCTAXHELPER = require('wc.helper');
const WFTAXHELPER = require('wf.helper');
const EXPTAXHELPER = require('exp.helper');
const SUITAXHELPER = require('sui.helper');
const REGEXPATTERN = require('../utils/regexPattern');

module.exports = {

    calculate: async () => {

		
		var cTotal 	= REGEXPATTERN.converttofloat($postarr['cTotal']);
		var current1 	= REGEXPATTERN.converttofloat($postarr['current1']);
		var current2 	= REGEXPATTERN.converttofloat($postarr['current2']);
		var current3 	= REGEXPATTERN.converttofloat($postarr['current3']);
		var current4 	= REGEXPATTERN.converttofloat($postarr['current4']);
		var current5 	= REGEXPATTERN.converttofloat($postarr['current5']);
		var current6 	= REGEXPATTERN.converttofloat($postarr['current6']);
		var current7   = REGEXPATTERN.converttofloat($postarr['current7']);
		var current8   = REGEXPATTERN.converttofloat($postarr['current8']);
		var custome_deduction_count = $postarr['custome_deduction_count'];
		var custome_earnings_count =$postarr['custome_earnings_count'];
		var totalCustomeEarnings=0;
		var totalYtdCustomeEarnings=0;
		var state  	= $postarr['state'];
		var payMode 	= $postarr['payMode'];
		var exemp 		= intval($postarr['exemp']);
		var mStatus 	= strtolower($postarr['mStatus']);
		var pay_date 	= $postarr['pay_date'];
		var away_date 	= isset($postarr['away_date'])? $postarr['away_date'] : '';
		var empYTD 	= $postarr['empYTD'];
		var empType    = $postarr['empType'];
		var paymentType  =$postarr['paymentType'];
		var pay_period_start 	= $postarr['pay_period_start'];
		var pay_period_end 	= $postarr['pay_period_end'];
		var output = array();
		var duration = '';
		var month = date("m", strtotime($pay_date));
		var year = date("Y", strtotime($pay_date));
		var day = date("d", strtotime($pay_date));
		var term = 0;

		var current_payDate_year=$year;

		var diffDate= date_diff(date_create($pay_period_end), date_create($pay_period_start));

		var diffDay=$diffDate->format('%a');

		//print_r($diffDay);
		var previ_payDate_year = date("Y",strtotime("-".($diffDay+1)." days",strtotime($pay_date)));

		var output['pay_period_end'] = str_replace("/", "/", $pay_period_end);
		var output['pay_date'] = $pay_date;

		var ddate = date("Y-m-d", strtotime($pay_date));
		var date = new DateTime($ddate);

		// Calculate working days of ther year
		var endDate = strtotime($ddate);
		var startDate = strtotime($year."-01-01");
		var days = ($endDate - $startDate) / 86400 + 1;
		var no_full_weeks = floor($days / 7);
		var no_remaining_days = fmod($days, 7);
		var the_first_day_of_week = date("N", $startDate);
		var the_last_day_of_week = date("N", $endDate);
		if ($the_first_day_of_week <= $the_last_day_of_week) {
			if ($the_first_day_of_week <= 6 && 6 <= $the_last_day_of_week) $no_remaining_days--;
			if ($the_first_day_of_week <= 7 && 7 <= $the_last_day_of_week) $no_remaining_days--;
		}
		else {
			if ($the_first_day_of_week == 7) {
				$no_remaining_days--;

				if ($the_last_day_of_week == 6) {
					$no_remaining_days--;
				}
			}
			else {
				$no_remaining_days -= 2;
			}
		}
	   	$workingDays = $no_full_weeks * 5;
		if ($no_remaining_days > 0 )
		{
		  $workingDays += $no_remaining_days;
		}

		switch (payMode) {
			case 260:
				duration = 'daily';
				month = 1;
				term = workingDays;
				break;
			case 52:
				duration = 'weekly';
				month = 1;
				days = $date->format("z")+1;
				term = ceil($days / 7);
				term = term==53?52:term;
				break;
			case 26:
				duration = 'biweekly';
				month = 1;
				days = $date->format("z")+1;
				term = ceil($days / 14);
				term = term==27?26:term;
				break;
			case 12:
				duration = 'monthly';
				month = 1;
				term =  $date->format("m");
				term = $term==13?12:$term;
				break;
			case 24:
				duration = 'semimonthly';
				month = 1;
				days = $date->format("z")+1;
				term = ceil($days / 15);
				term = term==25?24:term;
				break;
			case 4:
				duration = 'quarterly';
				month = 1;
				months = $date->format("m");
				term = ceil($months / 3);
				break;
			case 2:
				duration = 'semiannual';
				month = 1;
				months = $date->format("m");
				term = ceil($months / 6);
				break;
			case 1:
				duration = 'annual';
				month = 1;
				term = 1;
				break;
		}
		$output['pay_period_start'] = $pay_period_start;

		// check if year is same or else generate as first stub
		$year2 = date("Y", strtotime($output['pay_period_start']));
		$makeItNew = 0;

		if ($previ_payDate_year != $current_payDate_year) {
			$makeItNew = 1;
			term = 1;
		}

		$tdiff = 1;
		$indexn = $i_index+1;
		if($empYTD!=''){
			if($indexn == $empYTD){
				$tdiff=0;
			}else if($empYTD > term){
				$tdiff = term - 1;
			}else{
				$tdiff = $empYTD - $indexn;
			}
		} else {
			$tdiff = $term - 1;
		}

		if($empType=='contractor'){
			if(!empty($pre_stub)){
				if($makeItNew==1)
				{
					$output['tytd'] = $cTotal;
					$output['ytd1'] = $current1;
					$output['ytd2'] = $current2;
					$output['ytd3'] = $current3;
					$output['ytd4'] = $current4;
					$output['ytd5'] = $current5;
					$output['ytd6'] = $current6;
					$output['ytd7'] = $current7;
					$output['ytd8'] = $current8;
					for($k=1;$k<=$custome_earnings_count;$k++){
						$output['custome_earnings_ytd'.$k.'']=$postarr['custome_earnings_current'.$k.''];
					}
				}
				else
				{
					$output['tytd'] = $cTotal+REGEXPATTERN.converttofloat($pre_stub['tytd']);
					$output['ytd1'] = $current1+REGEXPATTERN.converttofloat($pre_stub['ytd1']);
					$output['ytd2'] = $current2+REGEXPATTERN.converttofloat($pre_stub['ytd2']);
					$output['ytd3'] = $current3+REGEXPATTERN.converttofloat($pre_stub['ytd3']);
					$output['ytd4'] = $current4+REGEXPATTERN.converttofloat($pre_stub['ytd4']);
					$output['ytd5'] = $current5+REGEXPATTERN.converttofloat($pre_stub['ytd5']);
					$output['ytd6'] = $current6+REGEXPATTERN.converttofloat($pre_stub['ytd6']);
					$output['ytd7'] = $current7+REGEXPATTERN.converttofloat($pre_stub['ytd7']);
					$output['ytd8'] = $current8+REGEXPATTERN.converttofloat($pre_stub['ytd8']);
					for($k=1;$k<=$custome_earnings_count;$k++){
						$output['custome_earnings_ytd'.$k.'']=$postarr['custome_earnings_current'.$k.'']+REGEXPATTERN.converttofloat($pre_stub['custome_earnings_ytd'.$k.'']);
					}
				}
			}else{

				$output['tytd'] = number_format($cTotal*$month*$tdiff, 2, '.', '');
				$output['ytd1'] = number_format($current1*$month*$tdiff, 2, '.', '');
				$output['ytd2'] = number_format($current2*$month*$tdiff, 2, '.', '');
				$output['ytd3'] = number_format($current3*$month*$tdiff, 2, '.', '');
				$output['ytd4'] = number_format($current4*$month*$tdiff, 2, '.', '');
				$output['ytd5'] = number_format($current5*$month*$tdiff, 2, '.', '');
				$output['ytd6'] = number_format($current6*$month*$tdiff, 2, '.', '');
				$output['ytd7'] = number_format($current7*$month*$tdiff, 2, '.', '');
				$output['ytd8'] = number_format($current8*$month*$tdiff, 2, '.', '');
				for($k=1;$k<=$custome_earnings_count;$k++){
					$output['custome_earnings_ytd'.$k.'']=number_format($postarr['custome_earnings_current'.$k.'']*$month*$tdiff, 2, '.', '');
				}
			}

			$totalCustomeDeduction=0;

			for($k=1;$k<=$custome_deduction_count;$k++){
				if (isset($pre_stub['custome_deduction_ytd_total'.$k.''])) {
					if ($previ_payDate_year != $current_payDate_year) {
						$output['custome_deduction_ytd_total'.$k.''] = $postarr['custome_deduction_total'.$k.''];
					}else{
						if($postarr['custome_deduction_total'.$k.''] !=0){
							$output['custome_deduction_ytd_total'.$k.''] = $postarr['custome_deduction_total'.$k.''] + REGEXPATTERN.converttofloat($pre_stub['custome_deduction_ytd_total'.$k.'']);
						}else{
							$output['custome_deduction_ytd_total'.$k.'']=$postarr['custome_deduction_total'.$k.''];
						}
					}
				} else {
					$output['custome_deduction_ytd_total'.$k.'']=number_format(REGEXPATTERN.converttofloat($postarr['custome_deduction_total'.$k.'']*$tdiff), 2, '.', '');
				}
				$totalCustomeDeduction=number_format(REGEXPATTERN.converttofloat((float)str_replace(",", "", $totalCustomeDeduction)+(float)str_replace(",", "", $postarr['custome_deduction_total'.$k.''])), 2, '.', '');
				$totalYtdCustomeDeduction=number_format(REGEXPATTERN.converttofloat((float)str_replace(",", "", $totalYtdCustomeDeduction)+(float)str_replace(",", "", $output['custome_deduction_ytd_total'.$k.''])), 2, '.', '');
			}

			$output['deductions'] = number_format(REGEXPATTERN.converttofloat($totalCustomeDeduction), 2, '.', '');
			$output['net_pay'] = REGEXPATTERN.converttofloat($cTotal - bcdiv(REGEXPATTERN.converttofloat($output['deductions']), 1, 2));
			$output['ytd_deductions'] = number_format(REGEXPATTERN.converttofloat((float)str_replace(",", "", $totalYtdCustomeDeduction)), 2, '.', '');
			$output['ytd_net_pay'] = REGEXPATTERN.converttofloat($output['tytd'] - bcdiv($output['ytd_deductions'], 1, 2));

			return $output;
		}

		if(!empty($pre_stub))
		{
			if($makeItNew==1)
			{
				$output['tytd'] = $cTotal;
				$output['ytd1'] = $current1;
				$output['ytd2'] = $current2;
				$output['ytd3'] = $current3;
				$output['ytd4'] = $current4;
				$output['ytd5'] = $current5;
				$output['ytd6'] = $current6;
				$output['ytd7'] = $current7;
				for($k=1;$k<=$custome_earnings_count;$k++){
					$output['custome_earnings_ytd'.$k.'']=$postarr['custome_earnings_current'.$k.''];
				}
			}
			else
			{
				$output['tytd'] = $cTotal+REGEXPATTERN.converttofloat($pre_stub['tytd']);
				$output['ytd1'] = $current1+REGEXPATTERN.converttofloat($pre_stub['ytd1']);
				$output['ytd2'] = $current2+REGEXPATTERN.converttofloat($pre_stub['ytd2']);
				$output['ytd3'] = $current3+REGEXPATTERN.converttofloat($pre_stub['ytd3']);
				$output['ytd4'] = $current4+REGEXPATTERN.converttofloat($pre_stub['ytd4']);
				$output['ytd5'] = $current5+REGEXPATTERN.converttofloat($pre_stub['ytd5']);
				$output['ytd6'] = $current6+REGEXPATTERN.converttofloat($pre_stub['ytd6']);
				$output['ytd7'] = $current7+REGEXPATTERN.converttofloat($pre_stub['ytd7']);
				for($k=1;$k<=$custome_earnings_count;$k++){
					$output['custome_earnings_ytd'.$k.'']=number_format(REGEXPATTERN.converttofloat($postarr['custome_earnings_current'.$k.''])+REGEXPATTERN.converttofloat($pre_stub['custome_earnings_ytd'.$k.'']), 2, '.', '');
				}
			}
		}
		else
		{
			$output['tytd'] = number_format($cTotal*$month*$tdiff, 2, '.', '');
			$output['ytd1'] = number_format($current1*$month*$tdiff, 2, '.', '');
			$output['ytd2'] = number_format($current2*$month*$tdiff, 2, '.', '');
			$output['ytd3'] = number_format($current3*$month*$tdiff, 2, '.', '');
			$output['ytd4'] = number_format($current4*$month*$tdiff, 2, '.', '');
			$output['ytd5'] = number_format($current5*$month*$tdiff, 2, '.', '');
			$output['ytd6'] = number_format($current6*$month*$tdiff, 2, '.', '');
			$output['ytd7'] = number_format($current7*$month*$tdiff, 2, '.', '');
			for($k=1;$k<=$custome_earnings_count;$k++){
				$output['custome_earnings_ytd'.$k.'']=number_format(REGEXPATTERN.converttofloat($postarr['custome_earnings_current'.$k.''])*$month*$tdiff, 2, '.', '');
			}
		}

        
        ////////////////////Federal Tax//////////////////////////////////
        /////////////////////////////////////////////////////////////////
        var federal_tax = paystubConfig[year].federal_tax;
        var federalTax = 0;
        if (typeof federal_tax !=='undefined' && federal_tax !=='') {
            federalTax = FEDERALTAXHELPER.getFederalTax(year, maritalStatus, paymentTotal, paymentMode, exemp);
        } else {
            federalTax = FEDERALTAXHELPER.getFederalTaxByAnnual(year, maritalStatus, paymentTotal, paymentMode, exemp);
        }
        var federal_tax_ytd_total = FEDERALTAXHELPER.getFederalTaxYTD(federalTax, pre_stub_federal_tax_ytd_total, previ_payDate_year, current_payDate_year,  month, term) 


        ////////////////////Federal Tax//////////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////stateTax/////////////////////////////////////

        var state_tax_total = STATETAXHELPER.getStateTax(year, maritalStatus, paymentTotal, paymentMode, state);
        var state_tax_ytd_total = STATETAXHELPER.getStateTaxYTD(state_tax_total, pre_stub_state_tax_ytd_total, previ_payDate_year, current_payDate_year,  month, tdiff);
       
        ////////////////////stateTax/////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        
		/////////////////////////////////////////////////////////////////
		////////////////////MEDICARE/////////////////////////////////////
        var fica_medicare_total = MEDITAXHELPER.getMedicareTax(year, paymentTotal, paymentMode);
		
         var fica_medicare_ytd_total = MEDITAXHELPER.getMedicareTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);
		//fica_medicare_total = REGEXPATTERN.number_format(round(fica_medicare_total * 100) / 100);
		// if (pre_stub_fica_medicare_ytd_total) {
		// 	if (previ_payDate_year != current_payDate_year) {
		// 		fica_medicare_ytd_total = fica_medicare_total;
		// 	}else{
		// 		if(mTaxRate !=0){
		// 			var fica_medicare_ytd_total =Math.round((fica_medicare_total + pre_stub_fica_medicare_ytd_total)*100)/100;
		// 		}else{
		// 			var fica_medicare_ytd_total = fica_medicare_total;
		// 		}
		// 	}
		// } else {
		// 	fica_medicare_ytd_total = Math.round(fica_medicare_total* month * tdiff*100)/100;
		// }

		////////////////////MEDICARE/////////////////////////////////////
		/////////////////////////////////////////////////////////////////

		
		/////////////////////////////////////////////////////////////////
		////////////////////SCOAIL SECURITY//////////////////////////////

		var social_total =  SOCIALTAXHELPER.getMedicareTax(year, paymentTotal, paymentMode);
		
		var social_ytd_total = SOCIALTAXHELPER.getMedicareTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);

		

		////////////////////SCOAIL SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////SDI SECURITY//////////////////////////////

		var sdi_total =  SDITAXHELPER .getSdiTax(year, paymentTotal, paymentMode);
		
		var sdi_ytd_total = SDITAXHELPER.getSdiTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);

		
		////////////////////SDI SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////SUI SECURITY//////////////////////////////
		var sui_total= SUITAXHELPER.getSuiTax(year, paymentTotal,previ_payDate_year , current_payDate_year) ; 
		var sui_ytd_total = SUITAXHELPER.getSuiTaxYTD(year, paymentTotal,previ_payDate_year , current_payDate_year, sui_total, pre_stub_sui_ytd_total) ;
		
		////////////////////SUI SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////flv SECURITY////////////////////////////// 
		var flv_total = FLVTAXHELPER.getFlvTax(year,state, paymentTotal, pre_stub_flv_ytd_total, tytd) ;
		var flv_ytd_total = FLVTAXHELPER.getFlvTaxYTD (year,state, paymentTotal, tytd ,previ_payDate_year,  current_payDate_year, flv_total, pre_stub_flv_ytd_total, ) ;
		

		////////////////////SUI SECURITY/////////////////////////////////
		/////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////
		////////////////////WC SECURITY/////////////////////////////////

		var wc_total= WCTAXHELPER. ;
		var wc_ytd_total = WCTAXHELPER. ;
		

		////////////////////WC SECURITY//////////////////////////////////
		/////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////
		////////////////////WF SECURITY//////////////////////////////

		var wf_total = WFTAXHELPER. ; 
		var wf_ytd_total = WFTAXHELPER. ; 
		
		////////////////////WF SECURITY//////////////////////////////
		/////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////
		////////////////////Cutome deduction ////////////////////

		var totalCustomeDeduction=0;
		var totalYtdCustomeDeduction=0;

		for(k=1;k<=custome_deduction_count;k++){
			// if (typeof pre_stub['custome_deduction_ytd_total'.k.'']  !== 'undefined') {
			// 	if (previ_payDate_year != current_payDate_year) {
			// 		output['custome_deduction_ytd_total'.k.''] = postarr['custome_deduction_total'.k.''];
			// 	}else{
			// 		if(postarr['custome_deduction_total'.k.''] !=0){
			// 			output['custome_deduction_ytd_total'.k.''] = postarr['custome_deduction_total'.k.''] + REGEXPATTERN.converttofloat(pre_stub['custome_deduction_ytd_total'.k.'']);
			// 		}else{
			// 			output['custome_deduction_ytd_total'.k.'']=postarr['custome_deduction_total'.k.''];
			// 		}
			// 	}
			// } else {
			// 	output['custome_deduction_ytd_total'.k.'']=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(postarr['custome_deduction_total'.k.'']*tdiff));
			// }
			// totalCustomeDeduction=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat((float)str_replace(",", "", totalCustomeDeduction)+(float)str_replace(",", "", postarr['custome_deduction_total'.k.''])));
			// totalYtdCustomeDeduction=REGEXPATTERN.number_format(REGEXPATTERN.converttofloat((float)str_replace(",", "", totalYtdCustomeDeduction)+(float)str_replace(",", "", output['custome_deduction_ytd_total'.k.''])));
		}



		////////////////////Cutome deduction ////////////////////
		/////////////////////////////////////////////////////////

    }
};