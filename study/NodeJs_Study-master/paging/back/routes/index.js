const express = require('express');
const router = express.Router();
const boardRouter = require('./board/index.js')


router.use('/api/board', boardRouter);

module.exports = router;