module.exports = {
  extraWhitespace: /\s\s+/g,
  userName: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,

  numberFormater: async (number) => {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
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
