const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      allownull: false,
    },
    email: {
      type: String,
      require: true,
      allownull: false,
      unique: true,
    },
    number: {
      type: String,
      required: true,
      allownull: false,
    },
    password: {
      type: String,
      require: true,
      allownull: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
