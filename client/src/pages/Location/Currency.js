import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Util from '../../utils/util';

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
    return Util.getExchangeRate(homeCurrency, locCurrency)
      .then((results) => {
        // console.log('results when getting exchange rate', results);
        if (results.error) return console.error(results.message);
        if (results || results.quote) {
          this.setState({ homeCurrency, locCurrency, exchangeRate: results.quote });
        } else {
          console.error('Encountered error while trying to receive currency rate. response was', results);
        }
      })
      .catch(err => console.error('Encountered error while trying to receive currency rate', err));
  }

  render() {
    return (
      <div>
        <Typography variant="headline">Currency</Typography>
        <Typography variant="subheading">Home Currency: {this.state.homeCurrency}</Typography>
        <Typography variant="subheading">Internship Currency: {this.state.locCurrency}</Typography>
        <Typography variant="subheading">Exchange Rate: {this.state.exchangeRate.toFixed(2)}</Typography>
      </div>
    );
  }
}
