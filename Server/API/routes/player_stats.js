const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const PlayerStats = require("../models/PlayerStats");
const Game = require("../models/Game");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/player_stats
// @desc    Create PlayerStats
// @access  Public
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { tac_ops_cards } = req.body;

  if (!tac_ops_cards) {
    tac_ops_cards = [];
  }

  try {
    const playerStats = new PlayerStats({
      player_id: req.user.id,
      tac_ops_cards,
    });
    await playerStats.save();
    return res.json({ msg: "PlayerStats Successfully Created" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/player_stats/:id
// @desc    Get Player Stats by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const playerstats = await PlayerStats.findById(req.params.id);

    if (!playerstats) {
      return res.status(404).json({ msg: "PlayerStats not found" });
    }

    return res.json(playerstats);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "PlayerStats not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/player_stats/player/:id/
// @desc    Get Player Stats by ID
// @access  Private
router.get("/player/:id", auth, async (req, res) => {
  try {
    const playerstats = await PlayerStats.findOne({ player_id: req.params.id });

    if (!playerstats) {
      return res.status(404).json({ msg: "PlayerStats not found" });
    }

    return res.json(playerstats);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "PlayerStats not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   GET api/playerstats/game/:id
// @desc    Get PlayerStats From Game
// @access  Private
router.get("/game/:id", auth, async (req, res) => {
  try {
    const gamePlayerStats = await Game.findById(req.params.id).select(
      "-code -mission -round -phase -gamemode -is_active"
    );

    if (!gamePlayerStats) {
      return res.status(404).json({ msg: "No PlayerStats found" });
    }

    return res.json(gamePlayerStats.player_stats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/player_stats
// @desc    Delete Player Stats
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const playerStats = await PlayerStats.findById(req.body.id);
    if (!playerStats) {
      return res.json({ msg: "Could not find Player Stats" });
    } else {
      validUserDelete = playerStats.player_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await PlayerStats.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Player Stats Not Deleted" });
      } else {
        return res.json({ msg: "Player Stats Deleted" });
      }
    }
    return res.json({ msg: "Error Player Stats Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
