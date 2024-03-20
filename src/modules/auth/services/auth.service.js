const config = require('../../../../config/config')
const jwt = require('jsonwebtoken')
const passport = require('../passport/passport.jwt')

const generateToken = (req, res, next) => {
  const {locals} = res
  const token = jwt.sign({ id: locals.user.id }, config.get('SECRET'), {expiresIn: parseInt(config.get('JWT_EXPIRES_IN'))});
  locals.token = token
  next()
}

const setTokenCookie = (req, res, next) => {
  const {locals} = res
  res.cookie('token', locals.token, { httpOnly: true });
  next()
}

const authenticate = (req, res, next) => {
  // Apply passport.authenticate() except for public routes
  if (req.isPublic) {
    return next(); // Skip authentication for public routes
  }
  passport.authenticate('jwt', { session: false })(req, res, next);
};

const whoAmI = (req, res, next) => {
  try {
    const { user } = req;
    res.locals.user = user;
    next()
  }
  catch (error) {
    console.log("error from who am i is: ", error);
    res.status(500).json({ error: "Internal Server Error", statusCode: 500, status: "error" })
  }
}

module.exports = {generateToken, setTokenCookie, authenticate, whoAmI}