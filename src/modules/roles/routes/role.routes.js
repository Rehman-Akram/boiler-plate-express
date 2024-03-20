const express = require('express');
const router = express.Router();
const roleService = require("../services/roles.service");

router.get('/get-roles', async (req, res) => {
  const roles = await roleService.getRoles(req, res);
  if(roles){
    res.status(200).json({statusCode: 200, message: 'Roles list is attached', data: roles});
  }
  
});

module.exports = router;
