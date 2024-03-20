const {PUBLIC_ROUTES} = require("../constants/constants");

const setMetaData = (req, res, next) => {
  req.isPublic = PUBLIC_ROUTES.includes(req.path) ? true : false
  next()
};

module.exports = setMetaData