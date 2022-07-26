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

// @route   GET api/rules/:id
// @desc    Get Rule by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({ msg: "Rule not found" });
    }

    return res.json(rule);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Rule not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/rules
// @desc    Get all Rule w/ filters
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let searchTerm = "";
    let sort = 1;
    let limit = null;
    let isUserMade = false;

    const filters = req.body.filters;
    if (filters) {
      if (filters.search_term) searchTerm = req.body.filters.search_term;
      if (filters.sort) sort = req.body.filters.sort;
      if (filters.limit) limit = req.body.filters.limit;
      if (filters.user_made) isUserMade = req.body.filters.user_made;
    }

    const filteredRules = await Rule.find({
      name: { $regex: ".*" + searchTerm + ".*" },
      is_user_created: isUserMade,
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredRules) {
      return res.status(404).json({ msg: "No Rules found" });
    }

    return res.json(filteredRules);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

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
