const currencyData = require('../client/src/currencycodes');
// const cityCountryData = require('../client/src/city-list.json');
const countryCodeData = require('../client/src/country_codes');
// create a hashmap with country name as key and country currency as value:
const countryCurrencyCodes = {};
currencyData.forEach(countryObj => countryCurrencyCodes[countryObj.country] = countryObj.currency_code);
// console.log(currencyData);
//
//
// create a hashmap with country name as key and country code as value
const countryCodes = {};
countryCodeData.forEach(countryObj => countryCodes[countryObj.Name] = countryObj.Code);

// create a hashMap with country code as key and country name as value
// const countryNames = new Map()
// countryCodeData.forEach(countryObj => countryNames.set(countryObj.Code, countryObj.Name));

// console.log('countryCodes: ', countryCodes);

module.exports = {
  getCountryData: (req, res) => {
    const { query } = req;
    console.log('currency query is ', query);
    if (query.country_names) {
      // const requestedCountryCodes = query.country_codes ? query.country_codes.split(',') : [];
      const requestedCountryNames = query.country_names ?
        query.country_names.split(',').map(countryName => countryName.trim()) :
        [];
      const resultCurrencyCodes = {};
      const resultCountryCodes = {};
      requestedCountryNames.forEach((countryName) => {
        resultCurrencyCodes[countryName] = countryCurrencyCodes[countryName];
        resultCountryCodes[countryName] = countryCodes[countryName];
      });
      return res.json({ requestedCountryNames, currencyCodes: resultCurrencyCodes, countryCodes: resultCountryCodes });
    } else if (query.getall) {
      return res.json({ countryCodes, countryCurrencyCodes });
    }
    return res.json({ error: true, message: 'Unknown request parameter at country route.' });
  },
  getAll: (req, res) => res.json({ countryCodes, countryCurrencyCodes }),
};
