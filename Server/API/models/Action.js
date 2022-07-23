const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("action", ActionSchema);
