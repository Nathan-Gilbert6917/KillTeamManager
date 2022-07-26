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
    check("game", "Please enter a Game").not().isEmpty().isMongoId(),
    check("gamemode", "Please enter a Gamemode").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, game, player_stats, gamemode } = req.body;

    if (!player_stats) player_stats = [];

    // Create Game Code
    const gameCodeLength = 8;

    const code = generateGameCode(gameCodeLength);

    try {
      const game = new Game({
        owner_id: req.user.id,
        name,
        game,
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

// @route   GET api/games/:id
// @desc    Get Game by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: "Game not found" });
    }

    return res.json(game);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Game not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   UPDATE api/games/update/:id
// @desc    Update Game
// @access  Private

router.put("/update/:id", auth, async (req, res) => {
  try {
    let validUserDelete = false;
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.json({ msg: "Could not find Game" });
    } else {
      validUserDelete = game.owner_id.toString() === req.user.id;
    }
    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== game[key]) {
        game[key] = req.body[key];
      }
    });
    await game.save();
    return res.json({ msg: "Game  Updated", game });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// @route   DELETE api/games/:id
// @desc    Delete Game
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let validUserDelete = false;

    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.json({ msg: "Could not find Game" });
    } else {
      validUserDelete = game.owner_id.toString() === req.user.id;
    }

    if (!validUserDelete) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await game.remove();
    return res.json({ msg: "Game Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
