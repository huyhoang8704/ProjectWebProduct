const express = require('express')
const controller = require('../../Controllers/admin/settings.controller')
const router = express.Router()


router.get('/general',controller.general)
router.patch('/general',controller.generalPatch)
module.exports = router;