const router = require('express').Router();
const exchangerateController = require('../../controllers/exchangerateController');

// Matches with '/api/chapters'
//

router.route('/')
  .get(exchangerateController.forwardCurrencyRequest);

module.exports = router;
