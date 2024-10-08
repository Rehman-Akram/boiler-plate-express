const sequelize = require("../../../../database/index");
sequelize.models.permissions.hasOne(sequelize.models.roles);
module.exports = 'permissions';
