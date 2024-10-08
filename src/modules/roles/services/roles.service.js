const sequelize = require('../../../../database/index.js');
const permissionService = require('../../permissions/services/permissions.service.js')
const getRoles = (req, res) => {
  try {
    return sequelize.models.roles.findAll({
      include: [
        {
          model: sequelize.models.permissions,
        }
      ]
    });
  }
  catch (error) {
    console.error(`Error in getRoles of roles service`, error)
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
    return
  }
}

const findOneByOptions = async (options) => {
  try {
    return sequelize.models.roles.findOne({ where: options });
  } catch (error) {
    console.error(
      `Error in findOneByOptions of RolesService where options: ${JSON.stringify(options)}`,
    );
    throw error;
  }
}

const create = async (data, next) => {
  try {
    const { name, description, permissions } = data;
    const existingRole = await findOneByOptions({ name: name })

    if (existingRole) {
      throw { statusCode: 409, message: 'Role already exists' };
    }
    const createdPermissions = await permissionService.create(permissions)
    const roleData = { name: name, description: description, permissionId: createdPermissions.id }
    return await sequelize.models.roles.create(roleData)
  } catch (error) {
    console.error(
      `Error in create of RolesService where data: ${JSON.stringify(data)}`,
    );
    next(error)
  }
}

const update = async (data, id, next) => {
  try {
    const { name, description, permissions } = data;
    const existingRole = await findOneByOptions({ id: id })

    if (!existingRole) {
      throw { statusCode: 404, message: 'Role not found' };
    }
    if (permissions) { await permissionService.update(permissions, { id: existingRole.permissionId }) }
    if (name)
      existingRole.name = name
    if (description)
      existingRole.description = description
    await existingRole.save()
    return existingRole
  } catch (error) {
    console.error(
      `Error in update of RolesService where data: ${JSON.stringify(data)}`,
    );
    next(error)
  }
}

const archiveRole = async (id, next) => {
  try {
    await sequelize.models.roles.update({ isDeleted: true }, { where: { id: id } })
    await sequelize.models.userRoles.update({ isDeleted: true }, { where: { roleId: id } })
    return true
  } catch (error) {
    console.error(
      `Error in archiveRole of RolesService where id: ${id}`,
    );
    next(error)
  }
}

module.exports = { getRoles, create, findOneByOptions, update, archiveRole }