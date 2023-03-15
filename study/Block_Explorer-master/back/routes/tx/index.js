const express = require('express');
const txController = require('./txController');
const router = express.Router();

router.get('/info', txController.getInfo);

router.get('/prev', txController.getPrev);

module.exports = router;
