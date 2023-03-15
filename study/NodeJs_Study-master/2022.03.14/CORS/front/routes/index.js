const express = require('express')
const router = express.Router()
const boardRouter = require('./board/index')
const { Auth } = require('../middlewares/auth')

router.use('/board',Auth,boardRouter)

module.exports = router