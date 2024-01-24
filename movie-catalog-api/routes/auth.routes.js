const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User.model");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email es required" });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already in use. Use another Email" });
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    User.create({
      email,
      password: hashPass,
    })
      .then((newUser) => {
        req.login(newUser, (err) => {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json(newUser);
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!theUser) {
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log('test hola')
      return res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout();
  return res.status(200).json({ message: "Logout success" });
});

router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({ message: "Forbbiden" });
  }
});

module.exports = router;
