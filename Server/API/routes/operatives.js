const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Operative = require("../models/Operative");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

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

// @route   GET api/operatives/:id
// @desc    Get Operatives by ID
// @access  Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const operative = await Operative.findById(req.params.id);

    if (!operative) {
      return res.status(404).json({ msg: "Operative not found" });
    }

    return res.json(operative);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Operative not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/operatives
// @desc    Get all Operatives w/ filters
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let searchTerm = "";
    let sort = 1;
    let limit = null;

    const filters = req.body.filters;
    if (filters) {
      if (filters.search_term) searchTerm = req.body.filters.search_term;
      if (filters.sort) sort = req.body.filters.sort;
      if (filters.limit) limit = req.body.filters.limit;
    }

    const filteredOperatives = await Operative.find({
      owner_id: req.user.id,
      name: { $regex: ".*" + searchTerm + ".*" },
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredOperatives) {
      return res.status(404).json({ msg: "No Operatives found" });
    }

    return res.json(filteredOperatives);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   UPDATE api/operatives/update/:id
// @desc    Update Operative
// @access  Private

router.put("/update/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;
    const operative = await Operative.findById(req.params.id);
    if (!operative) {
      return res.json({ msg: "Could not find Operative" });
    } else {
      validUserDelete = operative.owner_id.toString() === req.user.id;
    }
    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== operative[key]) {
        operative[key] = req.body[key];
      }
    });
    await operative.save();
    return res.json({ msg: "Operative  Updated", operative });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/operatives/:id
// @desc    Delete Operative
// @access  Private

router.delete("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;

    const operative = await Operative.findById(req.params.id);
    if (!operative) {
      return res.json({ msg: "Could not find Operative" });
    } else {
      validUserDelete = operative.owner_id.toString() === req.user.id;
    }

    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await operative.remove();
    return res.json({ msg: "Operative Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
