const express = require("express");
const router = express.Router();

// @access types:
// Private Token required
// Public  Non-token

// @route   GET api/player_stats
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("Player Stats Route"));

module.exports = router;
