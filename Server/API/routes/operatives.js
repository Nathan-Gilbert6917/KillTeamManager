const express = require("express");
const router = express.Router();

// @access types:
// Private Token required
// Public  Non-token

// @route   GET api/operatives
// @desc    Test Route
// @access  Public
router.get("/", (req, res) => res.send("Operatives Route"));

module.exports = router;
