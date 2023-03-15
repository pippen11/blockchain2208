const express = require('express');
const searchController = require('./searchController');
const router = express.Router();

router.post('/block', searchController.block);

router.post('/address', searchController.address);

router.post('/txHash', searchController.txHash);

module.exports = router;
