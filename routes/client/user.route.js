const express = require('express')
const controller = require('../../Controllers/client/user.controller')
const router = express.Router()

const validate = require('../../validate/client/user.validate')



router.get('/register',controller.register)
router.post('/register',
    validate.registerPOST,
    controller.registerPOST)

module.exports = router;