const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Weapon = require("../models/Weapon");
const checkObjectId = require("../../middleware/checkObjectId");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/weapons
// @desc    Create Weapon
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("attacks", "Attack must be provided").not().isEmpty().isInt(),
    check("skill", "Skill must be provided").not().isEmpty().isInt(),
    check("type", "Type must be provided").not().isEmpty(),
    check("damage", "Damage must be provided").not().isEmpty().isInt(),
    check("critical_damage", "Critical Damage must be provided")
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
      attacks,
      skill,
      damage,
      critical_damage,
      special_rule,
      critical_hit_rule,
      description,
      type,
    } = req.body;

    if (!description) {
      description = "";
    }
    if (!special_rule) {
      special_rule = null;
    }
    if (!critical_hit_rule) {
      critical_hit_rule = null;
    }

    try {
      const weapon = new Weapon({
        owner_id: req.user.id,
        name,
        attacks,
        skill,
        damage,
        critical_damage,
        special_rule,
        critical_hit_rule,
        description,
        type,
        is_user_created: true,
      });
      await weapon.save();
      return res.json({ msg: "Weapon Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   GET api/weapons/:id
// @desc    Get Weapon by ID
// @access  Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const weapon = await Weapon.findById(req.params.id);

    if (!weapon) {
      return res.status(404).json({ msg: "Weapon not found" });
    }

    return res.json(weapon);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Weapon not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/weapons
// @desc    Get all Weapons w/ filters
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

    const filteredWeapons = await Weapon.find({
      name: { $regex: ".*" + searchTerm + ".*" },
      is_user_created: isUserMade,
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredWeapons) {
      return res.status(404).json({ msg: "No Weapons found" });
    }

    return res.json(filteredWeapons);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   UPDATE api/weapons/:id
// @desc    Update Weapon
// @access  Private

router.put("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;
    const weapon = await Weapon.findById(req.params.id);
    if (!weapon) {
      return res.json({ msg: "Could not find Weapon" });
    } else {
      validUserDelete = weapon.owner_id.toString() === req.user.id;
    }
    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== weapon[key]) {
        weapon[key] = req.body[key];
      }
    });
    await weapon.save();
    return res.json({ msg: "Weapon  Updated", weapon });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/weapons/:id
// @desc    Delete Weapon
// @access  Private

router.delete("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;

    const weapon = await Weapon.findById(req.params.id);
    if (!weapon) {
      return res.json({ msg: "Could not find Weapon " });
    } else {
      validUserDelete = weapon.owner_id.toString() === req.user.id;
    }

    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await weapon.remove();
    return res.json({ msg: "Weapon  Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
