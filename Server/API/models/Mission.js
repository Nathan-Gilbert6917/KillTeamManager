const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mission_number: {
    type: Number,
    min: 1,
    required: true,
  },
  sequence: {
    type: Number,
    min: 1,
    required: true,
  },
  rules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rule",
    },
  ],
  objective: {
    type: String,
  },
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Action",
    },
  ],
  user_created: {
    type: Boolean,
  },
});

module.exports = mongoose.model("mission", MissionSchema);
