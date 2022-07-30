const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const TacOpsCard = require("../models/TacOpsCard");
const checkObjectId = require("../../middleware/checkObjectId");

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

// @route   GET api/tac_ops_cards/:id
// @desc    Get TacOpsCard by ID
// @access  Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const tacopscard = await TacOpsCard.findById(req.params.id);

    if (!tacopscard) {
      return res.status(404).json({ msg: "TacOpsCard not found" });
    }

    return res.json(tacopscard);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "TacOpsCard not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/tac_ops_cards
// @desc    Get all TacOpsCard w/ filters
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

    const filteredTacOpsCards = await TacOpsCard.find({
      name: { $regex: ".*" + searchTerm + ".*" },
      is_user_created: isUserMade,
    })
      .sort({
        name: sort,
      })
      .limit(limit);

    if (!filteredTacOpsCards) {
      return res.status(404).json({ msg: "No TacOpsCards found" });
    }

    return res.json(filteredTacOpsCards);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   UPDATE api/tac_ops_cards/:id
// @desc    Update TacOpsCard
// @access  Private

router.put("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;
    const tacOpsCard = await TacOpsCard.findById(req.params.id);
    if (!tacOpsCard) {
      return res.json({ msg: "Could not find TacOpsCard" });
    } else {
      validUserDelete = tacOpsCard.owner_id.toString() === req.user.id;
    }
    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== tacOpsCard[key]) {
        tacOpsCard[key] = req.body[key];
      }
    });
    await tacOpsCard.save();
    return res.json({ msg: "TacOpsCard  Updated", tacOpsCard });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/tac_ops_cards/:id
// @desc    Delete Tac_ops_card
// @access  Private

router.delete("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    let validUserDelete = false;

    const tacOpsCard = await TacOpsCard.findById(req.params.id);
    if (!tacOpsCard) {
      return res.json({ msg: "Could not find TacOpsCard" });
    } else {
      validUserDelete = tacOpsCard.owner_id.toString() === req.user.id;
    }

    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await tacOpsCard.remove();
    return res.json({ msg: "TacOpsCard Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
