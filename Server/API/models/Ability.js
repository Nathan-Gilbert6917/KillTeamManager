const mongoose = require("mongoose");

const AbilitySchema = new mongoose.Schema({
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
  is_user_created: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("ability", AbilitySchema);
