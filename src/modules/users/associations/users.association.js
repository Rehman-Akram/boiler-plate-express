const sequelize = require("../../../../database/index");

// one to many relation with user-roles
sequelize.models.users.belongsToMany(sequelize.models.roles, { through: 'userRoles', foreignKey: 'userId' });
sequelize.models.users.hasMany(sequelize.models.invites);
// Just to log which assoication is successfully loaded
module.exports = 'users';