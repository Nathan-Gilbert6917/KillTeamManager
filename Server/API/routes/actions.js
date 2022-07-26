const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Action = require("../models/Action");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/actions
// @desc    Create Action
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("description", "Please enter a description").not().isEmpty(),
    check("type", "Type must be provided").not().isEmpty(),
    check("action_points", "Action points must be provided")
      .not()
      .isEmpty()
      .isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, type, action_points } = req.body;

    try {
      const action = new Action({
        owner_id: req.user.id,
        name,
        description,
        type,
        action_points,
        is_user_created: true,
      });
      await action.save();
      return res.json({ msg: "Action Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   GET api/action/:id
// @desc    Get Action by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);

    if (!action) {
      return res.status(404).json({ msg: "Action not found" });
    }

    return res.json(action);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Action not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/actions
// @desc    Get all Actions w/ filters
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

    const filteredActions = await Action.find({
      name: { $regex: ".*" + searchTerm + ".*" },
      is_user_created: isUserMade,
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredActions) {
      return res.status(404).json({ msg: "No Actions found" });
    }

    return res.json(filteredActions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/actions
// @desc    Delete Action
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const action = await Action.findById(req.body.id);
    if (!action) {
      return res.json({ msg: "Could not find Action" });
    } else {
      validUserDelete = action.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Action.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Action Not Deleted" });
      } else {
        return res.json({ msg: "Action Deleted" });
      }
    }
    return res.json({ msg: "Error Action Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
