const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Team = require("../models/Team");
const checkObjectId = require("../../middleware/checkObjectId");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/teams
// @desc    Create Team
// @access  Public
router.post(
  "/",
  auth,
  [check("name", "Name must be provided").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      name,
      notes,
      operatives,
      faction_keywords,
      selectable_keywords,
    } = req.body;

    if (typeof notes !== "string") notes = "";
    if (!operatives) operatives = [];
    if (!faction_keywords) faction_keywords = [];
    if (!selectable_keywords) selectable_keywords = [];

    try {
      const team = new Team({
        owner_id: req.user.id,
        name,
        notes,
        operatives,
        faction_keywords,
        selectable_keywords,
        is_clone: false,
      });
      await team.save();
      return res.json({ msg: "Team Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   GET api/teams/:id
// @desc    Get Team by ID
// @access  Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ msg: "Team not found" });
    }

    return res.json(team);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Team not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/teams
// @desc    Get all Teams for a user w/ optional filters
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

    const filteredTeams = await Team.find({
      owner_id: req.user.id,
      name: { $regex: ".*" + searchTerm + ".*" },
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredTeams) {
      return res.status(404).json({ msg: "No Teams found" });
    }

    return res.json(filteredTeams);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   UPDATE api/teams/:id
// @desc    Update Team
// @access  Private

router.put("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.json({ msg: "Could not find Team" });
    } else {
      validUserDelete = team.owner_id.toString() === req.user.id;
    }
    if (!validUserDelete) {
      return res.status(401).json({ msg: "Team not authorized" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== team[key]) {
        team[key] = req.body[key];
      }
    });
    await team.save();
    return res.json({ msg: "Team  Updated", team });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/teams/:id
// @desc    Delete Team
// @access  Private

router.delete("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.json({ msg: "Could not find Team" });
    } else {
      validUserDelete = team.owner_id.toString() === req.user.id;
    }

    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await team.remove();
    return res.json({ msg: "Team Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
