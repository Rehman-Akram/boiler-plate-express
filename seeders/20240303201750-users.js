'use strict';
const users = require('../src/modules/users/seed-data/users-seed-data');
const allModels = require('../models/index'); // getting all models

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const user of users) {
        const existingUser = await allModels.users.findOne({ where: { email: user.email } });
        if (!existingUser) {
          const { role, ...rest} = user
          //fetch role id from roles table
          const roleFetched = await allModels.roles.findOne({ where: { name: role, isDeleted: false } });
          if (!roleFetched) {
            console.log(`Role ${role} not found or role is deleted`);
            return;
          }
          const userCreated = await allModels.users.create(rest);
          // add role in middle table
          await allModels.userRoles.create({userId: userCreated.id, roleId: roleFetched.id})
          console.log(`>>>>>>>>>>>>>>>>USER: ${user.email} CREATED SUCCESSFULLY>>>>>>>>>>>>>>>>>>`);
        }
      }
    }
    catch (error) {
      console.log('Error in running users seeder', error);
      throw error
    }
  },
}
