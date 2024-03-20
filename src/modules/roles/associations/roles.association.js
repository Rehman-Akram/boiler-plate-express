const sequelize = require("../../../../database/index");

sequelize.models.roles.belongsToMany(sequelize.models.users, { through: 'userRoles', foreignKey: 'roleId'});

// Just to log which assoication is successfully loaded
module.exports = 'roles';
