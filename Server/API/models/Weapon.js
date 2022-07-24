const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  attacks: {
    type: Number,
    min: 0,
    required: true,
  },
  skill: {
    type: Number,
    min: 0,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  damage: {
    type: Number,
    min: 0,
    required: true,
  },
  critical_damage: {
    type: Number,
    min: 0,
    required: true,
  },
  special_rule: {
    type: mongoose.Schema.Types.ObjectId,
  },
  critical_hit_rule: {
    type: mongoose.Schema.Types.ObjectId,
  },
  description: {
    type: String,
  },
  is_user_created: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("weapon", WeaponSchema);
