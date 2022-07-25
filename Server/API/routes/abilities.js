const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Ability = require("../models/Ability");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/abilities
// @desc    Create Ability
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("description", "Please enter a description").not().isEmpty(),
    check("type", "Type must be provided").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, type } = req.body;

    try {
      const ability = new Ability({
        owner_id: req.user.id,
        name,
        description,
        type,
        is_user_created: true,
      });
      await ability.save();
      return res.json({ msg: "Ability Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   DELETE api/abilities
// @desc    Delete Ability
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const ability = await Ability.findById(req.body.id);
    if (!ability) {
      return res.json({ msg: "Could not find Ability" });
    } else {
      validUserDelete = ability.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Ability.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Ability Not Deleted" });
      } else {
        return res.json({ msg: "Ability Deleted" });
      }
    }
    return res.json({ msg: "Error Ability Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
