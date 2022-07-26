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

// @route   GET api/ploys/:id
// @desc    Get Ploy by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const ploy = await Ploy.findById(req.params.id);

    if (!ploy) {
      return res.status(404).json({ msg: "Ploy not found" });
    }

    return res.json(ploy);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Ploy not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/ploys
// @desc    Get all Ploy w/ filters
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

    const filteredPloys = await Ploy.find({
      name: { $regex: ".*" + searchTerm + ".*" },
      is_user_created: isUserMade,
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredPloys) {
      return res.status(404).json({ msg: "No Ploys found" });
    }

    return res.json(filteredPloys);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/ploys
// @desc    Delete Ploy
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const ploy = await Ploy.findById(req.body.id);
    if (!ploy) {
      return res.json({ msg: "Could not find Ploy" });
    } else {
      validUserDelete = ploy.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Ploy.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Ploy Not Deleted" });
      } else {
        return res.json({ msg: "Ploy Deleted" });
      }
    }
    return res.json({ msg: "Error Ploy Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
