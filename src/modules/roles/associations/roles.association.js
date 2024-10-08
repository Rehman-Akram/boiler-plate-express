const sequelize = require("../../../../database/index");

sequelize.models.roles.belongsToMany(sequelize.models.users, { through: 'userRoles', foreignKey: 'roleId' });
sequelize.models.roles.belongsTo(sequelize.models.permissions, { foreignKey: 'permissionId' })
// Just to log which assoication is successfully loaded
module.exports = 'roles';
