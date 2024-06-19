const express = require('express')
const controller = require('../../Controllers/client/product.controller')
const router = express.Router()


router.get('/',controller.index)
router.get('/detail/:slug',controller.detail)

router.get('/:slugCategory',controller.category)

module.exports = router;