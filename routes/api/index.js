const router = require("express").Router();
// const bookRoutes = require("./books");
const userRoutes = require("./users");
const needRoutes = require("./needs");

// Book routes
// router.use("/books", bookRoutes);

// User API routes
router.use("/users", userRoutes);

router.use("/needs", needRoutes)

module.exports = router;
