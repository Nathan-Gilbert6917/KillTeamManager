const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Ploy = require("../models/Ploy");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/ploy
// @desc    Create Ploy
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("description", "Please enter a description").not().isEmpty(),
    check("command_points", "Command Points must be provided")
      .not()
      .isEmpty()
      .isInt(),
    check("type", "Type must be provided").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, command_points, type } = req.body;

    try {
      const ploy = new Ploy({
        owner_id: req.user.id,
        name,
        description,
        command_points,
        type,
        is_user_created: true,
      });
      await ploy.save();
      return res.json({ msg: "Ploy Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

module.exports = router;
