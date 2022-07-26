const { json } = require("express");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
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

// @route   GET api/abilities/:id
// @desc    Get Ability by ID
// @access  Private
router.get("/:id", checkObjectId("id"), auth, async (req, res) => {
  try {
    const ability = await Ability.findById(req.params.id);

    if (!ability) {
      return res.status(404).json({ msg: "Ability not found" });
    }

    return res.json(ability);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Ability not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/abilities
// @desc    Get all Abilities w/ filters
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

    const filteredAbilities = await Ability.find({
      name: { $regex: ".*" + searchTerm + ".*" },
      is_user_created: isUserMade,
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredAbilities) {
      return res.status(404).json({ msg: "No Abilities found" });
    }

    return res.json(filteredAbilities);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   UPDATE api/abilities/update/:id
// @desc    Update Ability
// @access  Private

router.put("/update/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;
    const ability = await Ability.findById(req.params.id);
    if (!ability) {
      return res.json({ msg: "Could not find Ability" });
    } else {
      validUserDelete = ability.owner_id.toString() === req.user.id;
    }
    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== ability[key]) {
        ability[key] = req.body[key];
      }
    });
    await ability.save();
    return res.json({ msg: "Ability  Updated", ability });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/abilities/:id
// @desc    Delete Ability
// @access  Private

router.delete("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;

    const ability = await Ability.findById(req.params.id);
    if (!ability) {
      return res.json({ msg: "Could not find Ability" });
    } else {
      validUserDelete = ability.owner_id.toString() === req.user.id;
    }

    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await ability.remove();
    return res.json({ msg: "Ability Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
