const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../../../../config/config.js')
const userService = require('../../users/services/users.service.js');
const options = {
  jwtFromRequest: (req) => {
    // Check cookies for the bearer token first
    const tokenFromCookies = req.cookies && req.cookies.token;
    if (tokenFromCookies) {
      return tokenFromCookies;
    }
    // If not found in cookies, extract from the Authorization header
    return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  },
  secretOrKey: config.get('SECRET')
};

passport.use(new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await userService.findById(payload.id)
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }
  catch (error) {
    console.error("Error in JwtStrategy", error)
    return done(error, false);
  }
}));

module.exports = passport;
