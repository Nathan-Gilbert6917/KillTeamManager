const mongoose = require("mongoose");

const PlayerStatsSchema = new mongoose.Schema({
  player_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  victory_points: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  command_points: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  is_ready: {
    type: Boolean,
    default: false,
    required: true,
  },
  is_winner: {
    type: Boolean,
    default: false,
    required: true,
  },
  tac_ops_cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tac_ops_card",
    },
  ],
});

module.exports = mongoose.model("player_stat", PlayerStatsSchema);
