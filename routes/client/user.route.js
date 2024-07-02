const express = require('express')
const controller = require('../../Controllers/client/user.controller')
const router = express.Router()

const validate = require('../../validate/client/user.validate')



router.get('/register',controller.register)
router.post('/register',
    validate.registerPOST,
    controller.registerPOST)

router.get('/login',controller.login)
router.post('/login',
    validate.loginPOST,
    controller.loginPOST)



module.exports = router;