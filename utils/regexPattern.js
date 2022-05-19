module.exports = {
  extraWhitespace: /\s\s+/g,
  userName: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
};
