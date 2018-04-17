const express = require('express');
const router = express.Router();
const Users = require("../../controllers/usersController.js");

// restrict index for logged in user only

// api route for register action
router.post('/register', Users.doRegister);

// api route for login action
router.post('/login', Users.doLogin);

// api route for logout action
router.get('/logout', Users.logout);

// api rout to get current user
router.get('/getCurrentUser', Users.getCurrentUser);

module.exports = router;
