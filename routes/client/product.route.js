const express = require('express')
const controller = require('../../Controllers/client/product.controller')
const router = express.Router()


router.get('/',controller.index)
router.get('/:slug',controller.detail)

module.exports = router;