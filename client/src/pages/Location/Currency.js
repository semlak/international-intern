import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import API from '../../utils/API';

export default class extends Component {
  state = {
    homeCurrency: '',
    locCurrency: '',
    exchangeRate: 0,
  };

  componentDidMount() {
    if (this.props.currentUser && typeof this.props.currentUser === 'object') {
      this.updateExchangeRate(this.props);
    }
  }

  componentWillReceiveProps(props) {
    if (props.currentUser && typeof props.currentUser === 'object') {
      this.updateExchangeRate(props);
    }
  }

  updateExchangeRate(props) {
    if (!props.currentUser.homeLocationCurrencyCode) {
      return console.error('unable to retrieve all required props from currentUser. You may need to ensure that the fields \'internLocationCountry\' and \'internLocationCity\' are populated.');
    }
    // console.log("in updateExchangeRate, props: " , props);
    const { currentUser } = props;
    const [homeCurrency, locCurrency] = [
      currentUser.homeLocationCurrencyCode || 'USD',
      currentUser.internLocationCurrencyCode || 'CAD'
    ];

    const API_KEY = process.env.REACT_APP_CURRENCYLAYER_API_KEY;

    // const queryURL = `http://apilayer.net/api/live?access_key=${API_KEY}&source=${this.state.homeCurrency}&currencies=${this.state.locCurrency}&format=1`;
    if (!API_KEY || !homeCurrency || !locCurrency) {
      return (console.error('Error with API_KEY, homeCurrency, or locCurrency'));
    }
    const queryURL = `http://apilayer.net/api/live?access_key=${API_KEY}&source=${homeCurrency}&currencies=${locCurrency}&format=1`;
    console.log('currency query:', queryURL);

    return API.getCurrency(queryURL).then((json) => {
      console.log('currency:', json);
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
      const quoteCode = `${homeCurrency}${locCurrency}`;
      let quote;
      if (!json || !json.data || !json.data.quotes) {
        return (console.error('Error in retrieved currency quote data.'));
      }
      const keys_arr = Object.keys(json.data.quotes);
      for (let i = 0; i < keys_arr.length; i++) {
        const key = keys_arr[i];
        if (key === quoteCode) {
          quote = json.data.quotes[key];
        }
      }
      this.setState({ homeCurrency, locCurrency, exchangeRate: quote });
    }).catch((error) => {
      throw error;
    });
  }

  render() {
    return (
      <div>
        <Typography variant="headline">Currency</Typography>
        <Typography variant="subheading">Home Currency: {this.state.homeCurrency}</Typography>
        <Typography variant="subheading">Internship Currency: {this.state.locCurrency}</Typography>
        <Typography variant="subheading">Exchange Rate: {this.state.exchangeRate}</Typography>
      </div>
    );
  }
}
