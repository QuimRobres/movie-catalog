const passport = require("passport");
const User = require("../models/User.model");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  // Add id of user to session
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  // Identifies the user of the session
  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then((user) => cb(null, user))
      .catch((error) => cb(error));
  });

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      (req, email, password, next) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return next(null, false, {
                message: "Email or password incorrect",
              });
            }
            if (bcrypt.compareSync(password, user.password)) {
              return next(null, user);
            } else {
              return next(null, false, {
                message: "Email or password incorrect",
              });
            }
          })
          .catch((err) => console.error(err));
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
