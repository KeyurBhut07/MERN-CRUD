const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
});

const UserModel = new mongoose.model("users", userSchema);
module.exports = UserModel;
