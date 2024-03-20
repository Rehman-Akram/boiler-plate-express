function setLowerCaseTrim(column) {
  return function(value) {
    this.setDataValue(column, (value || "").toLowerCase().trim());
  };
}

function setTrim(column) {
  return function(value) {
    this.setDataValue(column, (value || "").trim());
  }
}

module.exports = { setLowerCaseTrim, setTrim };