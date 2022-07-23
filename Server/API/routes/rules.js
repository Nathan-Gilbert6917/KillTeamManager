const express = require("express");
const router = express.Router();

// @access types:
// Private Token required
// Public  Non-token

// @route   GET api/rules
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("Rules Route"));

module.exports = router;
