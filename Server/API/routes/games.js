const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Game = require("../models/Game");
const { generateGameCode } = require("../../middleware/gameCodeGenerator");
// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/games
// @desc    Create Game
// @access  Public
router.post(
  "/",
  auth,
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("mission", "Please enter a Mission").not().isEmpty().isMongoId(),
    check("gamemode", "Please enter a Gamemode").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, mission, player_stats, gamemode } = req.body;

    if (!player_stats) player_stats = [];

    // Create Game Code
    const gameCodeLength = 8;

    const code = generateGameCode(gameCodeLength);

    try {
      const game = new Game({
        owner_id: req.user.id,
        name,
        mission,
        code,
        player_stats,
        gamemode,
      });
      await game.save();
      return res.json({ msg: "Game Successfully Created" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   DELETE api/games
// @desc    Delete Game
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const game = await Game.findById(req.body.id);
    if (!game) {
      return res.json({ msg: "Could not find Game" });
    } else {
      validUserDelete = game.owner_id.toString() === req.user.id;
    }

    if (validUserDelete) {
      let result = await Game.findByIdAndDelete(req.body.id);
      if (!result) {
        return res.json({ msg: "Error Game Not Deleted" });
      } else {
        return res.json({ msg: "Game Deleted" });
      }
    }
    return res.json({ msg: "Error Game Not Deleted: Invalid User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
