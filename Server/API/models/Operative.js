const mongoose = require("mongoose");

const OperativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  action_point_limit: {
    type: Number,
    required: true,
  },
  group_activation: {
    type: Number,
    required: true,
  },
  saves: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  wounds: {
    type: Number,
    required: true,
  },
  movement: {
    type: Number,
    required: true,
  },
  base_action_point_limit: {
    type: Number,
    required: true,
  },
  base_group_activation: {
    type: Number,
    required: true,
  },
  base_saves: {
    type: Number,
    required: true,
  },
  base_defense: {
    type: Number,
    required: true,
  },
  base_wounds: {
    type: Number,
    required: true,
  },
  base_movement: {
    type: Number,
    required: true,
  },
  is_incapacitated: {
    type: Boolean,
    default: false,
    required: true,
  },
  is_slain: {
    type: Boolean,
    default: false,
    required: true,
  },
  is_clone: {
    type: Boolean,
    default: false,
    required: true,
  },

  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Action",
    },
  ],
  abilities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ability",
    },
  ],
  weapons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Weapon",
    },
  ],
});

module.exports = mongoose.model("operative", OperativeSchema);
