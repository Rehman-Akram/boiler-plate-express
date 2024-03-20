const Sequelize = require('sequelize');
const sequelize = require("../../../../database/index");

const userRoles = sequelize.define('userRoles', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  roleId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    },
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

module.exports = userRoles;
