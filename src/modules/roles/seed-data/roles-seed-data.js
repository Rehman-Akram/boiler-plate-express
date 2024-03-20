const { ROLES } = require('../../../constants/constants')
const rolesToSeed = [
    {
      name: ROLES.SUPER_ADMIN,
    },
    {
      name: ROLES.ADMIN,
    },
    {
      name: ROLES.PROJECT_MANAGER,
    },
    {
      name: ROLES.VENDOR_MANAGER,
    },
    {
      name: ROLES.MEMBER,
    }
]
module.exports = rolesToSeed