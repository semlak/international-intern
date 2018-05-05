import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import API from '../../utils/API';
import util from '../../utils/util';

export default class extends Component {
  state = {
    // currentUser: {},
    weather: {
      cityName: '',
      // tempMinC: 0,
      // tempMaxC: 0,
      tempMin: 0,
      tempMax: 0,
      windSpeed: 0,
      windDirection: 0,
      sky: '',
    },
    APIKey: process.env.REACT_APP_OPEN_WEATHERMAPS_API_KEY,
    units: '',
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.doWeather(this.props);
    }
  }

  componentWillReceiveProps(props) {
    this.doWeather(props);
  }

  doWeather(props) {
    // fetch the user to get their location, etc...
    // Internship location
    const lat = props.currentUser.internLocationLatitude;
    const lng = props.currentUser.internLocationLongitude;
    const units = props.currentUser.preferredUnits.toLowerCase();
    this.setState({ units });

    //
    // Now get the weather...
    //

    // current weather -- (forcast query is a pay-for feature)
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=${this.state.APIKey}`;
    // const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&units=imperial&appid=${this.state.APIKey}`;

    API.getWeather(queryURL).then((response) => {
      // console.log(`weather for ${city}, ${country_code}:`, response);
      const tempMin = response.data.main.temp_min;
      const tempMax = response.data.main.temp_max;

      this.setState({
        weather: {
          cityName: response.data.name,
          // tempMinC,
          // tempMaxC,
          tempMin,
          tempMax,
          windSpeed: response.data.wind.speed,
          windDirection: response.data.wind.deg,
          sky: response.data.weather[0].main,
        },
      });
      // console.log('weather:', this.state.weather);
    }).catch((error) => {
      throw error;
    });
  }

  render() {
    // convert the wind direction (degrees) to a well-known ordinal
    const ordinal = util.convertWind(this.state.weather.windDirection);

    // this if-statement is necessarily 'wet' code because of the HTML symbols
    // the only way to 'dry' out the code is to use dangerouslySetInnerHTML,
    // which is not recommended
    if (this.state.units === 'imperial') {
      return (
        // '&#x2109;' is the HTML code for 'degrees Farenheight'
        <div>
          <Typography variant="headline">Weather</Typography>
          <Typography variant="subheading">Current Low: {this.state.weather.tempMin}&#x2109;</Typography>
          <Typography variant="subheading">Current High: {this.state.weather.tempMax}&#x2109;</Typography>
          <Typography variant="subheading">Current Wind: {this.state.weather.windSpeed} {this.state.windSymbol} {ordinal}</Typography>
          <Typography variant="subheading">Current Sky: {this.state.weather.sky}</Typography>
        </div>
      );
    }
    // else metric
    return (
      // '&#x2103;' is the HTML code for 'degrees Celcius'
      <div>
        <Typography variant="headline">Weather</Typography>
        <Typography variant="subheading">Current Low: {this.state.weather.tempMin}&#x2103;</Typography>
        <Typography variant="subheading">Current High: {this.state.weather.tempMax}&#x2103;</Typography>
        <Typography variant="subheading">Current Wind: {this.state.weather.windSpeed} {this.state.windSymbol} {ordinal}</Typography>
        <Typography variant="subheading">Current Sky: {this.state.weather.sky}</Typography>
      </div>
    );
  }
}
