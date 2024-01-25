const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User.model");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use. Use another email" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    req.login(newUser, (err) => {
      if (err) {
        throw err;
      }
      res.status(200).json(newUser);
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", (err, theUser, failureDetails) => {
      if (err) {
        throw err;
      }
      if (!theUser) {
        return res.status(401).json(failureDetails);
      }

      req.login(theUser, (err) => {
        if (err) {
          throw err;
        }
        res.status(200).json(theUser);
      });
    })(req, res, next);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});


router.post("/logout", async (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        throw err;
      }
      res.status(200).json({ message: "Success" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});


module.exports = router;
