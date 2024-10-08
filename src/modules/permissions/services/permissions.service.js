const sequelize = require("../../../../database");
const { PermissionLevel, PERMISSIONS } = require("../../../constants/constants");

const create = async (permissions) => {
    try {
        const permissionObject = getPermissions(permissions)
        return await sequelize.models.permissions.create(permissionObject)
    } catch (error) {
        console.error(`Error in create of permissions service`)
        throw error
    }
}

const update = async (permissions, options) => {
    try {
        const permissionObject = getPermissions(permissions)
        const existingPermissions = await sequelize.models.permissions.findOne({ where: options })
        existingPermissions.set(permissionObject)
        await existingPermissions.save()
        return existingPermissions
    } catch (error) {
        console.error(`Error in update of permissions service`)
        throw error
    }
}

const getPermissions = (permissions) => {
    const permissionObject = {};
    for (const key in permissions) {
        if (permissions[key] === PermissionLevel.FULL_ACCESS) {
            permissionObject[key] = { create: true, read: true, update: true, delete: true };
        } else if (permissions[key] === PermissionLevel.PARTIAL) {
            permissionObject[key] = { create: false, read: true, update: true, delete: false };
        } else if (permissions[key] === PermissionLevel.VIEW) {
            permissionObject[key] = { create: false, read: true, update: false, delete: false };
        } else {
            permissionObject[key] = { create: false, read: false, update: false, delete: false };
        }
    }
    return permissionObject;
}

const mergeRolePermissions = (userRoles) => {
    try {

        return userRoles.reduce((permissions, userRole) => {
            const rolePermissionTypes = userRole.dataValues.permission.dataValues;

            Object.values(PERMISSIONS).forEach((permissionType) => {
                const rolePermissions = rolePermissionTypes[permissionType];
                Object.keys(rolePermissions).forEach((permission) => {
                    if (!permissions[permissionType]) {
                        permissions[permissionType] = { [permission]: rolePermissions[permission] };
                    } else {
                        permissions[permissionType][permission] =
                            permissions[permissionType][permission] || rolePermissions[permission];
                    }
                });
            });

            return permissions;
        }, {});
    } catch (error) {
        console.error(
            `Error in mergeRolePermissions of AuthService where userRoles: ${JSON.stringify(userRoles)}`,
        );
        throw error;
    }
}

module.exports = { create, update, mergeRolePermissions, getPermissions }