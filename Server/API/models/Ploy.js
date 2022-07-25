const mongoose = require("mongoose");

const PloySchema = new mongoose.Schema({
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
  command_points: {
    type: Number,
    min: 0,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  is_user_created: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("ploy", PloySchema);
