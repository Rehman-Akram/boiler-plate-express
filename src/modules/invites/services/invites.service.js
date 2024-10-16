const sequelize = require('../../../../database/index.js');
const { generateInviteHash } = require('../../../shared/utils.js')
const config = require('../../../../config/config.js')
const { InviteStatus, UserStatus } = require('../../../constants/constants.js');
const { generateInviteEmail } = require('../../../shared/templates/templates.js');
const { sendEmail } = require('../../../shared/services/mailer.service.js');
const eventEmitter = require('../../../shared/eventEmitter.js')

const generateInviteCode = (userId) => {
    const inviteCode = generateInviteHash(userId);
    const currentTime = new Date();
    const expiresAt = new Date(
        currentTime.getTime() + parseInt(config.inviteExpiryTime) * 1000,
    );
    return { inviteCode, expiresAt };
}

const create = async (newUser, currentUser) => {
    try {
        const { inviteCode, expiresAt } = generateInviteCode(newUser.id);

        await sequelize.models.invites.create({
            name: newUser.firstName,
            email: newUser.email,
            inviteCode,
            inviteById: currentUser.id,
            expiresAt,
            userId: newUser.id,
        });
        // create and return invite link
        return {
            inviteLink: `${config.frontEndHost}/invites/verify-invite?code=${inviteCode}`,
            inviteCode: inviteCode,
        };
    } catch (error) {
        console.error(
            `Error in createInvite of invite service where params: ${JSON.stringify({ newUser, currentUser })}`,
        );
        throw error;
    }
}

const verifyCode = async (code, res, next) => {
    try {
        const invite = await sequelize.models.invites.findOne({
            where: { inviteCode: code, isDeleted: false },
            include: { model: sequelize.models.users },
        });
        if (invite && invite.expiresAt < new Date() && invite.status === InviteStatus.PENDING) {
            throw { statusCode: 403, message: 'Invite code is expired' };
        }
        if (!invite || invite.expiresAt < new Date() || invite.status === InviteStatus.APPROVED) {
            throw { statusCode: 400, message: "Invalid invite code" }
        }
        return invite;
    } catch (error) {
        console.error(`Error in verifyCode of InvitesService where code: ${code}`);
        next(error)
    }
}

const acceptInvite = async (req, res, next) => {
    try {
        const invite = await verifyCode(req.body.code, res, next);
        if (!invite) return
        invite.status = InviteStatus.APPROVED;
        return await invite.save(invite);
    } catch (error) {
        console.error(`Error in acceptInvite of InvitesService where code: ${req.body.code}`);
        next(error)
    }
}

const acceptInviteUpdateUser = async (req, res, next) => {
    try {
        const { code, ...rest } = req.body;
        const invite = await acceptInvite(req, res, next);
        if (!invite) return
        req.body.options = { id: invite.userId }
        req.body.data = { ...rest, status: UserStatus.ACTIVE, emailVerified: true },
            next()
    } catch (error) {
        console.error(`Error in acceptInviteUpdateUser of InvitesService where code: ${req.body.code}`);
        next(error)
    }
}

const resendInvite = async (req, res, next) => {
    try {
        eventEmitter.emit('findUser', { email: req.params.email, status: UserStatus.PENDING });
        const getUserHandler = async (user) => {
            try {
                if (!user) {
                    throw { statusCode: 400, message: 'User not pending' };
                }
                const invite = await sequelize.models.invites.findOne({
                    where: { email: req.params.email, status: InviteStatus.PENDING, isDeleted: false },
                });

                if (!invite) {
                    throw { statusCode: 400, message: 'Invite not found' };
                } else {
                    const { inviteCode, expiresAt } = generateInviteCode(user.id);
                    invite.inviteCode = inviteCode;
                    invite.expiresAt = expiresAt;
                    await invite.save();
                    const inviteLink = `${config.frontEndHost}/invites/verify-invite?code=${inviteCode}`;
                    const template = generateInviteEmail(user.name, '', inviteLink);
                    sendEmail(user.email, "Invite Resend", template);
                    res.status(200).json({ data: true, status: 'successfull', statusCode: 200 });
                }
            } catch (error) {
                console.error(`Error processing invite for email: ${req.params.email}`, error);
                next(error);
            }
        };
        eventEmitter.once('getUser', getUserHandler);
        eventEmitter.once('error', (error) => {
            console.error(`Error with eventEmitter while processing invite for email: ${req.params.email}`, error);
            next(error);
        });
    } catch (error) {
        console.error(`Error in resendInvite of InvitesService where email: ${req.params.email}`, error);
        next(error);
    }
};


module.exports = { create, generateInviteCode, acceptInvite, acceptInviteUpdateUser, verifyCode, resendInvite }