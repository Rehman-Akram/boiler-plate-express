const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('../src/modules/users/routes/user.routes.js');
const roleRoutes = require('../src/modules/roles/routes/role.routes.js');
const authRoutes = require('../src/modules/auth/routes/auth.routes.js');

// Add your route modules here
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/auth', authRoutes);

module.exports = router;
