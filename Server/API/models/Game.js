const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
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
  },
  phase: {
    type: Number,
    min: 1,
    default: 1,
  },
  player_stats: [{ type: mongoose.Schema.Types.ObjectId, ref: "PlayerStats" }],
  gamemode: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("game", GameSchema);
