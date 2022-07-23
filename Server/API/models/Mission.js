const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("mission", MissionSchema);
