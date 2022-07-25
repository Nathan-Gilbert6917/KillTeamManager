const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const TacOpsCard = require("../models/TacOpsCard");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/tac_ops_cards
// @desc    Create Tac-Ops Card
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
      const tacOpsCard = new TacOpsCard({
        owner_id: req.user.id,
        name,
        description,
        type,
        is_copy: false,
        is_used: false,
        is_user_created: true,
      });
      await tacOpsCard.save();
      return res.json({ msg: "Tac-Ops Card Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

module.exports = router;
