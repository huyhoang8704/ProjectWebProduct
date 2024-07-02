const express = require('express')
const controller = require('../../Controllers/client/checkout.controller')
const router = express.Router()

router.get('/',controller.index)
router.post('/order',controller.order)
router.get('/success/:orderId',controller.success)


module.exports = router;