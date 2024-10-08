const { ROLES, PERMISSIONS } = require('../../../constants/constants')
const rolesToSeed = [
  {
    name: ROLES.SUPER_ADMIN,
    permissions: {
      [PERMISSIONS.USERS]: { create: true, read: true, update: true, delete: true },
      [PERMISSIONS.ROLES]: { create: true, read: true, update: true, delete: true },
    }
  },
  {
    name: ROLES.ADMIN,
    permissions: {
      [PERMISSIONS.USERS]: { create: true, read: true, update: true, delete: true },
      [PERMISSIONS.ROLES]: { create: true, read: true, update: true, delete: true },
    }
  },
  {
    name: ROLES.PROJECT_MANAGER,
    permissions: {}
  },
  {
    name: ROLES.VENDOR_MANAGER,
    permissions: {}
  },
  {
    name: ROLES.MEMBER,
    permissions: {}
  }
]
module.exports = rolesToSeed