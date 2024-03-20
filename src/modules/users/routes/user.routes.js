const express = require('express');
const router = express.Router();
const userService = require("../services/users.service");
const userSchema  = require('../schemas/user.schema');
const {validate} = require('../../../middlewares/validate');

router.post('/create-user', userSchema.createUser, validate, async (req, res) => {
  const userCreated = await userService.createUser(req.user, req.body, res);
  if(userCreated){
    res.status(200).json({statusCode: 200, message: 'User created successfully and invite email sent', data: userCreated});
  }
});

router.get('/get-users', async (req, res) => {
  const users = await userService.getUsers(req, res);
  if(users){
    res.status(200).json({statusCode: 200, message: 'User list is attached', data: users});
  }
});

module.exports = router;
