import React from 'react';
import Weather from './Weather';
import Currency from './Currency';
import News from './News';

const Location = () => (
  <div>
    <h1>Location</h1>
    <hr />
    <Weather />
    <hr />
    <Currency />
    <hr />
    <News />
  </div>
);

export default Location;
