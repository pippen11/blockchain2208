const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const uploadRouter = require('./uploadRouter');
const subscribeRouter = require('./subscribeRouter');

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/subscribe', subscribeRouter);

module.exports = router;
