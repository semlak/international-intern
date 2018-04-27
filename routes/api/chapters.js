const router = require("express").Router();
const chaptersController = require("../../controllers/chaptersController");

// Matches with "/api/chapters"
router.route("/")
  .get(chaptersController.findAll)
  .post(chaptersController.create);

// Matches with "/api/chapters/:id"
router
  .route("/:id")
  .get(chaptersController.findById)
  .put(chaptersController.update)
  .delete(chaptersController.remove);

module.exports = router;