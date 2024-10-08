const bcrypt = require("bcrypt");

function setLowerCaseTrim(column) {
  return function (value) {
    this.setDataValue(column, (value || "").toLowerCase().trim());
  };
}

function setTrim(column) {
  return function (value) {
    this.setDataValue(column, (value || "").trim());
  }
}

function generateInviteHash(str) {
  const code = bcrypt.hashSync(str, parseInt(process.env.BCRYPT_WORK));
  const forbiddenChars = /[\/?&]/g;
  return code.replace(forbiddenChars, '');
}

module.exports = { setLowerCaseTrim, setTrim, generateInviteHash };