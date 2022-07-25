const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Weapon = require("../models/Weapon");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/weapons
// @desc    Create Weapon
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("attacks", "Attack must be provided").not().isEmpty().isInt(),
    check("skill", "Skill must be provided").not().isEmpty().isInt(),
    check("type", "Type must be provided").not().isEmpty(),
    check("damage", "Damage must be provided").not().isEmpty().isInt(),
    check("critical_damage", "Critical Damage must be provided")
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
      attacks,
      skill,
      damage,
      critical_damage,
      special_rule,
      critical_hit_rule,
      description,
      type,
    } = req.body;

    if (!description) {
      description = "";
    }
    if (!special_rule) {
      special_rule = null;
    }
    if (!critical_hit_rule) {
      critical_hit_rule = null;
    }

    try {
      const weapon = new Weapon({
        owner_id: req.user.id,
        name,
        attacks,
        skill,
        damage,
        critical_damage,
        special_rule,
        critical_hit_rule,
        description,
        type,
        is_user_created: true,
      });
      await weapon.save();
      return res.json({ msg: "Weapon Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   DELETE api/weapons
// @desc    Delete Weapon
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const weapon = await Weapon.findById(req.body.id);
    if (!weapon) {
      return res.json({ msg: "Could not find Weapon" });
    } else {
      validUserDelete = weapon.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Weapon.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Weapon Not Deleted" });
      } else {
        return res.json({ msg: "Weapon Deleted" });
      }
    }
    return res.json({ msg: "Error Weapon Not Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
