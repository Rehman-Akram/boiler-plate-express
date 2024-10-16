const { PUBLIC_ROUTES } = require("../constants/constants");
const { match } = require('path-to-regexp');

const setMetaData = (req, res, next) => {
  const isPublic = PUBLIC_ROUTES.some((routePattern) => {
    const matcher = match(routePattern, { decode: decodeURIComponent });
    return matcher(req.path);
  });

  req.isPublic = isPublic;
  next();
};

module.exports = setMetaData;
