'use strict';

const rolesData = require('../src/modules/roles/seed-data/roles-seed-data')
const allModels = require('../models/index'); // getting all models

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      for (const role of rolesData) {
        const existingRole = await allModels.roles.findOne({ where: { name: role.name } });
        if (!existingRole) {
          await allModels.roles.create({name: role.name});
          console.log(`>>>>>>>>>>>>>>>>ROLE: ${role.name} CREATED SUCCESSFULLY>>>>>>>>>>>>>>>>>>`);
        }
      }
    }
    catch (error) {
      console.log('error running seeder - rolesWithPermissions.', error);
      throw error
    }
    
  },
};
