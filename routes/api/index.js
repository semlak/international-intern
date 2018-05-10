const router = require('express').Router();
// const bookRoutes = require('./books');
const userRoutes = require('./users');
const needRoutes = require('./needs');
const expenseRoutes = require('./expense');
const chapterRoutes = require('./chapters');
const countryRoutes = require('./country');
const exchangerateRoutes = require('./exchangeRates');
const userController = require('../../controllers/usersController');
// Book routes
// router.use('/books', bookRoutes);

// User API routes
router.use('/users', userRoutes);

router.use('/needs', userController.isLoggedIn, needRoutes);
router.use('/expenses', userController.isLoggedIn, expenseRoutes);
router.use('/chapters', userController.isLoggedIn, chapterRoutes);
router.use('/countries', countryRoutes);
router.use('/exchangerates', userController.isLoggedIn, exchangerateRoutes);

module.exports = router;
