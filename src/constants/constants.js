const CONSTANTS = {
  PUBLIC_ROUTES: ['/auth/signup', '/auth/login', '/invites/accept-invite', '/resend-invite/:email', '/verify-code/:code'],
  ROLES: {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    VENDOR_MANAGER: 'Vendor Manager',
    PROJECT_MANAGER: 'Project Manager',
    MEMBER: 'Member',
  },
  InviteStatus: { PENDING: 'pending', APPROVED: 'approved' },
  UserStatus: { ACTIVE: 'active', PENDING: 'pending', DELETED: 'deleted' },
  DEFAULT_PERMISSIONS: { create: false, read: false, update: false, delete: false },
  PERMISSIONS: {
    USERS: 'userPermissions',
    ROLES: 'rolePermissions',
  },
  PermissionLevel: {
    FULL_ACCESS: 'full',
    PARTIAL: 'partial',
    VIEW: 'view',
  }
}

module.exports = CONSTANTS