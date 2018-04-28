import React, {Component} from 'react';
import API from "../../utils/API";

export default class extends Component {
  state = {
    currentUser: {},
    weather: {
      'cityName': '',
      'tempMinC': 0,
      'tempMaxC': 0,
      'tempMinF': 0,
      'tempMaxF': 0,
      'windSpeed': 0,
      'windDirection': 0, 
      'sky': '',
    },
  }

  // handleInputChange = event => this.setState({[event.target.name]: event.target.value})

  componentDidMount() {
    // fetch the user to get their location, etc...
    API.getCurrentUser().then(response=> {
      // console.log('get user: ', response);
      let currentUser = response.data.user
      // console.log('currentUser is: ' , currentUser);
      this.setState({currentUser: currentUser});
    });

    //
    // Now get the weather...
    //
    // Internship location
    let city = 'Saint Paul'; // hard code for now
    let country_code = 'US';

    const APIKey = process.env.REACT_APP_OPEN_WEATHERMAPS_API_KEY;
  
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&appid=${APIKey}`;
    // api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid=${APIKey}
    // or
    // api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid=${APIKey}

    API.getWeather(queryURL).then((response) => {
      // console.log(`weather for ${city}, ${country_code}:`, response);
      const tempMinC = (response.data.main.temp_min - 273.15).toFixed(1);
      const tempMaxC = (response.data.main.temp_max - 273.15).toFixed(1);
      const tempMinF = ((tempMinC * 1.8) + 32).toFixed(1);
      const tempMaxF = ((tempMaxC * 1.8) + 32).toFixed(1);
  
      this.setState({weather: {
        'cityName': response.data.name,
        'tempMinC': tempMinC,
        'tempMaxC': tempMaxC,
        'tempMinF': tempMinF,
        'tempMaxF': tempMaxF,
        'windSpeed': response.data.wind.speed,
        'windDirection': response.data.wind.deg,
        'sky': response.data.weather[0].main,
      }});
      // onsole.log('weather:', this.state.weather);
    }).catch((error) => {
      throw error;
    });;
  }

  render() {
    return (
      <div>
        <h2>Weather</h2>
        <p>Today's Low: {this.state.weather.tempMinF}</p>
        <p>Today's High: {this.state.weather.tempMaxF}</p>
        <p>Today's Wind: {this.state.weather.windSpeed} at {this.state.weather.windDirection} degrees</p>
        <p>Today's Sky: {this.state.weather.sky}</p>
      </div>
    )
  }
}
