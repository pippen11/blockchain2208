const express = require('express')
const router = express.Router()
const boardController = require('./board.controller.js')

router.get('/list', boardController.list)
router.get('/view/:idx', boardController.view)
router.get('/modify', boardController.modify)
router.get('/write', boardController.write)

module.exports = router