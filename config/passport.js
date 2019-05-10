const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const bcrypt = require("bcrypt-nodejs");
//const JwtStrategy = require ("passport-jwt").Strategy;
const ExtractJwt = require ("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const db = require("../models");
const keys = require ("./keys");

const opts = {};

// Telling passport we want to login with a username/username and password
passport.use(new LocalStrategy(
  // Our user will sign in using an username, rather than a "username"
  {
    usernameField: "username"
  },
  function(username, password, done) {
    // When a user tries to sign in this code runs
    db.Dog.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {
      // If there's no user with the given username
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      // If there is a user with the given username, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;