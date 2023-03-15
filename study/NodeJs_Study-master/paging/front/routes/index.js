const express = require('express')
const router = express.Router()
const boardRouter = require('./board/index.js')

router.use('/board', boardRouter)

module.exports = router;