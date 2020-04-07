const mongoose = require("mongoose");

const GameStatsSchema = new mongoose.Schema({
  gamesPlayed: Number,
  gamesPlayedEasy: Number,
  gamesPlayedHard: Number,
  users: Number,
  leaderboardEasy: Array,
  leaderboardHard: Array,
  bestGame: String,
  bestClicks: String,
  bestTime: String,
  ratings: Number
});

module.exports = mongoose.model("GameStats", GameStatsSchema);
