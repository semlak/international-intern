const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");

// Post registration
const userController = {
  doRegister(req, res) {
    console.log("hey, requeived registration request", req.body)
    User.register(new User({ username: req.body.username, email: req.body.email, fullname: req.body.fullname, homeLocation: req.body.homeLocation, internLocation: req.body.internLocation }), req.body.password, (err, user) => {
      if (err) {
      // return res.render('register', { user : user });
      console.log("had error", err)
        return res.json(err)
      }
    console.log("registered user", user )

      passport.authenticate('local')(req, res, () => {
        // res.redirect('/');
        res.json({user: user})
      });
    });
  },

  // Post login
  doLogin (req, res) {
    passport.authenticate('local')(req, res, () => {
    // res.redirect('/');
    res.json({user: req.user})
    });
  },

  // logout
  logout (req, res) {
    req.logout();
    res.json({user: null})
  },
  getCurrentUser (req, res) {
    if (req.isAuthorized && req.isAuthorized()) {
    // if (req.user && req.user._id) {
      res.json({user: req.user})
    }
    else {
      res.json({user: null})
    }
  }
}


module.exports = userController;
