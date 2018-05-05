const router = require('express').Router();
const countryController = require('../../controllers/countryController');

// Matches with '/api/chapters'
//

router.route('/')
  .get(countryController.getCountryData);

module.exports = router;
