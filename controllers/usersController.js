const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");

const userController = {};

// Restrict access to root page
// userController.home = function(req, res) {
//   res.render('index', { user : req.user });
// };

// Go to registration page
// userController.register = function(req, res) {
//   res.render('register');
// };

// Post registration
userController.doRegister = (req, res) => {
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
};

// Go to login page
// userController.login = function(req, res) {
//   res.render('login');

// };

// Post login
userController.doLogin = (req, res) => {
  passport.authenticate('local')(req, res, () => {
	// res.redirect('/');
	res.json({user: req.user})
  });
};

// logout
userController.logout = (req, res) => {
//   req.logout();
//   res.redirect('/');
	req.logout();
	res.json({user: null})
};

userController.getCurrentUser = (req, res) => {
	res.json({user: req.user})
}

module.exports = userController;
