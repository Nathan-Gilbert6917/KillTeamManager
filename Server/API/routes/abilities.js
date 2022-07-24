const express = require("express");
const router = express.Router();

// @access types:
// Private Token required
// Public  Non-token

// @route   GET api/abilities
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("Abilities Route"));

module.exports = router;
