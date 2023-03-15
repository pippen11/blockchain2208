const express = require('express')
const router = express.Router()
const userController = require('./user.controller.js')

router.get('/join', userController.join)

module.exports = router;