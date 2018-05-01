import React, { Component } from 'react';
import API from '../../utils/API';
import util from '../../utils/util';

export default class extends Component {
  state = {
    currentUser: {},
    weather: {
      cityName: '',
      tempMinC: 0,
      tempMaxC: 0,
      tempMinF: 0,
      tempMaxF: 0,
      windSpeed: 0,
      windDirection: 0,
      sky: '',
    },
    APIKey: process.env.REACT_APP_OPEN_WEATHERMAPS_API_KEY,
  }

  componentDidMount() {
    // fetch the user to get their location, etc...
    API.getCurrentUser().then((response) => {
      // console.log('get user: ', response);
      const currentUser = response.data.user;
      // console.log('currentUser is: ', currentUser);
      this.setState({ currentUser });
    });

    //
    // Now get the weather...
    //
    // Internship location
    // hard code for now ; TODO - get from user
    const city = 'Toronto';
    const country_code = 'CA';

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&appid=${this.state.APIKey}`; // current
    // api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid=${APIKey}
    // api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid=${APIKey}

    API.getWeather(queryURL).then((response) => {
      // console.log(`weather for ${city}, ${country_code}:`, response);
      const tempMinC = (response.data.main.temp_min - 273.15).toFixed(1);
      const tempMaxC = (response.data.main.temp_max - 273.15).toFixed(1);
      const tempMinF = ((tempMinC * 1.8) + 32).toFixed(1);
      const tempMaxF = ((tempMaxC * 1.8) + 32).toFixed(1);

      this.setState({
        weather: {
          cityName: response.data.name,
          tempMinC,
          tempMaxC,
          tempMinF,
          tempMaxF,
          windSpeed: response.data.wind.speed,
          windDirection: response.data.wind.deg,
          sky: response.data.weather[0].main,
        },
      });
      console.log('weather:', this.state.weather);
    }).catch((error) => {
      throw error;
    });
  }

  render() {
    // html escape for 'degree celcius' : &#x2103;
    const dC = { __html: '&#x2103;' };
    // html escape for 'degree fahrenheight' : &#x2109;
    const dF = { __html: '&#x2109;' };
    // convert the wind direction (degrees) to a well-known ordinal
    const ordinal = util.convertWind(this.state.weather.windDirection);

    return (
      <div>
        <h2>Weather in {this.state.weather.cityName}</h2>
        <p>Current Low: {this.state.weather.tempMinF}<span dangerouslySetInnerHTML={dF} /></p>
        <p>Current High: {this.state.weather.tempMaxF}<span dangerouslySetInnerHTML={dF} /></p>
        <p>Current Wind: {this.state.weather.windSpeed} {ordinal}</p>
        <p>Current Sky: {this.state.weather.sky}</p>
      </div>
    );
  }
}
