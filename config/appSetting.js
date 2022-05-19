global.paystubConfig = {};

require('../constants/paystubConfig');

var year = "2022";
var exemp = 0;
var state = "GA";
// var annual = paystubConfig[year].annual;
// // console.log(JSON.stringify(annual));
// // JSON.stringify
 var maritalStatus = "single";
// var federalDuration = 'annual';
// var annual = paystubConfig[year][federalDuration];
// //  console.log(JSON.stringify(annual));

// // var federalTaxExceed = [federalDuration][mStatus];
// // console.log(JSON.stringify(federalTaxExceed));
// var cTotal = 2000;
// var payMode = 12;
// var exp = paystubConfig[year].exp;
//   var federalTax=0;
//   var output = 0;
//   var federalDuration = "annual";
//   if (exemp > 0){
//       taxableAmount = (cTotal * payMode) - (exp[year][federalDuration][year]['rate'] * exemp);
//   }else{
//       taxableAmount= cTotal * payMode;
//   }

//   for(var i=0;i<=6;i++)
//   {
//       var federalTaxExceed = annual[mStatus][i]['exceed'];
//       var federalTaxRate = annual[mStatus][i]['percent'];
//       var federalTaxSub = annual[mStatus][i]['sub'];
//       var federalTaxMin = annual[mStatus][i]['min'];
//       var federalTaxMax = annual[mStatus][i]['max'];
//       // console.log(i)
//       // console.log(annual[mStatus][i]);
//       if(annual[mStatus][i])
//       {
//         console.log(i)
//           if(i==0)
//           {
//               if(taxableAmount<federalTaxMin)
//               {
//                 var federal_tax_total = 0;
//                   break;
//               }
//               else if(taxableAmount>=federalTaxMin && taxableAmount<=federalTaxMax)
//               {
//                   federalTax = federalTaxRate/100;
//                   break;
//               }
//           }
//           else
//           {
//               if(taxableAmount>=federalTaxMin && taxableAmount<=federalTaxMax)
//               {
//                   federalTax = federalTaxRate/100;
//                   break;
//               }
//               else if(taxableAmount>=federalTaxMin && federalTaxMax=='')
//               {
//                   federalTax = federalTaxRate/100;
//                   break;
//               }
//           }
//       }
//   }
//   var totalTaxAmount= federalTaxSub + (taxableAmount - federalTaxExceed) * federalTax ;

//   console.log( taxableAmount);
//   console.log(federalTaxSub);
//   console.log(federalTax);
//   console.log(federalTaxExceed);
//   console.log(totalTaxAmount);
//   if (totalTaxAmount == 0 || payMode == 0) 
//   {
//     var federal_tax_total = 0;
//   }
//   else 
//   {
//     var federal_tax_total = totalTaxAmount / payMode;
//   }



//    console.log( " var federal_tax_total :", federal_tax_total);

var paymentTotal = 2000;
var paymentMode = 12;
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
        console.log(medicare);