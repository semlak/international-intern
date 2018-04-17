const router = require("express").Router();
const needsController = require("../../controllers/needsController")

let isAuthenticated = (req, res, next) => {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  console.log("req.user", req.user);
  if (req.user && req.user.authenticated)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.json({user: null});
}



router.get("/", isAuthenticated, needsController.findAll);

// router.route("/")
// 	.get(needsController.findAll)
// 	.post(needsController.create);

router.route("/:id")
	.get(needsController.findById)
	.put(needsController.update)
	.delete(needsController.remove);


module.exports = router;

