const sequelize = require("../../../../database/index");
sequelize.models.invites.belongsTo(sequelize.models.users, { foreignKey: 'userId' });
module.exports = 'invites';