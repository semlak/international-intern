import React, { Component } from 'react';
import API from '../../utils/API';
import util from '../../utils/util';

export default class extends Component {
  state = {
    weather: {
      city: '',
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

  componentWillReceiveProps(props) {
    this.handleWeatherUpdate(props);
  }

  handleWeatherUpdate(props) {
    if (!props.currentUser || !props.currentUser.internLocationCity || !props.currentUser.internLocationCountry) {
      return console.error('unable to retrieve all required props from currentUser. You may need to ensure that the fields \'internLocationCountry\' and \'internLocationCity\' are populated.');
    }
    const city = props.currentUser.internLocationCity;
    const country_code = props.currentUser.internLocationCountryCode;

    if (city && country_code) {
      const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&appid=${this.state.APIKey}`; // current
      // api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
      // api.openweathermap.org/data/2.5/weather?q={city name}&appid=${APIKey}
      // api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid=${APIKey}

      API.getWeather(queryURL).then((response) => {
        console.log(`weather for ${city}, ${country_code}:`, response);
        const tempMinC = (response.data.main.temp_min - 273.15).toFixed(1);
        const tempMaxC = (response.data.main.temp_max - 273.15).toFixed(1);
        const tempMinF = ((tempMinC * 1.8) + 32).toFixed(1);
        const tempMaxF = ((tempMaxC * 1.8) + 32).toFixed(1);

        this.setState({
          weather: {
            city: response.data.name,
            tempMinC,
            tempMaxC,
            tempMinF,
            tempMaxF,
            windSpeedMPH: response.data.wind.speed.toFixed(2),
            windSpeedMetersPerSec: (response.data.wind.speed * 0.44704).toFixed(2),
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
  }

  //   render() {
  //     if (!this.props.currentUser || !this.props.currentUser.interLocationCity ) {
  //       console.error(`Your user profile does not appear to have the city or country code set for the intern locatio. These are the fields 'internLocationCity' and 'internLocationCountryCode' in the database.\n
  // This should be set when you register. However, if you are doing development it might not be set.

  // You can set these by with the commmand from a mongo shell:
  // 'user internshipAppDB; db.users.update({ username: '${props.currentUser.username}' }, { $set: { internLocationCity: 'Toronto', internLocationCountryCode: 'CA' } })'
  // or potentially from a bash shell:
  // 'mongo mongodb://localhost/internshipAppDB --eval 'db.users.update({ username: '${props.currentUser.username}' }, { $set: { internLocationCity: 'Seoul', internLocationCountryCode: 'KR', preferredUnits: 'metric' }})'
  // `);
  //     }
  //   }

  forecast() {
    // Internship location
    // hard code for now ; TODO - get from user
    const city = 'Toronto';
    const country_code = 'CA';

    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country_code}&appid=${this.state.APIKey}`; // 5-day forecast
    API.getWeather(queryURL).then((response) => {
      console.log(`weather for ${city}, ${country_code}:`, response);
    }).catch((error) => {
      throw error;
    });
  }

  render() {
    // html escape for 'degree celcius' : &#x2103;

    if (!this.props.currentUser || !this.state.weather.tempMinF) {
      return (
        <div>
          <h2>Weather in your location...</h2>
          <p>Current Low: &#x2013;</p>
          <p>Current High: &#x2013;</p>
          <p>Current Wind: &#x2013;</p>
          <p>Current Sky: &#x2013;</p>
        </div>
      );
    }
    // '&#x2109;' is the HTML code for 'degrees Farenheight'
    // '&#x2103;' is the HTML code for 'degrees Celcius'
    const dC = <span>&#x2103;</span>;
    const dF = <span>&#x2109;</span>;
    // html escape for 'degree fahrenheight' : &#x2109;
    // convert the wind direction (degrees) to a well-known ordinal
    const ordinal = util.convertWind(this.state.weather.windDirection);
    const useImperialUnits = !this.props.currentUser ?
      true : this.props.currentUser.preferredUnits !== 'metric';

    const mphWind = `${this.state.weather.windSpeedMPH} mph`;
    const mpsWind = `${this.state.weather.windSpeedMetersPerSec} mps`;
    const currentWind = `${useImperialUnits ? mphWind : mpsWind} ${ordinal}`;

    return (
      // '&#x2109;' is the HTML code for 'degrees Farenheight'
      // '&#x2103;' is the HTML code for 'degrees Celcius'
      <div>
        <h2>Weather in {this.state.weather.city}, {this.props.currentUser.internLocationCountry}</h2>
        <p>Current High: {useImperialUnits ?
            this.state.weather.tempMaxF :
            this.state.weather.tempMaxC
          } {useImperialUnits ? dF : dC}
        </p>
        <p>Current Low: {useImperialUnits ?
          this.state.weather.tempMinF :
          this.state.weather.tempMinC
          } {useImperialUnits ? dF : dC}
        </p>
        <p>Current Wind: {currentWind}</p>
        <p>Current Sky: { this.state.weather.sky }</p>
      </div>
    );
  }
}
