const express = require('express');
const router = express.Router();
const { validate } = require('../../../middlewares/validate');
const authService = require('../../auth/services/auth.service')
const sharedService = require('../../../shared/services/response.services');
const inviteSchema = require('../schemas/invite.schema');
const inviteService = require('../services/invites.service')
const userService = require('../../users/services/users.service');
const { UserStatus } = require('../../../constants/constants');

router.post('/accept-invite', inviteSchema.acceptInvite, validate, inviteService.acceptInviteUpdateUser, userService.updateSingleUser, authService.generateToken, authService.setTokenCookie, sharedService.successfullResponse)
router.get('/resend-invite/:email', async (req, res, next) => {
    const invite = await inviteService.resendInvite(req, res, next)
})
router.get('/verify-code/:code', async (req, res, next) => {
    const invite = await inviteService.verifyCode(req.params.code, res, next)
    if (invite)
        res.status(200).json({
            data: {
                firstName: invite?.user?.firstName,
                lastName: invite?.user?.lastName,
                exipryTime: invite?.expiresAt,
                email: invite?.user?.email
            }, status: 'successfull', statusCode: 200
        });
})
module.exports = router;
