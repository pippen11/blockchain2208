const express = require('express');
const blockRouter = require('./block');
const txRouter = require('./tx');
const searchRouter = require('./search');

const router = express.Router();

router.use('/blocks', blockRouter);

router.use('/tx', txRouter);

router.use('/search', searchRouter);

module.exports = router;
