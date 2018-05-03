import currencycodes from '../currencycodes.json';

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
    // pre-initialize the return vaules with 'not found'
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
};
