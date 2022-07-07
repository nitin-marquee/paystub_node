module.exports = {

  number_format: (number) => {
    return parseFloat(number.toFixed(2));
  },
  converttofloat:  (num) => {
		let number = parseFloat(num.toString().replace(/[^\d\\.]/, ''));
		return number;
	},
  convertToFloatWithDecimal:  (num) => {
    let number = Math.round( parseFloat(num.replace(/[^\d\\.]/, '')) * 100) / 100;
    return number;
  }

};
