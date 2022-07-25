const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  action_points: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  is_user_created: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("action", ActionSchema);
