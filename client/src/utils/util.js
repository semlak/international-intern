import axios from 'axios';
import currencycodes from '../currencycodes.json';

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  Promise,
});

export default {
  convertWind(wd) {
    let ordinal = '';
    if (wd >= 348.75 && wd < 11.25) {
      ordinal = 'N';
    } else
    if (wd >= 11.25 && wd < 33.75) {
      ordinal = 'NNE';
    } else
    if (wd >= 33.75 && wd < 56.25) {
      ordinal = 'NE';
    } else
    if (wd >= 78.75 && wd < 101.25) {
      ordinal = 'E';
    } else
    if (wd >= 101.25 && wd < 123.75) {
      ordinal = 'ESE';
    } else
    if (wd >= 123.75 && wd < 146.25) {
      ordinal = 'SE';
    } else
    if (wd >= 146.25 && wd < 168.75) {
      ordinal = 'SSE';
    } else
    if (wd >= 168.75 && wd < 191.25) {
      ordinal = 'S';
    } else
    if (wd >= 191.25 && wd < 213.75) {
      ordinal = 'SSW';
    } else
    if (wd >= 213.75 && wd < 236.25) {
      ordinal = 'SW';
    } else
    if (wd >= 236.25 && wd < 258.75) {
      ordinal = 'WSW';
    } else
    if (wd >= 258.75 && wd < 281.25) {
      ordinal = 'W';
    } else
    if (wd >= 281.25 && wd < 303.75) {
      ordinal = 'WNW';
    } else
    if (wd >= 303.75 && wd < 326.25) {
      ordinal = 'NW';
    } else
    if (wd >= 326.25 && wd < 348.75) {
      ordinal = 'NNW';
    }
    return ordinal;
  },
  getCurrencyCodes(countries) {
    // param: countries is an array of strings of countires
    // return: rv is an array of strings of the currency_codes - in the same order of countries

    // initialize return value array
    const rv = [];

    // console.log('countries:', countries);
    let i, j;
    // pre-initialize the return values with 'not found'
    for (j = 0; j < countries.length; j++) {
      rv[j] = '???';
    }
    for (i = 0; i < currencycodes.length; i++) {
      for (j = 0; j < countries.length; j++) {
        if (countries[j] === currencycodes[i].country) {
          // push the object onto the return value array
          rv[j] = (currencycodes[i].currency_code);
          break;
        }
      }
    }
    // console.log('currency codes found:', rv);
    return rv;
  },
  getGeoLocation(place) {
    // parameters
    //   place:  a string containing the place to lookup
    //           can be as simple as just a city name, can be an entire address

    // console.log('getGeoLocation::place:', place);
    return googleMapsClient.geocode({ address: `${place}` }).asPromise().then((geo) => {
      // console.log('geo:', geo);
      let place_obj = { };
      place_obj = {
        // we don't need place_id until we start adding pins to the map
        // place_id: geo.results[0].place_id,
        lat: geo.json.results[0].geometry.location.lat,
        lng: geo.json.results[0].geometry.location.lng,
      };
      for (let i = 0; i < geo.json.results[0].address_components.length; i++) {
        if (geo.json.results[0].address_components[i].types[0] === 'country') {
          place_obj.cc = geo.json.results[0].address_components[i].short_name;
          break;
        }
      }
      // console.log(place_obj);
      return place_obj;
    }).catch((err) => {
      console.log(err);
    });
  },
  getTimezone(lat_lng) {
    // parameters
    //   lat_lng:  an object { lat, lng }

    return googleMapsClient.timezone({ location: lat_lng }).asPromise().then((tz) => {
      console.log('tz:', tz);
      return tz;
    }).catch((err) => {
      console.log(err);
    });
  },

  getExchangeRate(fromCurrency, toCurrency) {
    if (!fromCurrency || !toCurrency || fromCurrency.length !== 3 || toCurrency.length !== 3) {
      throw new Error('unable to retrieve all required props from currentUser. You may need to ensure that the fields \'internLocationCountry\' and \'internLocationCity\' are populated.');
    }
    // console.log("in updateExchangeRate, props: " , props);

    const API_KEY = process.env.REACT_APP_CURRENCYLAYER_API_KEY;

    if (!API_KEY || !fromCurrency || !toCurrency) {
      throw new Error('Error with API_KEY, fromCurrency, or toCurrency');
    }
    const queryURL = `http://apilayer.net/api/live?access_key=${API_KEY}&source=${fromCurrency}&currencies=${toCurrency}&format=1`;
    // console.log('currency query:', queryURL);

    return axios.get(queryURL).then((json) => {
      // console.log('currency:', json);
      // sample data
      // {
      //   "success": true,
      //   "terms": "https://currencylayer.com/terms",
      //   "privacy": "https://currencylayer.com/privacy",
      //   "timestamp": 1524873843,
      //   "source": "USD",
      //   "quotes": {
      //     "USDCAD": 1.282104,
      //   }
      // }
      const quoteCode = `${fromCurrency}${toCurrency}`;
      if (!json || !json.data || !json.data.quotes || !json.data.quotes[quoteCode]) {
        console.error('Error in retrieved currency quote data.');
        return ({ error: true, message: 'Error in retrieved currence quote data.' });
      }
      return ({
        quote: json.data.quotes[quoteCode],
        fromCurrency,
        toCurrency,
        otherQuoteData: json.data.quotes
      });
    }).catch(err => ({ error: true, errorObject: err }));
  },


};
