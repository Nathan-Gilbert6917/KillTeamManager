const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  operatives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operative",
    },
  ],
  faction_keywords: [
    {
      type: String,
      ref: "Faction_keyword",
    },
  ],
  selectable_keywords: [
    {
      type: String,
      ref: "Selectable_keyword",
    },
  ],
  is_clone: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("team", TeamSchema);
