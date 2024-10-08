const { body } = require('express-validator');

const roleSchema = {
    createRole: [
        body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
        body('description').optional().isString().withMessage('Description must be a string'),
        body('permissions').notEmpty().withMessage('Permissions are required').isObject().withMessage('Permissions must be an object'),
    ],

}

module.exports = roleSchema;