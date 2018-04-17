const express = require('express');
const router = express.Router();
const Users = require("../../controllers/usersController.js");

// restrict index for logged in user only
// router.get('/', Users.home);

let isAuthenticated = (req, res, next) => {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user.authenticated)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.json({user: null});
}




// api route for register action
router.post('/register', Users.doRegister);

// api route for login action
router.post('/login', Users.doLogin);

// api route for logout action
router.get('/logout', Users.logout);

// api rout to get current user
router.get('/getCurrentUser', Users.getCurrentUser);

module.exports = router;
