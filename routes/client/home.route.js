const express = require('express')
const controller = require('../../Controllers/client/home.controller')
const router = express.Router()


router.get('/',controller.index)


module.exports = router;