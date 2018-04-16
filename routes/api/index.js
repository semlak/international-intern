const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users")

// Book routes
router.use("/books", bookRoutes);

// User API routes
router.use("/users", userRoutes);

module.exports = router;
