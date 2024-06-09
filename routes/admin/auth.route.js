const express = require('express')
const controller = require('../../Controllers/admin/auth.controller')
const router = express.Router()
const validate = require('../../validate/admin/authentication.validate')

router.get('/login',controller.login)
router.post('/login',validate.login,controller.loginPOST)

module.exports = router;