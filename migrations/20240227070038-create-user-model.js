'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('users', {

          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.ENUM('active', 'pending', 'deleted'),
            defaultValue: 'pending',
            allowNull: false,
          },
          gender: {
            type: Sequelize.ENUM('male', 'female', 'other'),
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              notEmpty: true,
              isEmail: true,
            },
          },
          phoneNo: {
            type: Sequelize.STRING,
            unique: true,
          },
          dateOfBirth: {
            type: Sequelize.DATEONLY,
          },
          address: {
            type: Sequelize.STRING,
          },
          password: {
            type: Sequelize.STRING,
          },
          avatar: {
            type: Sequelize.STRING, 
          },
          emailVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          phoneVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
    );
    } catch (error) {
      console.log("error running up migration - create-user-migration.", error);
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('users');
    } catch (error) {
      console.log("error running down migration - create-user-migration.", error);
      throw error
    }
  }
};
