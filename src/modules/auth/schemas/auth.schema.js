const { body } = require('express-validator');

const authSchema = {
  loginSchema: [
    body('email').notEmpty().withMessage('Password is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
}

module.exports = authSchema