const { body } = require('express-validator');

const inviteSchema = {
    acceptInvite: [
        body('code').notEmpty().withMessage('Code is required'),
        body('firstName').notEmpty().withMessage('firstName is required').isString().withMessage('firstName must be a string'),
        body('lastName').optional().isString().withMessage('lastName must be a string'),
        body('dateOfBirth').optional().isDate().withMessage('dateOfBirth must be a date'),
        body('address').optional().isString().withMessage('address must be a string'),
        body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string').isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 to 20 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, one special character'),
        body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number format'),
    ],

}

module.exports = inviteSchema;