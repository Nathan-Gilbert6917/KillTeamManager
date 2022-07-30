const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../../middleware/checkObjectId");
const Mission = require("../models/Mission");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/Missions
// @desc    Create Mission
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("mission_number", "Please enter a Mission Number")
      .not()
      .isEmpty()
      .isInt(),
    check("sequence", "Please enter a Mission Sequence")
      .not()
      .isEmpty()
      .isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      name,
      mission_number,
      sequence,
      rules,
      objective,
      missions,
    } = req.body;

    if (!missions) missions = [];
    if (!rules) rules = [];

    try {
      const mission = new Mission({
        owner_id: req.user.id,
        name,
        mission_number,
        sequence,
        rules,
        objective,
        missions,
        is_user_created: true,
      });
      await mission.save();
      return res.json({ msg: "Mission Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   GET api/missions/:id
// @desc    Get Mission by ID
// @access  Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ msg: "Mission not found" });
    }

    return res.json(mission);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Mission not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/missions
// @desc    Get all Mission w/ filters
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

    const filteredMissions = await Mission.find({
      name: { $regex: ".*" + searchTerm + ".*" },
      is_user_created: isUserMade,
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredMissions) {
      return res.status(404).json({ msg: "No Missions found" });
    }

    return res.json(filteredMissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   UPDATE api/missions/:id
// @desc    Update Mission
// @access  Private

router.put("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.json({ msg: "Could not find Mission" });
    } else {
      validUserDelete = mission.owner_id.toString() === req.user.id;
    }
    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== mission[key]) {
        mission[key] = req.body[key];
      }
    });
    await mission.save();
    return res.json({ msg: "Mission  Updated", mission });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/missions/:id
// @desc    Delete Mission
// @access  Private

router.delete("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;

    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.json({ msg: "Could not find Mission" });
    } else {
      validUserDelete = mission.owner_id.toString() === req.user.id;
    }

    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await mission.remove();
    return res.json({ msg: "Mission Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
