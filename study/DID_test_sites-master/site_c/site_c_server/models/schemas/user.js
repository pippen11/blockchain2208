const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    userCode: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      required: false,
      default: "",
    },
    userPw: {
      type: String,
      required: false,
      default: "",
    },
    point: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = UserSchema;
