const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')

router.get('/', (req, res)=>{
    res.render('./index.html')
})

router.use('/user', userRouter)

module.exports = router;