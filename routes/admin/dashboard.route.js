const express = require('express')
const controller = require('../../Controllers/admin/dashboard.controller')
const router = express.Router()


router.get('/',controller.index)


module.exports = router;