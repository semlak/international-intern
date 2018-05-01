import React, { Component } from 'react';
import API from '../../utils/API';
import Weather from './Weather';
import Currency from './Currency';

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  Promise,
});

googleMapsClient.geocode({ address: 'Toronto, Canada' })
  .asPromise()
  .then((response) => {
    console.log(response.json.results);
  })
  .catch((err) => {
    console.log(err);
  });

export default class extends Component {
  state = {
    chapterTitle: '',
    description: '',
    image: '',
    date: Date.now(),
    requireNum: '0',
    chapterData: []
  };

  componentDidMount() {
    API.getCurrentUser().then((response) => {
      let currentUser = response.data.user
      this.setState({currentUser: currentUser});
    }).catch((err) => {
      console.log('Error while getting current user: ', err);
    });
  }

  render() {
    return (
      <div>
        <h1>Location</h1>
        <hr />
        <Weather />
        <hr />
        <Currency />
      </div>
    );
  }
}
