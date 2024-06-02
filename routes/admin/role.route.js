const express = require('express')
const controller = require('../../Controllers/admin/role.controller')
const router = express.Router()


router.get('/',controller.index)
// create
router.get('/create',controller.create)
router.post('/create',controller.createPOST)
// edit
router.get('/edit/:id',controller.edit)
router.patch('/edit/:id',controller.editPatch)



module.exports = router;