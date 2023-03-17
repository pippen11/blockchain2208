const express = require('express');
const router = express.Router();
const {
  subscribeTx,
  subscribeState,
  subscribeRefundTx,
  subscribeCancelState,
} = require('../controllers/subscribeController');

router.post('/subscribeTx', subscribeTx);
router.post('/subscribeState', subscribeState);
router.post('/subscribeRefundTx', subscribeRefundTx);
router.post('/subscribeCancelState', subscribeCancelState);

module.exports = router;
