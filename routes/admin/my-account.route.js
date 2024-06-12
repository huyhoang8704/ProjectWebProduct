const express = require('express')
const controller = require('../../Controllers/admin/my-account.controller')
const router = express.Router()
const validate = require('../../validate/admin/my-account.validate')

router.get('/',controller.index)
router.get('/edit',controller.edit)
router.patch('/edit',validate.createPOST,controller.editPatch)



module.exports = router;