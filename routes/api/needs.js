const router = require("express").Router();
const needsController = require("../../controllers/needsController")
const isAuthenticated = require("../../controllers/usersController").isAuthenticated;




router.route("/", isAuthenticated)
	.get(needsController.findAll)
	.post(needsController.create);

router.route("/:id", isAuthenticated)
	.get(needsController.findById)
	.put(needsController.update)
	.delete(needsController.remove);


module.exports = router;

