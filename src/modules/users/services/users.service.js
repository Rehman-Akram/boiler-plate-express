const sequelize = require('../../../../database/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const { sendEmail } = require('../../../shared/services/mailer.service.js')
const { generateInviteEmail } = require('../../../shared/templates/templates.js')
const inviteService = require('../../invites/services/invites.service.js')
const permissionsService = require('../../permissions/services/permissions.service.js')

const findById = async (id) => {
  try {
    const user = await sequelize.models.users.findOne({
      where: {
        id: id,
        status: {
          [Op.not]: 'pending'
        }
      },
      include: [
        {
          model: sequelize.models.roles,
          include: { model: sequelize.models.permissions },
          through: sequelize.models.userRoles,
        },
      ]
    })
    user.dataValues['permissions'] = permissionsService.mergeRolePermissions(user.roles)
    delete user.dataValues.password
    return user
  }
  catch (error) {
    console.error(`Error in findById of user service where id: ${id}`)
    throw error
  }
};

const verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = res.locals.user;
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      delete (res.locals.user.password)
      next();
    } else {
      return res.status(404).json({ status: "error", statusCode: 404, error: "Either email or password is wrong" });
    }
  }
  catch (error) {
    console.error(`Error in verifyPassword of user service where email: ${req.body.email}`)
    res.send({ status: "error", statusCode: 500, error: "Internal Server Error" });
  }
}

const findByEmailForLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await sequelize.models.users.findOne({
      where: { email },
      include: [
        {
          model: sequelize.models.roles,
          include: { model: sequelize.models.permissions },
          through: sequelize.models.userRoles,
        },
      ]
    });
    if (user) {
      if (user.status === 'pending') {
        return res.status(403).json({ status: "error", statusCode: 403, error: "User status is pending, please contact system administrator." })
      }
      else if (user.status === 'deleted') {
        return res.status(404).json({ status: "error", "statusCode": 404, error: "User is deleted, please contact system administrator" })
      }
      res.locals.user = user.dataValues
      next()
    } else {
      return res.status(404).json({ status: "error", statusCode: 404, error: "Either email or password is wrong" });
    }
  }
  catch (error) {
    console.error(`Error in findByEmailForLogin of user service where email: ${req.body.email}`)
    res.send({ status: "error", statusCode: 500, error: "Internal Server Error" });
  }
}

const getUsers = (req, res) => {
  try {
    return sequelize.models.users.findAll({
      include: [
        {
          model: sequelize.models.roles,
          through: sequelize.models.userRoles,
        },
      ]
    });
  }
  catch (error) {
    console.error(`Error in getUsers of user service`, error)
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
    return
  }
}

const createUser = async (currentUser, body, res) => {
  try {
    // find existing user
    const existingUser = await sequelize.models.users.findOne({
      where: {
        [Op.or]: [
          { email: body.email },
          ...[body.phoneNo ? [{ phoneNo: body.phone }] : []],
        ],
        status: {
          [Op.not]: 'deleted'
        }
      },
    });
    if (existingUser) {
      res.status(409).json({ statusCode: 409, message: 'User already exist' })
      return
    }
    const roleExists = await sequelize.models.roles.findOne({
      where: {
        name: body.role,
        isDeleted: false
      },
    })
    // verify that role exists
    if (!roleExists) {
      res.status(409).json({ statusCode: 409, message: `Role doesn't exist` })
      return
    }

    // create new user with pending status
    const newUser = await sequelize.models.users.create({
      firstName: body.name,
      email: body.email,
      phoneNo: body.phone,
    },
    );
    // add role entry in userRoles
    newUser.setRoles([roleExists]);
    const { inviteLink } = await inviteService.create(newUser, currentUser);
    // call invitation service to create entry in invitation table
    const template = generateInviteEmail(body.name, body.message, inviteLink);
    // send email to new user
    sendEmail(body.email, "User created email", template);
    return newUser
  }
  catch (error) {
    console.error(`Error in createUser of user service while creating user with email: ${body.email}`, error)
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
    return
  }
}

const findOneByOptions = async (options) => {
  try {
    return await sequelize.models.users.findOne({ where: options })
  } catch (error) {
    console.error(`Error in findOneByOptions of users service where options are ${JSON.stringify(options)}`);
    throw error;
  }
}

const findOneByOptionsAndRelations = async (options, relations) => {
  try {
    return await sequelize.models.users.findOne({ where: options, include: relations })
  } catch (error) {
    console.error(`Error in findOneByOptions of users service where options are ${JSON.stringify(options)}`);
    throw error;
  }
}

const updateSingleUser = async (req, res, next) => {
  try {
    const { options, data } = req.body
    const user = await findOneByOptions(options);
    if (!user) {
      throw { statusCode: 404, error: 'User not found' }
    } else {
      Object.assign(user, data)
      await user.save(user)
      const updatedUser = await findOneByOptionsAndRelations(
        { id: user.id },
        [{
          model: sequelize.models.roles
        }]
      );
      delete updatedUser.password
      res.locals.user = updatedUser
      next()
    }
  } catch (error) {
    console.error(
      `Error in updateSingleUser of user service where options: ${JSON.stringify(req.body.options)} and data: ${JSON.stringify(req.body.data)}`,
    );
    next(error)
  }
}

module.exports = { findById, findByEmailForLogin, verifyPassword, createUser, getUsers, findOneByOptions, findOneByOptionsAndRelations, updateSingleUser }