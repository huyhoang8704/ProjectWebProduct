const express = require('express')
const controller = require('../../Controllers/client/cart.controller')
const router = express.Router()


router.post('/add/:productId',controller.addPOST)


module.exports = router;