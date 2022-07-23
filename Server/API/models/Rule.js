const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rule", RuleSchema);
