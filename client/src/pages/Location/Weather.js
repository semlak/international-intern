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
    // API.getCurrentUser().then((the_user) => {
    //   // console.log('get user: ', response);
    //   const currentUser = the_user.data.user;
    //   console.log('currentUser is: ', currentUser);
    //   this.setState({ currentUser });
      // Internship location
      const city = this.state.currentUser.internLocationCity;
      // const country_code = this.state.currentUser.internLocationCountryCode;
      // TODO - get countrycode from google
      const country_code = 'CA';

      //
      // Now get the weather...
      //

      // current weather -- (forcast query is a pay-for feature)
      const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&units=imperial&appid=${this.state.APIKey}`;
      // api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
      // api.openweathermap.org/data/2.5/weather?q={city name}&appid=${APIKey}
      // api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid=${APIKey}

      API.getWeather(queryURL).then((response) => {
        console.log(`weather for ${city}, ${country_code}:`, response);
        // next 4 lines for default units (Kelvin) / wind in m/s
        // const tempMinC = (response.data.main.temp_min - 273.15).toFixed(1);
        // const tempMaxC = (response.data.main.temp_max - 273.15).toFixed(1);
        // const tempMinF = ((tempMinC * 1.8) + 32).toFixed(1);
        // const tempMaxF = ((tempMaxC * 1.8) + 32).toFixed(1);
        // next 2 lines for Imperial units / wind in mph
        const tempMinF = response.data.main.temp_min;
        const tempMaxF = response.data.main.temp_max;

        this.setState({
          weather: {
            cityName: response.data.name,
            // tempMinC,
            // tempMaxC,
            tempMinF,
            tempMaxF,
            windSpeed: response.data.wind.speed,
            windDirection: response.data.wind.deg,
            sky: response.data.weather[0].main,
          },
        });
        // console.log('weather:', this.state.weather);
      }).catch((error) => {
        throw error;
      });
    // });
  }

  render() {
    // convert the wind direction (degrees) to a well-known ordinal
    const ordinal = util.convertWind(this.state.weather.windDirection);

    return (
      // '&#x2109;' is the HTML code for 'degrees Farenheight'
      // '&#x2103;' is the HTML code for 'degrees Celcius'
      <div>
        <h2>Weather in {this.state.weather.cityName}</h2>
        <p>Current Low: {this.state.weather.tempMinF}&#x2109;</p>
        <p>Current High: {this.state.weather.tempMaxF}&#x2109;</p>
        <p>Current Wind: {this.state.weather.windSpeed} mph {ordinal}</p>
        <p>Current Sky: {this.state.weather.sky}</p>
      </div>
    );
  }
}
