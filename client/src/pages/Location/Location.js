import React from 'react';
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

const Location = () => (
  <div>
    <h1>Location</h1>
    <hr />
    <Weather />
    <hr />
    <Currency />
  </div>
);

export default Location;
