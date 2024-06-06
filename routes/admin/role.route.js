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
// permissions
router.get('/permissions',controller.permissions)
router.patch('/permissions',controller.permissionsPATCH)
//delete
router.delete('/delete/:id',controller.deleteRole)

module.exports = router;