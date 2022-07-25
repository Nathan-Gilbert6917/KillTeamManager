const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Mission = require("../models/Mission");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/Missions
// @desc    Create Mission
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("mission_number", "Please enter a Mission Number")
      .not()
      .isEmpty()
      .isInt(),
    check("sequence", "Please enter a Mission Sequence")
      .not()
      .isEmpty()
      .isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      mission_number,
      sequence,
      rules,
      objective,
      actions,
    } = req.body;

    if (!actions) actions = [];
    if (!rules) rules = [];

    try {
      const mission = new Mission({
        owner_id: req.user.id,
        name,
        mission_number,
        sequence,
        rules,
        objective,
        actions,
        is_user_created: true,
      });
      await mission.save();
      return res.json({ msg: "Mission Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

module.exports = router;
