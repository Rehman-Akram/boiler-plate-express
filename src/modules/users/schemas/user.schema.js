const { body } = require('express-validator');

const userSchema = {
  createUser: [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number format'),
    body('message').optional().isString().withMessage('Message must be a string'),
    body('role').notEmpty().withMessage('Role is required').isString().withMessage('Role must be a string'),
  ],
  updateUser: [ 
    body('firstName').notEmpty().withMessage('First name is required').isString().withMessage('First name must be a string'),
    body('lastName').notEmpty().withMessage('Last name is required').isString().withMessage('Last name must be a string'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number format'),
    body('dob').optional().isISO8601().toDate().withMessage('DOB must be a date'),
    body('address').optional().isString().withMessage('Address is not valid'),
    body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password is invalid').isLength({min:6,max:30}).withMessage('Number of characters in password field is out of bounds'),
    body('gender').optional().isIn(['male','female','other']).withMessage('Provided gender value is incorrect'),
  ],
}

module.exports = userSchema;