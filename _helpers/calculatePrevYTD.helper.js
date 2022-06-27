
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

    calculatePreviousYtd: async (var1, req, pre_stub, total_hours = 0, i_index) => {
        var payload = req.body;

        $output = array();
        $custome_earnings_count = payload.custome_earnings_count;
        $totalCustomeEarnings = 0;
        vartotalYtdCustomeEarnings = 0;

        $output['ytd1'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd1']), 2, '.', '');
        $output['ytd2'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd2']), 2, '.', '');
        $output['ytd3'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd3']), 2, '.', '');
        $output['ytd4'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd4']), 2, '.', '');
        $output['ytd5'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd5']), 2, '.', '');
        $output['ytd6'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd6']), 2, '.', '');
        $output['ytd7'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_ytd7']), 2, '.', '');
        $output['tytd'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_tytd']), 2, '.', '');

        for ($k = 1; $k <= $custome_earnings_count; $k++) {
            $output['custome_earnings_ytd'[k]] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(var1['pre_custome_earnings_ytd'[k]]), 2, '.', '');
            $totalYtdCustomeEarnings = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat((float)(totalYtdCustomeEarnings.replace(",", "",)) + (float)(output['custome_earnings_ytd'[k]].replace(",", "", $))), 2, '.', '');
        }

        $output['tytd'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat((float)(var1['pre_ytd1'].replace(",", "",)) + (float)(var1['pre_ytd2'].replace(",", "",)) + (float)(var1['pre_ytd3'].replace(",", "",)) + (float)(var1['pre_ytd4'].replace(",", "",)) + (float)(var1['pre_ytd5'].replace(",", "",)) + (float)(var1['pre_ytd6'].replace(",", "",)) + (float)(var1['pre_ytd7'].replace(",", "",)) + (float)(totalYtdCustomeEarnings.replace(",", ""))), 2, '.', '');



        var cTotal = REGEXPATTERN.converttofloat(payload.cTotal);
        var state = payload.state;
        var paymentMode = payload.payMode;
        var exemp = intval(payload.exemp);
        var maritalStatus = strtolower(payload.mStatus);
        var pay_date = payload.pay_date;

        var away_date = payload.away_date;
        var empYTD = payload.empYTD;
        var custome_deduction_count = payload.custome_deduction_count;
        var empType = payload.empType;
        var paymentType = payload.paymentType;
        var pay_period_start = payload.pay_period_start;
        var pay_period_end = payload.pay_period_end;
        var output = array();
        var duration = '';

        var month = new Date(pay_date).getMonth() + 1; //  date("m", strtotime(pay_date)); 
        var year = new Date(pay_date).getYear(); //date("Y", strtotime(pay_date)); 
        var day = new Date(pay_date).getDate(); //date("d", strtotime(pay_date)); 
        var term = 0;


        var current_payDate_year = year;

        var diffDate = date_diff(date_create(pay_period_end), date_create(pay_period_start));


        // var diffDay=diffDate->format('%a');

        var previ_payDate_year = new Date("Y", Date.parse("-", (diffDay + 1), " days", Date.parse(pay_date)));

        $output['pay_period_end'] = str_replace("/", "/", $pay_period_end);
        $output['pay_date'] = pay_date;

        var ddate = date("Y-m-d", strtotime(pay_date));
        var date = new DateTime(ddate);

        // Calculate working days of ther year
        var endDate = strtotime(ddate);
        var startDate = Date.parse(year, "-01-01");
        var days = (endDate - startDate) / 86400 + 1;
        var no_full_weeks = floor(days / 7);
        var no_remaining_days = fmod(days, 7);
        var the_first_day_of_week = date("N", startDate);
        var the_last_day_of_week = date("N", endDate);

        if (the_first_day_of_week <= the_last_day_of_week) {
            if (the_first_day_of_week <= 6 && 6 <= the_last_day_of_week) no_remaining_days--;
            if (the_first_day_of_week <= 7 && 7 <= the_last_day_of_week) no_remaining_days--;
        }
        else {
            if (the_first_day_of_week == 7) {
                no_remaining_days--;

                if (the_last_day_of_week == 6) {
                    no_remaining_days--;
                }
            }
            else {
                no_remaining_days -= 2;
            }
        }
        workingDays = no_full_weeks * 5;
        if (no_remaining_days > 0) {
            workingDays += no_remaining_days;
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
                // days = date -> format("z") + 1;
                term = ceil(days / 7);
                term = term == 53 ? 52 : term;
                break;
            case 26:
                duration = 'biweekly';
                month = 1;
                // days = date -> format("z") + 1;
                term = ceil(days / 14);
                term = term == 27 ? 26 : term;
                break;
            case 12:
                duration = 'monthly';
                month = 1;
                // term = date -> format("m");
                term = term == 13 ? 12 : term;
                break;
            case 24:
                duration = 'semimonthly';
                month = 1;
                // days = date -> format("z") + 1;
                term = ceil(days / 15);
                term = term == 25 ? 24 : term;
                break;
            case 4:
                duration = 'quarterly';
                month = 1;
                // months = date -> format("m");
                term = ceil(months / 3);
                break;
            case 2:
                duration = 'semiannual';
                month = 1;
                // months = date -> format("m");
                term = ceil(months / 6);
                break;
            case 1:
                duration = 'annual';
                month = 1;
                term = 1;
                break;
        }
        $output['pay_period_start'] = $pay_period_start;

        $makeItNew = 0;

        if ($previ_payDate_year != $current_payDate_year) {
            $makeItNew = 1;
            $term = 1;

        }

        var tdiff = 1;
        var indexn = i_index + 1;
        if (empYTD != '') {
            if (indexn == empYTD) {
                tdiff = 0;
            } else if (empYTD > term) {
                tdiff = term - 1;
            } else {
                tdiff = empYTD - indexn;
            }
        } else {
            tdiff = term - 1;
        }

        /////////////////////////////////////////////////////////////////
        ////////////////////Federal Tax//////////////////////////////////

        var federal_tax = paystubConfig[year].federal_tax;
        var federalTax = 0;
        if (typeof federal_tax !== 'undefined' && federal_tax !== '') {
            federalTax = FEDERALTAXHELPER.getFederalTax(year, maritalStatus, paymentTotal, paymentMode, exemp);
        } else {
            federalTax = FEDERALTAXHELPER.getFederalTaxByAnnual(year, maritalStatus, paymentTotal, paymentMode, exemp);
        }
        var federal_tax_ytd_total = FEDERALTAXHELPER.getFederalTaxYTD(federalTax, pre_stub_federal_tax_ytd_total, previ_payDate_year, current_payDate_year, month, term)

        // if ($this->hasFederalTax($year)) {
        //     $output['federal_tax_total'] = $this->getFederalTax($year, $mStatus, $cTotal, $payMode);
        // }else{
        //     $federalTax=0;
        //     $federalDuration = 'annual';
        //     if ($exemp > 0){
        //         $taxableAmount = ($cTotal * $payMode) - ($exp[$year][$federalDuration][$year]['rate'] * $exemp);
        //     }else{
        //         $taxableAmount= $cTotal * $payMode;
        //     }

        //     for($i=0;$i<=6;$i++)
        //     {
        //         $federalTaxExceed=${$federalDuration}[$year][$i][$year][$mStatus]['exceed'];
        //         $federalTaxRate=${$federalDuration}[$year][$i][$year][$mStatus]['percent'];
        //         $federalTaxSub=${$federalDuration}[$year][$i][$year][$mStatus]['sub'];
        //         $federalTaxMin=${$federalDuration}[$year][$i][$year][$mStatus]['min'];
        //         $federalTaxMax=${$federalDuration}[$year][$i][$year][$mStatus]['max'];
        //         if(isset(${$federalDuration}[$year][$i]))
        //         {
        //             if($i==0)
        //             {
        //                 if($taxableAmount<$federalTaxMin)
        //                 {
        //                     $output['federal_tax_total'] = 0;
        //                     break;
        //                 }
        //                 else if($taxableAmount>=$federalTaxMin && $taxableAmount<=$federalTaxMax)
        //                 {
        //                     $federalTax = $federalTaxRate/100;
        //                     break;
        //                 }
        //             }
        //             else
        //             {
        //                 if($taxableAmount>=$federalTaxMin && $taxableAmount<=$federalTaxMax)
        //                 {
        //                     $federalTax = $federalTaxRate/100;
        //                     break;
        //                 }
        //                 else if($taxableAmount>=$federalTaxMin && $federalTaxMax=='')
        //                 {
        //                     $federalTax = $federalTaxRate/100;
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        //     $totalTaxAmount= $federalTaxSub + ($taxableAmount - $federalTaxExceed) * $federalTax ;
        //     $output['federal_tax_total'] =$totalTaxAmount / $payMode;
        // }
        // $output['federal_tax_ytd_total'] = 0;
        // if ($output['federal_tax_total'] == 0 && $exemp != 0) {
        //     $output['federal_tax_total'] =  REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(0), 2, '.', ''); //REGEXPATTERN.converttofloat(0);
        //     if (isset($pre_stub['federal_tax_ytd_total'])) {
        //         $output['federal_tax_ytd_total'] =  REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['federal_tax_ytd_total']), 2, '.', '');
        //     }else{
        //         $output['federal_tax_ytd_total']=$output['federal_tax_total'];
        //     }
        // } else if ($output['federal_tax_total'] != 0) {
        //     if (isset($pre_stub['federal_tax_ytd_total'])) {
        //         if ($previ_payDate_year != $current_payDate_year) {
        //             $output['federal_tax_ytd_total'] = $output['federal_tax_total'];
        //         } else {
        //             $output['federal_tax_ytd_total'] =  REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($output['federal_tax_total'] + $pre_stub['federal_tax_ytd_total']), 2, '.', '');
        //         }
        //     } else {
        //         $output['federal_tax_ytd_total'] =  REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(bcdiv($output['federal_tax_total'] * $month * $tdiff, 1, 2)), 2, '.', '');
        //     }
        // }

        ////////////////////Federal Tax//////////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////stateTax/////////////////////////////////////
        $stateTax = 0;
        $annualDuration = 'annual';
        $taxableIncome = $cTotal * $payMode;
        $stateTaxRules = $tax[$year][$state][$year][$mStatus];
        $stateTaxBrackets = $stateTaxRules['brackets'];
        $stateTaxRates = $stateTaxRules['rates'];
        $stateTaxdeDuctions = $stateTaxRules['deductions'];
        var state_tax_total = STATETAXHELPER.getStateTax(year, maritalStatus, paymentTotal, paymentMode, state);
        var state_tax_ytd_total = STATETAXHELPER.getStateTaxYTD(state_tax_total, pre_stub_state_tax_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);

        // Custom per state rules.
        // Indiana
        // if ($state == 15 && $exemp > 0 && isset($stateTaxRules['exempt'])) {
        //     $taxableIncome -= $exemp * $stateTaxRules['exempt'];
        // // Kentucky
        // } elseif ($state == 18 && $exemp > 0 && isset($stateTaxRules['exempt'])) {
        //     $taxableIncome -= $exemp * $stateTaxRules['exempt'];
        // // Massachusetts
        // } elseif ($state == 22 && $exemp > 0 && isset($stateTaxRules['exempt'])) {
        //     $taxableIncome -= $exemp * $stateTaxRules['exempt'];
        // // Michigan
        // } elseif ($state == 23 && $exemp > 0 && isset($stateTaxRules['exempt'])) {
        //     $taxableIncome -= $exemp * $stateTaxRules['exempt'];
        // // Missuori
        // } elseif ($state == 26 && isset($stateTaxRules['exempt']) && $taxableIncome <= $stateTaxRules['exempt']) {
        //     $taxableIncome = 0;
        // // Ohio
        // } elseif ($state == 36 && isset($stateTaxRules['exempt']) && $taxableIncome <= $stateTaxRules['exempt']) {
        //     $taxableIncome = 0;
        // }
        // if ($taxableIncome < 0) {
        //     $taxableIncome = 0;
        // }

        if ($taxableIncome > 0 && isset($stateTaxdeDuctions) && !empty($stateTaxdeDuctions)) {
            $taxableIncome = $taxableIncome - $stateTaxdeDuctions;
        }

        if ($taxableIncome < 0) {
            $taxableIncome = 0;
        }

        $processedIncome = 0;
        for ($i = 0; $i < count($stateTaxBrackets); $i++) {
            if ($taxableIncome >= $stateTaxBrackets[$i]) {
                $chunk = 0;
                if (isset($stateTaxBrackets[$i + 1]) && $stateTaxBrackets[$i + 1] !== 0) {
                    if ($stateTaxBrackets[$i + 1] < $taxableIncome) {
                        $chunk = $stateTaxBrackets[$i + 1] - $processedIncome;
                    } else {
                        $chunk = $taxableIncome - $processedIncome;
                    }
                } else {
                    $chunk = $taxableIncome - $processedIncome;
                }
                $processedIncome += $chunk;
                $stateTax += $chunk * $stateTaxRates[$i] / 100;
            }
        }
        $stateTax = $stateTax / $payMode;
        $output['state_tax_total'] = REGEXPATTERN.number_format(round($stateTax * 100) / 100, 2, '.', '');
        if (isset($pre_stub['state_tax_ytd_total'])) {
            if ($previ_payDate_year != $current_payDate_year) {
                $output['state_tax_ytd_total'] = $output['state_tax_total'];
            } else {
                $output['state_tax_ytd_total'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($output['state_tax_total'] + $pre_stub['state_tax_ytd_total']), 2, '.', '');
            }
        } else {
            $output['state_tax_ytd_total'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(bcdiv($stateTax * $month * $tdiff, 1, 2)), 2, '.', '');
        }
        ////////////////////stateTax/////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////MEDICARE/////////////////////////////////////
        $mTaxRate = 0;
        $medicare = 0;
        $taxableIncome = $cTotal * $payMode;

        var fica_medicare_total = MEDITAXHELPER.getMedicareTax(year, paymentTotal, paymentMode);

        var fica_medicare_ytd_total = MEDITAXHELPER.getMedicareTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);

        if ($taxableIncome < $medi[$year]['max']) {
            $medicare = $taxableIncome * $medi[$year]['p1'];
            $mTaxRate = $medi[$year]['p1'];
        } else if ($taxableIncome >= $medi[$year]['max']) {
            $medicare = $medi[$year]['max'] * $medi[$year]['p1'];
            $r = $taxableIncome - $medi[$year]['max'];
            $medicare += $r * $medi[$year]['p2'];
            $mTaxRate = $medi[$year]['p2'];
        }

        $medicare = $medicare / $payMode;

        $output['fica_medicare_total'] = REGEXPATTERN.number_format(round($medicare * 100) / 100, 2, '.', '');
        if (isset($pre_stub['fica_medicare_ytd_total'])) {
            if ($previ_payDate_year != $current_payDate_year) {
                $output['fica_medicare_ytd_total'] = REGEXPATTERN.number_format($output['fica_medicare_total'], 2, '.', '');
            } else {
                if ($mTaxRate != 0) {
                    $output['fica_medicare_ytd_total'] = REGEXPATTERN.number_format(($output['fica_medicare_total'] + REGEXPATTERN.converttofloat($pre_stub['fica_medicare_ytd_total'])), 2, '.', '');
                } else {
                    $output['fica_medicare_ytd_total'] = REGEXPATTERN.number_format($output['fica_medicare_total'], 2, '.', '');
                }
            }
        } else {
            $output['fica_medicare_ytd_total'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(bcdiv($medicare * $month * $tdiff, 1, 2)), 2, '.', '');
        }

        ////////////////////MEDICARE/////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////SCOAIL SECURITY//////////////////////////////
        $social = $output['tytd'] * $soci[$year]['p1']; //18600
        $sRestAmount = 0;
        $sTotal = $cTotal * $soci[$year]['p1'];

        var social_total = SOCIALTAXHELPER.getMedicareTax(year, paymentTotal, paymentMode);

        var social_ytd_total = SOCIALTAXHELPER.getMedicareTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);

        if ($social > $soci[$year]['max']) {
            $sRestAmount = $social - $soci[$year]['max']; //11253
            $social = $soci[$year]['max'];
            $sTotal = 0;
            if (isset($pre_stub['fica_social_security_ytd_total'])) {
                $sTotal = $social - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['fica_social_security_ytd_total']), 2, '.', '');
            } else {
                $sTotal = $cTotal * $soci[$year]['p1'];
            }
            if ($sTotal > 0) {
                $output['fica_social_security_total'] = REGEXPATTERN.number_format($sTotal, 2, '.', '');
            } else if ($sTotal == 0) {
                $sTotal += $cTotal * $soci[$year]['p1'];
            } else {
                $output['fica_social_security_total'] = 0;
            }
            $output['fica_social_security_ytd_total'] = REGEXPATTERN.number_format($social, 2, '.', '');
        } else {
            $output['fica_social_security_total'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($sTotal), 2, '.', '');
            if (isset($pre_stub['fica_social_security_ytd_total'])) {
                if ($previ_payDate_year != $current_payDate_year) {
                    $output['fica_social_security_ytd_total'] = REGEXPATTERN.number_format($output['fica_social_security_total'], 2, '.', '');
                } else {
                    if ($pre_stub['fica_social_security_ytd_total'] > $soci[$year]['max']) {
                        $output['fica_social_security_ytd_total'] = REGEXPATTERN.number_format($soci[$year]['max'], 2, '.', '');
                    } else {
                        $output['fica_social_security_ytd_total'] = REGEXPATTERN.number_format($output['fica_social_security_total'] + REGEXPATTERN.converttofloat($pre_stub['fica_social_security_ytd_total']), 2, '.', '');
                    }
                }
            } else {
                $output['fica_social_security_ytd_total'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($social), 2, '.', '');
            }
        }
        ////////////////////SCOAIL SECURITY//////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////SDI SECURITY//////////////////////////////
        $output['sdi_total'] = 0;
        $output['sdi_ytd_total'] = 0;
        var sdi_total = SDITAXHELPER.getSdiTax(year, paymentTotal, paymentMode);

        var sdi_ytd_total = SDITAXHELPER.getSdiTaxYTD(year, paymentTotal, paymentMode, fica_medicare_total, pre_stub_fica_medicare_ytd_total, previ_payDate_year, current_payDate_year, month, tdiff);

        if (isset($sdi[$year][$state]) && !empty($sdi[$year][$state])) {
            $formula = $sdi[$year][$state][$year]['flag'][0];
            switch ($formula) {
                case 1:
                    $maxtax = $sdi[$year][$state][$year]['maxtax'][0];
                    $percent = $sdi[$year][$state][$year]['percent'][0];
                    $max = $sdi[$year][$state][$year]['max'][0];
                    $sdi_tax = 0;
                    if ($output['tytd'] < $max) {
                        $sdi_tax = $output['tytd'] * ($percent / 100);
                        $output['sdi_total'] = REGEXPATTERN.number_format($cTotal * ($percent / 100), 2, '.', ''); //$sdi_tax/($month*$term);
                    } else if ($output['tytd'] >= $max) {
                        $sdi_tax = $maxtax;
                        if (isset($pre_stub['sdi_ytd_total'])) {
                            $diff = $sdi_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['sdi_ytd_total']), 2, '.', '');
                        } else {
                            $diff = 0;
                        }
                        if ($diff > 0) {
                            $output['sdi_total'] = $diff;
                        } else {
                            $output['sdi_total'] = 0;
                        }
                    }

                    if (isset($pre_stub['sdi_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['sdi_ytd_total'] = $output['sdi_total'];
                        } else {
                            if ($pre_stub['sdi_ytd_total'] >= $maxtax) {
                                $output['sdi_ytd_total'] = $maxtax;
                            } else {
                                $output['sdi_ytd_total'] = $output['sdi_total'] + REGEXPATTERN.converttofloat($pre_stub['sdi_ytd_total']);
                            }
                        }
                    } else {
                        $output['sdi_ytd_total'] = REGEXPATTERN.number_format($sdi_tax, 2, '.', '');
                    }
                    break;
                case 2:
                    $percent = $sdi[$year][$state][$year]['percent'][0];
                    $maxtax = $sdi[$year][$state][$year]['maxtax'][0];
                    $sdi_tax = 0;
                    $sdi_tax = REGEXPATTERN.number_format($cTotal * ($percent / 100), 2, '.', '');
                    if ($duration == 'weekly') {
                        if ($sdi_tax >= $maxtax) {
                            $sdi_tax = REGEXPATTERN.number_format($maxtax, 2, '.', '');
                            $output['sdi_total'] = $sdi_tax;
                        } else {
                            $output['sdi_total'] = $sdi_tax;
                        }
                    } else if ($duration == 'biweekly' || $duration == 'semimonthly') {
                        $maxtax = $maxtax * 2;
                        if ($sdi_tax >= $maxtax) {
                            $sdi_tax = REGEXPATTERN.number_format($maxtax, 2, '.', '');
                            $output['sdi_total'] = $sdi_tax;
                        } else {
                            $output['sdi_total'] = $sdi_tax;
                        }
                    } else if ($duration == 'monthly') {
                        $maxtax = $maxtax * 4;
                        if ($sdi_tax >= $maxtax) {
                            $sdi_tax = REGEXPATTERN.number_format($maxtax, 2, '.', '');
                            $output['sdi_total'] = $sdi_tax;
                        } else {
                            $output['sdi_total'] = $sdi_tax;
                        }
                    } else if ($duration == 'annual') {
                        $maxtax = $maxtax * 52;
                        if ($sdi_tax >= $maxtax) {
                            $sdi_tax = REGEXPATTERN.number_format($maxtax, 2, '.', '');
                            $output['sdi_total'] = $sdi_tax;
                        } else {
                            $output['sdi_total'] = $sdi_tax;
                        }
                    } else if ($duration == 'quarterly') {
                        $maxtax = $maxtax * 12;
                        if ($sdi_tax >= $maxtax) {
                            $sdi_tax = REGEXPATTERN.number_format($maxtax, 2, '.', '');
                            $output['sdi_total'] = $sdi_tax;
                        } else {
                            $output['sdi_total'] = $sdi_tax;
                        }
                    } else if ($duration == 'semiannual') {
                        $maxtax = $maxtax * 24;
                        if ($sdi_tax >= $maxtax) {
                            $sdi_tax = REGEXPATTERN.number_format($maxtax, 2, '.', '');
                            $output['sdi_total'] = $sdi_tax;
                        } else {
                            $output['sdi_total'] = $sdi_tax;
                        }
                    } else if ($duration == 'daily') {
                        $maxtax = $maxtax / 7;
                        if ($sdi_tax >= $maxtax) {
                            $sdi_tax = REGEXPATTERN.number_format($maxtax, 2, '.', '');
                            $output['sdi_total'] = $sdi_tax;
                        } else {
                            $output['sdi_total'] = $sdi_tax;
                        }
                    }
                    if (isset($pre_stub['sdi_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['sdi_ytd_total'] = $output['sdi_total'];
                        } else {
                            $output['sdi_ytd_total'] = $output['sdi_total'] + REGEXPATTERN.converttofloat($pre_stub['sdi_ytd_total']);
                        }
                        //echo $output['sdi_ytd_total']." = ".$output['sdi_total']."+".$pre_stub['sdi_ytd_total']; echo ":<br>";
                    } else {
                        $output['sdi_ytd_total'] = REGEXPATTERN.number_format($sdi_tax * $month * $tdiff, 2, '.', '');
                    }
                    break;
            }
        }
        $output['sdi_total'] = REGEXPATTERN.converttofloat($output['sdi_total']); // echo "<br />";
        $output['sdi_ytd_total'] = REGEXPATTERN.converttofloat($output['sdi_ytd_total']);
        ////////////////////SDI SECURITY//////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////SUI SECURITY//////////////////////////////
        $output['sui_total'] = 0;
        $output['sui_ytd_total'] = 0;
        var sui_total = SUITAXHELPER.getSuiTax(year, paymentTotal, previ_payDate_year, current_payDate_year);
        var sui_ytd_total = SUITAXHELPER.getSuiTaxYTD(year, paymentTotal, previ_payDate_year, current_payDate_year, sui_total, pre_stub_sui_ytd_total);

        if (isset($sui[$year][$state]) && !empty($sui[$year][$state])) {
            $formula = $sui[$year][$state][$year]['flag'][0];
            switch ($formula) {
                case 1:
                    $maxtax = $sui[$year][$state][$year]['maxtax'][0];
                    $percent = $sui[$year][$state][$year]['percent'][0];
                    $max = $sui[$year][$state][$year]['max'][0];
                    $sui_tax = 0;
                    if ($output['tytd'] < $max) {
                        $sui_tax = REGEXPATTERN.number_format($output['tytd'] * ($percent / 100), 2, '.', '');
                        $output['sui_total'] = REGEXPATTERN.number_format($cTotal * ($percent / 100), 2, '.', ''); //$sui_tax/($month*$term);
                    } else if ($output['tytd'] >= $max) {
                        $sui_tax = $maxtax;
                        if (isset($pre_stub['sui_ytd_total'])) {
                            $diff = $sui_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['sui_ytd_total']), 2, '.', '');
                        } else {
                            $diff = 0;
                        }
                        if ($diff > 0) {
                            $output['sui_total'] = $diff;
                        } else {
                            $output['sui_total'] = 0;
                        }
                    }
                    if (isset($pre_stub['sui_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['sui_ytd_total'] = $output['sui_total'];
                        } else {
                            if ($pre_stub['sui_ytd_total'] >= $maxtax) {
                                $output['sui_ytd_total'] = $maxtax;
                            } else {
                                $output['sui_ytd_total'] = $output['sui_total'] + REGEXPATTERN.converttofloat($pre_stub['sui_ytd_total']);
                            }
                        }
                    } else {
                        $output['sui_ytd_total'] = REGEXPATTERN.number_format($sui_tax, 2, '.', '');
                    }

                    break;
                case 5:
                    $percent = $sui[$year][$state][$year]['percent'][0];
                    $sui_tax = REGEXPATTERN.number_format($output['tytd'] * ($percent / 100), 2, '.', '');
                    $output['sui_total'] = REGEXPATTERN.number_format($cTotal * ($percent / 100), 2, '.', ''); //$sui_tax/($month*$term);
                    if (isset($pre_stub['sui_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['sui_ytd_total'] = $output['sui_total'];
                        } else {
                            $output['sui_ytd_total'] = $output['sui_total'] + REGEXPATTERN.converttofloat($pre_stub['sui_ytd_total']);
                        }
                    } else {
                        $output['sui_ytd_total'] = REGEXPATTERN.number_format($sui_tax, 2, '.', '');
                    }
                    break;
            }
        }
        $output['sui_total'] = REGEXPATTERN.converttofloat($output['sui_total']); //echo "<br />";
        $output['sui_ytd_total'] = REGEXPATTERN.converttofloat($output['sui_ytd_total']); //echo "<br />";
        ////////////////////SUI SECURITY//////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////flv SECURITY//////////////////////////////
        $output['flv_total'] = 0;
        $output['flv_ytd_total'] = 0;

        var flv_total = FLVTAXHELPER.getFlvTax(year, state, paymentTotal, pre_stub_flv_ytd_total, tytd);
        var flv_ytd_total = FLVTAXHELPER.getFlvTaxYTD(year, state, paymentTotal, tytd, previ_payDate_year, current_payDate_year, flv_total, pre_stub_flv_ytd_total,);

        if (isset($flv[$year][$state]) && !empty($flv[$year][$state])) {
            $formula = $flv[$year][$state][$year]['flag'][0];
            switch ($formula) {
                case 1:
                    $maxtax = $flv[$year][$state][$year]['maxtax'][0];
                    $percent = $flv[$year][$state][$year]['percent'][0];
                    $max = $flv[$year][$state][$year]['max'][0];
                    $flv_tax = 0;
                    if ($output['tytd'] < $max) {
                        $flv_tax = $output['tytd'] * ($percent / 100);
                        $output['flv_total'] = $cTotal * ($percent / 100); //$flv_tax/($month*$term);
                    } else if ($output['tytd'] >= $max) {
                        $flv_tax = $maxtax;
                        if (isset($pre_stub['flv_ytd_total'])) {
                            $diff = $flv_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['flv_ytd_total']), 2, '.', '');
                        } else {
                            $diff = 0;
                        }
                        if ($diff > 0) {
                            $output['flv_total'] = $diff;
                        } else {
                            $output['flv_total'] = 0;
                        }

                    }
                    if (isset($pre_stub['flv_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['flv_ytd_total'] = $output['flv_total'];
                        } else {
                            if ($pre_stub['flv_ytd_total'] >= $maxtax) {
                                $output['flv_ytd_total'] = $maxtax;
                            } else {
                                $output['flv_ytd_total'] = $output['flv_total'] + REGEXPATTERN.converttofloat($pre_stub['flv_ytd_total']);
                            }
                        }
                    } else {
                        $output['flv_ytd_total'] = REGEXPATTERN.number_format($flv_tax, 2, '.', '');
                    }
                    break;
            }
        }
        $output['flv_total'] = REGEXPATTERN.converttofloat($output['flv_total']);
        $output['flv_ytd_total'] = REGEXPATTERN.converttofloat($output['flv_ytd_total']);
        ////////////////////SUI SECURITY//////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////WC SECURITY//////////////////////////////
        $output['wc_total'] = 0;
        $output['wc_ytd_total'] = 0;
        if (isset($wc[$year][$state]) && !empty($wc[$year][$state])) {
            $formula = $wc[$year][$state][$year]['flag'][0];
            switch ($formula) {
                case 1:
                    $maxtax = $wc[$year][$state][$year]['maxtax'][0];
                    $percent = $wc[$year][$state][$year]['percent'][0];
                    $max = $wc[$year][$state][$year]['max'][0];
                    $wc_tax = 0;
                    if ($output['tytd'] < $max) {
                        $wc_tax = $output['tytd'] * ($percent / 100);
                        $output['wc_total'] = $cTotal * ($percent / 100); //$wc_tax/($month*$term);
                    } else if ($output['tytd'] >= $max) {
                        $wc_tax = $maxtax;
                        if (isset($pre_stub['wc_ytd_total'])) {
                            $diff = $wc_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['wc_ytd_total']), 2, '.', '');
                        } else {
                            $diff = 0;
                        }
                        if ($diff > 0) {
                            $output['wc_total'] = $diff;
                        } else {
                            $output['wc_total'] = 0;
                        }
                    }
                    if (isset($pre_stub['wc_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['wc_ytd_total'] = $output['wc_total'];
                        } else {
                            $output['wc_ytd_total'] = $output['wc_total'] + REGEXPATTERN.converttofloat($pre_stub['wc_ytd_total']);
                        }
                    } else {
                        $output['wc_ytd_total'] = REGEXPATTERN.number_format($wc_tax, 2, '.', '');
                    }
                    break;
                case 3:
                    $wc_tax = 0;
                    if ($duration == 'weekly') {
                        $wc_tax = $wc[$year][$state][$year]['weekly'][0]; //$cTotal*($wc[$year][$state]['weekly'][0]/100);
                    } else if ($duration == 'biweekly') {
                        $wc_tax = $wc[$year][$state][$year]['biweekly'][0]; //$cTotal*($wc[$year][$state]['biweekly'][0]/100);
                    } else if ($duration == 'semimonthly') {
                        $wc_tax = $wc[$year][$state][$year]['semimonthly'][0]; //$cTotal*($wc[$year][$state]['biweekly'][0]/100);
                    } else if ($duration == 'monthly') {
                        $wc_tax = $wc[$year][$state][$year]['monthly'][0]; //$cTotal*($wc[$year][$state]['biweekly'][0]/100);
                    } else if ($duration == 'annual') {
                        $wc_tax = $wc[$year][$state][$year]['annual'][0]; //$cTotal*($wc[$year][$state]['biweekly'][0]/100);
                    } else if ($duration == 'quarterly') {
                        $wc_tax = $wc[$year][$state][$year]['quarterly'][0]; //$cTotal*($wc[$year][$state]['biweekly'][0]/100);
                    } else if ($duration == 'semiannual') {
                        $wc_tax = $wc[$year][$state][$year]['semiannual'][0]; //$cTotal*($wc[$year][$state]['biweekly'][0]/100);
                    } else if ($duration == 'daily') {
                        $wc_tax = $wc[$year][$state][$year]['daily'][0]; //$cTotal*($wc[$year][$state]['biweekly'][0]/100);
                    } else {
                        $wc_tax = 0;
                    }
                    $output['wc_total'] = $wc_tax;
                    if (isset($pre_stub['wc_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['wc_ytd_total'] = $output['wc_total'];
                        } else {
                            $output['wc_ytd_total'] = $output['wc_total'] + REGEXPATTERN.converttofloat($pre_stub['wc_ytd_total']);
                        }
                    } else {
                        $output['wc_ytd_total'] = REGEXPATTERN.number_format($wc_tax * $month * $tdiff, 2, '.', '');
                    }
                    break;
                case 4:
                    $wc_tax = 0;
                    $wc_tax = $total_hours * $wc[$year][$state][$year]['percent'][0];
                    $output['wc_total'] = $wc_tax;
                    if (isset($pre_stub['wc_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['wc_ytd_total'] = $output['wc_total'];
                        } else {
                            $output['wc_ytd_total'] = $output['wc_total'] + REGEXPATTERN.converttofloat($pre_stub['wc_ytd_total']);
                        }
                    } else {
                        $output['wc_ytd_total'] = REGEXPATTERN.number_format($wc_tax * $month * $tdiff, 2, '.', '');
                    }
                    break;
            }
        }
        $output['wc_total'] = REGEXPATTERN.converttofloat($output['wc_total']);
        $output['wc_ytd_total'] = REGEXPATTERN.converttofloat($output['wc_ytd_total']);
        ////////////////////WC SECURITY//////////////////////////////
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ////////////////////WF SECURITY//////////////////////////////
        $output['wf_total'] = 0;
        $output['wf_ytd_total'] = 0;
        if (isset($wf[$year][$state]) && !empty($wf[$year][$state])) {
            $formula = $wf[$year][$state][$year]['flag'][0];
            switch ($formula) {
                case 1:
                    $maxtax = $wf[$year][$state][$year]['maxtax'][0];
                    $percent = $wf[$year][$state][$year]['percent'][0];
                    $max = $wf[$year][$state][$year]['max'][0];
                    $wf_tax = 0;
                    if ($output['tytd'] < $max) {
                        $output['wf_total'] = REGEXPATTERN.number_format($cTotal * ($percent / 100), 2, '.', ''); //$wf_tax/($month*$tdiff);
                        $output['wf_total'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($output['wf_total']), 2, '.', '');
                        if (isset($pre_stub['wf_ytd_total'])) {
                            $wf_tax = $output['wf_total'] + REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['wf_ytd_total']), 2, '.', '');
                        } else {
                            $wf_tax = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($output['tytd'] * ($percent / 100)), 2, '.', '');
                        }
                    } else if ($output['tytd'] >= $max) {
                        $wf_tax = $maxtax;
                        if (isset($pre_stub['wf_ytd_total'])) {
                            $diff = $wf_tax - REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($pre_stub['wf_ytd_total']), 2, '.', '');
                        } else {
                            $diff = 0;
                        }
                        if ($diff > 0) {
                            $output['wf_total'] = REGEXPATTERN.number_format($diff, 2, '.', '');
                        } else {
                            $output['wf_total'] = 0;
                        }
                    }
                    if (isset($pre_stub['wf_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['wf_ytd_total'] = $output['wf_total'];
                        } else {
                            if ($pre_stub['wf_ytd_total'] >= $maxtax) {
                                $output['wf_ytd_total'] = $maxtax;
                            } else {
                                $output['wf_ytd_total'] = $output['wf_total'] + REGEXPATTERN.converttofloat($pre_stub['wf_ytd_total']);
                            }
                        }
                    } else {
                        $output['wf_ytd_total'] = $wf_tax;
                    }
                    break;
                case 3:
                    $wf_tax = 0;
                    if ($duration == 'weekly') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['weekly'][0] / 100), 2, '.', '');
                    } else if ($duration == 'biweekly') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['biweekly'][0] / 100), 2, '.', '');
                    } else if ($duration == 'semimonthly') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['semimonthly'][0] / 100), 2, '.', '');
                    } else if ($duration == 'monthly') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['monthly'][0] / 100), 2, '.', '');
                    } else if ($duration == 'annual') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['annual'][0] / 100), 2, '.', '');
                    } else if ($duration == 'quarterly') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['quarterly'][0] / 100), 2, '.', '');
                    } else if ($duration == 'semiannual') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['semiannual'][0] / 100), 2, '.', '');
                    } else if ($duration == 'daily') {
                        $wf_tax = REGEXPATTERN.number_format($cTotal * ($wf[$year][$state][$year]['daily'][0] / 100), 2, '.', '');
                    } else {
                        $wf_tax = 0;
                    }
                    $output['wf_total'] = $wf_tax;
                    if (isset($pre_stub['wf_ytd_total'])) {
                        if ($previ_payDate_year != $current_payDate_year) {
                            $output['wf_ytd_total'] = $output['wf_total'];
                        } else {
                            $output['wf_ytd_total'] = $output['wf_total'] + REGEXPATTERN.converttofloat($pre_stub['wf_ytd_total']);
                        }
                    } else {
                        $output['wf_ytd_total'] = REGEXPATTERN.number_format($wf_tax * $month * $tdiff, 2, '.', '');
                    }
                    break;
            }
        }
        $output['wf_total'] = REGEXPATTERN.converttofloat($output['wf_total']);
        $output['wf_ytd_total'] = REGEXPATTERN.converttofloat($output['wf_ytd_total']);
        ////////////////////WF SECURITY//////////////////////////////
        /////////////////////////////////////////////////////////////////



        ////////////////////Cutome deduction /////////////////

        $totalCustomeDeduction = 0;
        $totalYtdCustomeDeduction = 0;

        for ($k = 1; $k <= $custome_deduction_count; $k++) {
            if ($output['tytd'] == 0) {
                $output['custome_deduction_ytd_total'[k]] = 0;
            } else if (isset($pre_stub['custome_deduction_ytd_total'[k]])) {
                if ($previ_payDate_year != $current_payDate_year) {
                    $output['custome_deduction_ytd_total'[k]] = payload.custome_deduction_total[k];
                } else {
                    if (payload.custome_deduction_total[k] != 0) {
                        $output['custome_deduction_ytd_total'[k]] = payload.custome_deduction_total[k] + REGEXPATTERN.converttofloat($pre_stub['custome_deduction_ytd_total'[k]]);
                    } else {
                        $output['custome_deduction_ytd_total'[k]] = payload.custome_deduction_total[k];
                    }
                }
            } else {
                $output['custome_deduction_ytd_total'[k]] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat(payload.custome_deduction_total[k] * $tdiff), 2, '.', '');
            }
            $totalCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat((float)(totalCustomeDeduction.replace(",", "")) + (float)(custome_deduction_total[k].replace(",", ""))), 2, '.', '');
            $totalYtdCustomeDeduction = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat((float)(totalYtdCustomeDeduction.replace(",", "")) + (float)(output['custome_deduction_ytd_total'[k]].replace(",", ""))), 2, '.', '');
        }
        if ($output['tytd'] == 0) {
            $output['fica_medicare_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['fica_social_security_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['federal_tax_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['state_tax_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['sdi_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['sui_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['flv_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['wc_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
            $output['wf_ytd_total'] = REGEXPATTERN.number_format(0, 2, '.', '');
        }
        $output['sdi_total'] = REGEXPATTERN.number_format($output['sdi_total'], 2, '.', '');
        $output['sui_total'] = REGEXPATTERN.number_format($output['sui_total'], 2, '.', '');
        $output['flv_total'] = REGEXPATTERN.number_format($output['flv_total'], 2, '.', '');
        $output['wc_total'] = REGEXPATTERN.number_format($output['wc_total'], 2, '.', '');
        $output['wf_total'] = REGEXPATTERN.number_format($output['wf_total'], 2, '.', '');
        $output['deductions'] = REGEXPATTERN.number_format(REGEXPATTERN.converttofloat($output['state_tax_total'] + $output['fica_medicare_total'] + $output['federal_tax_total'] + $output['fica_social_security_total'] + $output['sdi_total'] + $output['sui_total'] + $output['flv_total'] + $output['wc_total'] + $output['wf_total'] + $totalCustomeDeduction), 2, '.', '');
        $output['net_pay'] = REGEXPATTERN.converttofloat($cTotal - bcdiv(REGEXPATTERN.converttofloat($output['deductions']), 1, 2));
        // $output['ytd_deductions'] =  REGEXPATTERN.number_format(REGEXPATTERN.converttofloat((float)(output['fica_medicare_ytd_total'].replace(",", "", )) + (float)str_replace(",", "", $output['fica_social_security_ytd_total']) + (float)str_replace(",", "", $output['federal_tax_ytd_total']) + (float)str_replace(",", "", $output['state_tax_ytd_total']) + (float)str_replace(",", "", $output['sdi_ytd_total']) + (float)str_replace(",", "", $output['sui_ytd_total']) + (float)str_replace(",", "", $output['flv_ytd_total']) + (float)str_replace(",", "", $output['wc_ytd_total']) + (float)str_replace(",", "", $output['wf_ytd_total']) + (float)str_replace(",", "", $totalYtdCustomeDeduction)), 2, '.', '');
        $output['ytd_net_pay'] = REGEXPATTERN.converttofloat($output['tytd'] - bcdiv($output['ytd_deductions'], 1, 2));

        return $output;
    }
};