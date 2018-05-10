const axios = require('axios');
require('dotenv').config();

console.log('apikey', process.env.REACT_APP_CURRENCYLAYER_API_KEY);

const getExchangeRate = (fromCurrency, toCurrency) => {
  const API_KEY = process.env.REACT_APP_CURRENCYLAYER_API_KEY;
  const queryURL = `http://apilayer.net/api/live?access_key=${API_KEY}&source=${fromCurrency}&currencies=${toCurrency}&format=1`;
  // console.log('currency query:', queryURL);

  // return axios.get(queryURL).then((json) => json);
  return axios.get(queryURL).then((json) => {
    // console.log('currency:', json.data);
    const quoteCode = `${fromCurrency}${toCurrency}`;
    if (!json || !json.data || !json.data.quotes || !json.data.quotes[quoteCode]) {
      console.error('Error in retrieved currency exchange rate quote data.');
      return ({ error: true, message: 'Error in retrieved currence exchange rate quote data.' });
    }
    return ({
      quote: json.data.quotes[quoteCode],
      fromCurrency,
      toCurrency,
      otherQuoteData: json.data.quotes
    });
  }).catch(err => ({ error: true, errorObject: err }));
};


module.exports = {
  forwardCurrencyRequest: (req, res) => {
    console.log('received exchange rate request');
    const { fromCurrency, toCurrency } = req.query;
    if (!process.env.REACT_APP_CURRENCYLAYER_API_KEY) {
      console.error(`
        ********
        You do not appear to have an API Key set. Please make sure you put an .env file in your app root.
        ********`);
      return res.json({ error: true, message: 'You do not appear to have an currency exchange rate API Key set. Please make sure you put an .env file in your app root' });
    } else if (!fromCurrency || !toCurrency || fromCurrency.trim().length !== 3 || toCurrency.trim().length !== 3) {
      console.error('bad exchange rate query');
      return res.json({ error: true, message: 'Invalid parameters for currency exchange rate request. Source and Destination currency codes must each be three characters.' });
    }
    return getExchangeRate(fromCurrency, toCurrency)
      .then(response => res.json(response))
      .catch(err => res.json({ error: true, message: 'Error while retrieving currency exchange rate from third paarty API.', errorResponse: err }));
  },
};
