'use strict';

const { DEFAULT_PERMISSIONS } = require('../src/constants/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('permissions', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        userPermissions: {
          type: Sequelize.JSONB,
          defaultValue: DEFAULT_PERMISSIONS,
          allowNull: false
        },
        rolePermissions: {
          type: Sequelize.JSONB,
          defaultValue: DEFAULT_PERMISSIONS,
          allowNull: false
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
        }
      })
      await queryInterface.addColumn('roles', 'permissionId',
        {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'permissions', key: 'id' }
        })
    } catch (error) {
      console.log("error running up migration - permissions migration", error);
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('permissions')
      await queryInterface.removeColumn('roles', 'permissionId')
    } catch (error) {
      console.log("error running down migration - permissions migration", error);
      throw error
    }
  }
};
