const Sequelize = require('sequelize');
const sequelize = require("../../../../database/index");
const { setTrim, setLowerCaseTrim } = require('../../../shared/utils');
const invites = sequelize.define('invites',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            set: setTrim("firstName"),
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            set: setLowerCaseTrim("email"),
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        inviteCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        inviteById: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiresAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('pending', 'approved'),
            defaultValue: 'pending',
            allowNull: false,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: false,
    }
);

module.exports = invites;