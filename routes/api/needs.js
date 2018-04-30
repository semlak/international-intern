const router = require('express').Router();
const needsController = require('../../controllers/needsController');

router.route('/')
  .get(needsController.findAll)
  .post(needsController.create);

router.route('/:id')
  .get(needsController.findById)
  .put(needsController.update)
  .delete(needsController.remove);


module.exports = router;

