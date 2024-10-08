const sequelize = require("../../../../database");
const Sequelize = require("sequelize");
const { DEFAULT_PERMISSIONS } = require("../../../constants/constants");

const permissions = sequelize.define("permissions", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    userPermissions: {
        type: Sequelize.JSONB,
        defaultValue: DEFAULT_PERMISSIONS,
        allowNull: false,
    },
    rolePermissions: {
        type: Sequelize.JSONB,
        defaultValue: DEFAULT_PERMISSIONS,
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
}, {
    timestamps: false,
});
module.exports = permissions;
