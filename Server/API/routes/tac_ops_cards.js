const express = require("express");
const router = express.Router();

// @access types:
// Private Token required
// Public  Non-token

// @route   GET api/tac_ops_cards
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("tac_ops_cards Route"));

module.exports = router;
