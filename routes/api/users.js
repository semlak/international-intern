const express = require('express');
const Users = require('../../controllers/usersController.js');

const router = express.Router();

// restrict index for logged in user only

// api route for register action
router.post('/register', Users.doRegister);

// api route for login action
router.post('/login', Users.doLogin);

// api route for logout action
router.get('/logout', Users.logout);

// api rout to get current user
router.get('/getCurrentUser', Users.getCurrentUser);

// api rout to update current user
router.put('/:id', Users.updateUser);

module.exports = router;
