import React, { Component } from 'react';
import API from '../../utils/API';
import util from '../../utils/util';

export default class extends Component {
  state = {
    currentUser: {},
    homeCurrency: '',
    locCurrency: '',
    exchangeRate: 0,
  };

  componentDidMount() {
    // fetch the user to get their location, etc...
    API.getCurrentUser().then((response) => {
      const currentUser = response.data.user;
      this.setState({ currentUser });
    });
    // hard code countries for now
    // TODO - get from user
    [this.state.homeCurrency, this.state.locCurrency] = util.getCurrencyCodes(['USA', 'Canada']);

    // const API_KEY = process.env.REACT_APP_FIXER_IO_API_KEY;
    // const queryURL = `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${this.state.homeCurrency}&symbols=${this.state.locCurrency}callback=MY_FUNCTION`;
    const API_KEY = process.env.REACT_APP_CURRENCYLAYER_API_KEY;
    const queryURL = `http://apilayer.net/api/live?access_key=${API_KEY}&source=${this.state.homeCurrency}&currencies=${this.state.locCurrency}&format=1`;
    // console.log('currency query:', queryURL);

    API.getCurrency(queryURL).then((json) => {
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
      const quoteCode = `${this.state.homeCurrency}${this.state.locCurrency}`;
      let quote;
      const keys_arr = Object.keys(json.data.quotes);
      for (let i = 0; i < keys_arr.length; i++) {
        const key = keys_arr[i];
        if (key === quoteCode) {
          quote = json.data.quotes[key];
        }
      }
      this.setState({ exchangeRate: quote });
    }).catch((error) => {
      throw error;
    });
  }
  render() {
    return (
      <div>
        <h2>Currency</h2>
        <p>Home Currency: {this.state.homeCurrency}</p>
        <p>Internship Currency: {this.state.locCurrency}</p>
        <p>Exchange Rate: {this.state.exchangeRate}</p>
      </div>
    );
  }
}
