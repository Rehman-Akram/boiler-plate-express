const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const passport = require('./src/modules/auth/passport/passport.jwt.js');
const { setMetaData } = require('./src/middlewares/index.js')
// import models
require("./models/index.js")
// import routes
const routes = require('./routes/index.js');
const { authenticate } = require("./src/modules/auth/services/auth.service.js");
//creating express app
const app = express();

//--------Start applying global middlewares ------

// Using cors middleware allowing all routes.
app.use(cors());
// Using cookie-parser middleware to parse cookies
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// adding passport middleware
app.use(passport.initialize());
// Apply the setMetaData middleware globally for public routes
app.use(setMetaData);
// Apply the authentication middleware globally
app.use(authenticate);

//--------End of applying global middelwares -------

// Forwards the request to the appropriate route
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
