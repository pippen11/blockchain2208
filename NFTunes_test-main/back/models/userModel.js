const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  account: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: false, default: 'http://localhost:4000/upload/user.png' },
  subscribeStartTimestamp: { type: String, required: false },
  subscribeEndTimestamp: { type: String, required: false },
  subscribeState: { type: Boolean, required: false, default: false },
});

// 스키마 등록
const User = mongoose.model('User', userSchema);

module.exports = User;
