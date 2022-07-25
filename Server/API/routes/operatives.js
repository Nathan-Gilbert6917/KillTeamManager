const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Operative = require("../models/Operative");
const auth = require("../../middleware/auth");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/operatives
// @desc    Create Operative
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("action_point_limit", "Please enter Action Point Limit")
      .not()
      .isEmpty()
      .isInt(),
    check("group_activation", "Please enter Group Activation")
      .not()
      .isEmpty()
      .isInt(),
    check("saves", "Please enter Saves").not().isEmpty().isInt(),
    check("defense", "Please enter Defense").not().isEmpty().isInt(),
    check("wounds", "Please enter Wounds").not().isEmpty().isInt(),
    check("movement", "Please enter Movement").not().isEmpty().isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      name,
      action_point_limit,
      group_activation,
      saves,
      defense,
      wounds,
      movement,
      team_id,
      actions,
      abilities,
      weapons,
    } = req.body;

    if (!team_id) {
      team_id = null;
    }

    if (!actions) {
      actions = [];
    }

    if (!abilities) {
      abilities = [];
    }

    if (!weapons) {
      weapons = [];
    }

    try {
      const operative = new Operative({
        name,
        owner_id: req.user.id,
        team_id,
        action_point_limit,
        group_activation,
        saves,
        defense,
        wounds,
        movement,
        base_action_point_limit: action_point_limit,
        base_group_activation: group_activation,
        base_saves: saves,
        base_defense: defense,
        base_wounds: wounds,
        base_movement: movement,
        actions,
        abilities,
        weapons,
      });
      await operative.save();
      return res.json({ msg: "Operative Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   DELETE api/operatives
// @desc    Delete Operative
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const operative = await Operative.findById(req.body.id);
    if (!operative) {
      return res.json({ msg: "Could not find Operative" });
    } else {
      validUserDelete = operative.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Operative.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Operative Not Deleted" });
      } else {
        return res.json({ msg: "Operative Deleted" });
      }
    }
    return res.json({ msg: "Error Operative Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
