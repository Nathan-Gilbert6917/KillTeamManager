const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const User = require("../models/User");

// @access types:
// Private Token required
// Public  Non-token

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("username", "Username must be provided").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
    check("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({ username, email, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpiration") },

        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);

// @route   GET api/users/:id
// @desc    Get Users by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
