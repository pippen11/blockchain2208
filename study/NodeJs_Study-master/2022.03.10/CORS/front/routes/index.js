const express = require('express')
const router = express.Router()
const boardRouter = require('./board/index.js')
const { Auth } = require('../middlewares/auth.js')

router.use('/board', Auth, boardRouter)


module.exports = router