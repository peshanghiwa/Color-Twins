const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  EasyMode: {
    clicks: Number,
    finishedTime: Number,
    fullReport: Number,
    gameDate: String
  },
  HardMode: {
    clicks: Number,
    finishedTime: Number,
    fullReport: Number,
    gameDate: String
  },
  // clicks: Number,
  // finishedTime: Number,
  rating: Number
});

const userData = mongoose.model("userData", userSchema);

module.exports = userData;
