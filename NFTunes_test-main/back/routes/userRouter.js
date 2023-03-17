const express = require('express');
const router = express.Router();
const {
  join,
  login,
  quit,
  editUserInfo,
  getAllUserNick,
  getAllUserInfo,
  userDetails,
} = require('../controllers/userController');

router.post('/join', join);
router.post('/login', login);
router.delete('/quit/:account', quit);
router.patch('/editUser/:account', editUserInfo);
router.get('/getAllUserNick', getAllUserNick);
router.post('/getAllUserInfo', getAllUserInfo);
router.get('/details/:acct', userDetails);

module.exports = router;
