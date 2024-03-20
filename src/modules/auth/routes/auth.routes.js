const express = require('express');
const router = express.Router();
const userService = require("../../users/services/users.service");
const authSchema  = require('../schemas/auth.schema'); 
const {validate} = require('../../../middlewares/validate');
const authService = require('../services/auth.service')
const sharedService= require('../../../shared/services/response.services')


router.post('/login', authSchema.loginSchema, validate, userService.findByEmailForLogin, userService.verifyPassword, authService.generateToken, authService.setTokenCookie, sharedService.successfullResponse)

router.get('/who-am-i', authService.whoAmI, sharedService.successfullResponse)

module.exports = router;
