const express = require('express');
const router = express.Router();
const roleService = require("../services/roles.service");
const roleSchema = require('../schemas/role.schema');
const { validate } = require('../../../middlewares/validate');

router.get('/get-roles', async (req, res) => {
  const roles = await roleService.getRoles(req, res);
  if (roles) {
    res.status(200).json({ statusCode: 200, message: 'Roles list is attached', data: roles });
  }
});

router.post('/create-role', roleSchema.createRole, validate, async (req, res, next) => {
  const role = await roleService.create(req.body, next);
  if (role) {
    res.status(200).json({ statusCode: 200, message: 'Role created', data: role });
  }
});

router.patch('/update-role/:id', async (req, res, next) => {
  const role = await roleService.update(req.body, req.params.id, next);
  if (role) {
    res.status(200).json({ statusCode: 200, message: 'Role updated', data: role });
  }
});

router.delete('/delete-role/:id', async (req, res, next) => {
  const role = await roleService.archiveRole(req.params.id, next);
  if (role) {
    res.status(200).json({ statusCode: 200, message: 'Role updated', data: role });
  }
});

module.exports = router;
