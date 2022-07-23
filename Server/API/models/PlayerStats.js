const mongoose = require("mongoose");

const PlayerStatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("player_stat", PlayerStatsSchema);
