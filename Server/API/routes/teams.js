const express = require("express");
const router = express.Router();

// @access types:
// Private Token required
// Public  Non-token

// @route   GET api/teams
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("Teams Route"));

module.exports = router;
