const express = require('express')
const controller = require('../../Controllers/admin/products-category.controller')
const router = express.Router()
const validate = require('../../validate/admin/products-category.validate')


router.get('/',controller.index)
// create
router.get('/create',controller.create)
router.post(
    '/create',
    // validate.createPOST,
    controller.createPOST
)

// edit
router.get('/edit/:id',controller.edit)
router.patch(
    '/edit/:id',
    // validate.editPATCH,
    controller.editPatch)


module.exports = router;