const mongoose = require('mongoose');

const coverSchema = mongoose.Schema({
  filename: { type: String, required: true },
  id: { type: String, required: true },
  cover_url: { type: String, required: true },
});

// 스키마 등록
const Cover = mongoose.model('Cover', coverSchema);

module.exports = Cover;
