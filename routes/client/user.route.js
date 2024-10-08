const express = require('express')
const controller = require('../../Controllers/client/user.controller')
const router = express.Router()

const validate = require('../../validate/client/user.validate')
const authMiddleware = require('../../middlewares/client/auth.middleware')


router.get('/register',controller.register)
router.post('/register',
    validate.registerPOST,
    controller.registerPOST)

router.get('/login',controller.login)
router.post('/login',
    validate.loginPOST,
    controller.loginPOST)

router.get('/logout',controller.logout)

router.get('/password/forgot',controller.forgotPassword)
router.post('/password/forgot',validate.forgotPasswordPOST,controller.forgotPasswordPOST)

router.get('/password/otp',controller.otpPassword)
router.post('/password/otp',validate.otpPOST,controller.otpPasswordPOST)

router.get('/password/reset',controller.resetPassword)
router.post('/password/reset',validate.resetPasswordPOST,controller.resetPasswordPOST)

// Để vô được trang in4 user -> phải có middleware xem có cookies không
router.get('/information',authMiddleware.requireAuth,controller.informationUser)

module.exports = router;