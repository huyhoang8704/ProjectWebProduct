const express = require('express')
const controller = require('../../Controllers/admin/role.controller')
const router = express.Router()


router.get('/',controller.index)
// create
router.get('/create',controller.create)
router.post(
    '/create',
    controller.createPOST
)

module.exports = router;