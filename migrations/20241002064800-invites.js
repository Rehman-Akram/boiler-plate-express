'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {

      await queryInterface.createTable('invites', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
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
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
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
        }
      })

    } catch (error) {
      console.log("error running up migration - invites migration", error);
      throw error

    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('invites');
    } catch (error) {
      console.log("error running down migration - invites migration.", error);
      throw error
    }
  }
};
