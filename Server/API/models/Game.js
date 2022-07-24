const mongoose = require("mongoose");
const PlayerStatsSchema = require("./PlayerStats");

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  mission: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  round: {
    type: Number,
    min: 1,
    default: 1,
    required: true,
  },
  phase: {
    type: Number,
    min: 1,
    default: 1,
    required: true,
  },
  player_stats: [{ type: PlayerStatsSchema, default: {} }],
  gamemode: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("game", GameSchema);
