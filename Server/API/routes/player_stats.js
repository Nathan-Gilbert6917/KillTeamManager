const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const PlayerStats = require("../models/PlayerStats");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/player_stats
// @desc    Create PlayerStats
// @access  Public
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { tac_ops_cards } = req.body;

  if (!tac_ops_cards) {
    tac_ops_cards = [];
  }

  try {
    const playerStats = new PlayerStats({
      player_id: req.user.id,
      tac_ops_cards,
    });
    await playerStats.save();
    return res.json({ msg: "PlayerStats Successfully Created" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
