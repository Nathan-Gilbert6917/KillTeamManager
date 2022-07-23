const mongoose = require("mongoose");

const TacOpsCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tac_ops_card", TacOpsCardSchema);
