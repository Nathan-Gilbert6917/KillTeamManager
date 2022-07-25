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

    let {
      name,
      mission_number,
      sequence,
      rules,
      objective,
      missions,
    } = req.body;

    if (!missions) missions = [];
    if (!rules) rules = [];

    try {
      const mission = new Mission({
        owner_id: req.user.id,
        name,
        mission_number,
        sequence,
        rules,
        objective,
        missions,
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

// @route   DELETE api/missions
// @desc    Delete Mission
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const mission = await Mission.findById(req.body.id);
    if (!mission) {
      return res.json({ msg: "Could not find Mission" });
    } else {
      validUserDelete = mission.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Mission.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Mission Not Deleted" });
      } else {
        return res.json({ msg: "Mission Deleted" });
      }
    }
    return res.json({ msg: "Error Mission Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
