module.exports = {

  number_format: async (number) => {
    return parseFloat(number.toFixed(2));
  },
  converttofloat: async (number) => {
		var number = parseFloat(number.replace(/[^\d\.]/, ""));
		return number;
	},
  convertToFloatWithDecimal: async (number) => {
    var number = Math.round( parseFloat(number.replace(/[^\d\.]/, '')) * 100) / 100;
    return number;
  }

};
