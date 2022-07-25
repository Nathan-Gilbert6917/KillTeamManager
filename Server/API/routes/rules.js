const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Rule = require("../models/Rule");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/rules
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
      const rule = new Rule({
        owner_id: req.user.id,
        name,
        description,
        type,
        is_user_created: true,
      });
      await rule.save();
      return res.json({ msg: "Rule Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   DELETE api/rules
// @desc    Delete Rule
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const rule = await Rule.findById(req.body.id);
    if (!rule) {
      return res.json({ msg: "Could not find Rule" });
    } else {
      validUserDelete = rule.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Rule.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Rule Not Deleted" });
      } else {
        return res.json({ msg: "Rule Deleted" });
      }
    }
    return res.json({ msg: "Error Rule Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
