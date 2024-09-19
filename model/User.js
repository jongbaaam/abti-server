const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: /[\w\-\.]+\@[\w\-\.]+/g,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
