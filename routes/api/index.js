const router = require("express").Router();
// const bookRoutes = require("./books");
const userRoutes = require("./users");
const needRoutes = require("./needs");
const expenseRoutes = require("./expense");
// Book routes
// router.use("/books", bookRoutes);

// User API routes
router.use("/users", userRoutes);

router.use("/needs", needRoutes);
router.use("/expenses", expenseRoutes)

module.exports = router;
