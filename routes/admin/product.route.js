const express = require('express')
const controller = require('../../Controllers/admin/product.controller')
const router = express.Router()
const validate = require('../../validate/admin/product.validate')

router.get('/',controller.index)
router.patch('/change-status/:status/:id',controller.changeStatus)
router.delete('/delete/:id',controller.deleteItem)
// create
router.get('/create',controller.create)
router.post(
    '/create',
    validate.createPOST,
    controller.createPOST
)
// edit
router.get('/edit/:id',controller.edit)
router.patch(
    '/edit/:id',
    validate.createPOST,
    controller.editPatch)
module.exports = router;