const express = require('express')
const controller = require('../../Controllers/client/cart.controller')
const router = express.Router()

router.get('/',controller.index)
router.post('/add/:productId',controller.addPOST)
router.get(`/delete/:productId`,controller.deleteProduct)


module.exports = router;