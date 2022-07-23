const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("weapon", WeaponSchema);
