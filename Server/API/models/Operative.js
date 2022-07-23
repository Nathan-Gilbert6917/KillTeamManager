const mongoose = require("mongoose");

const OperativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("operative", OperativeSchema);
