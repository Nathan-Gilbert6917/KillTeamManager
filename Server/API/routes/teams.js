const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Team = require("../models/Team");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/teams
// @desc    Create Team
// @access  Public
router.post(
  "/",
  auth,
  [check("name", "Name must be provided").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      name,
      notes,
      operatives,
      faction_keywords,
      selectable_keywords,
    } = req.body;

    if (typeof notes !== "string") notes = "";
    if (!operatives) operatives = [];
    if (!faction_keywords) faction_keywords = [];
    if (!selectable_keywords) selectable_keywords = [];

    try {
      const team = new Team({
        owner_id: req.user.id,
        name,
        notes,
        operatives,
        faction_keywords,
        selectable_keywords,
        is_clone: false,
      });
      await team.save();
      return res.json({ msg: "Team Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

module.exports = router;
