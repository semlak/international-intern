import React, { Component } from 'react';
import { Button, TextField, Select, } from 'material-ui';

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';

import IntegrationReactSelect from '../../components/Forms/IntegrationReactSelect';
import API from '../../utils/API';
import util from '../../utils/util';
// import {Link} from 'react-router-dom';

export default class extends Component {
  state = {
    // currentUser: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    fullname: '',
    homeLocationCity: '',
    homeLocationCountry: '',
    homeLocationCountryCode: '',
    homeLocationCurrencyCode: '',
    homeLocationTimezone: '',
    homeLocationLatitude: '',
    homeLocationLongitude: '',
    internLocationCity: '',
    internLocationCountry: '',
    internLocationCountryCode: '',
    internLocationCurrencyCode: '',
    internLocationTimezone: '',
    internLocationLatitude: '',
    internLocationLongitude: '',
    preferredUnits: 'imperial',
    openWeatherCityCode: '',
    countryCodeData: {},
    countryCurrencyCodeData: {},
    countryNameSuggestions: [],
  }

  componentDidMount() {
    this.loadCountryData();
  }

  loadCountryData() {
    API.getAllCountryData()
      .then((response) => {
        // console.log(response);
        const countryCodeData = response.data.countryCodes || {};
        const countryNameSuggestions = Object.keys(countryCodeData)
          .map(suggestion => ({
            value: suggestion,
            label: suggestion,
          }));
        // console.log('countryCodeData', countryCodeData, 'suggestions', countryNameSuggestions);
        this.setState({
          countryNameSuggestions,
          countryCodeData,
          countryCurrencyCodeData: response.data.countryCurrencyCodes
        });
      });
  }

  sendRegistrationData = () => {
    console.log('state: ', this.state);
    if (this.state.password !== this.state.passwordConfirm) {
      return console.error('Password and Password Confirmation do not match');
    } else if (
      this.state.password.length < 1 ||
      this.state.username.length < 1 ||
      this.state.email.length < 1 ||
      this.state.fullname.length < 1 ||
      this.state.homeLocationCity.length < 1 ||
      this.state.homeLocationCountry.length < 1 ||
      this.state.homeLocationCountry.length < 1 ||
      this.state.homeLocationCountryCode.length < 1 ||
      this.state.internLocationCity.length < 1 ||
      this.state.internLocationCountry.length < 1 ||
      this.state.internLocationCountryCode.length < 1 ||
      this.state.internLocationCurrencyCode.length < 1
    ) {
      return console.error('Bad registration info. This is a crappy error message');
    }
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      fullname: this.state.fullname,
      homeLocationCity: this.state.homeLocationCity,
      homeLocationCountry: this.state.homeLocationCountry,
      homeLocationCountryCode: this.state.homeLocationCountryCode,
      homeLocationCurrencyCode: this.state.homeLocationCurrencyCode,
      homeLocationTimezone: this.state.homeLocationTimezone,
      homeLocationLatitude: this.state.homeLocationLatitude,
      homeLocationLongitude: this.state.homeLocationLongitude,
      internLocationCity: this.state.internLocationCity,
      internLocationCountry: this.state.internLocationCountry,
      internLocationCountryCode: this.state.internLocationCountryCode,
      internLocationCurrencyCode: this.state.internLocationCurrencyCode,
      internLocationTimezone: this.state.internLocationTimezone,
      internLocationLatitude: this.state.internLocationLatitude,
      internLocationLongitude: this.state.internLocationLongitude,
      preferredUnits: this.state.preferredUnits,
    };
    return API.registerUser(data)
      .then((response) => {
        const newUser = response.data.user;
        console.log('newUser: ', newUser);
        this.setState({
          // currentUser: newUser,
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
          fullname: '',
          homeLocationCity: '',
          homeLocationCountry: '',
          homeLocationCountryCode: '',
          homeLocationCurrencyCode: '',
          internLocationCity: '',
          internLocationCountry: '',
          internLocationCountryCode: '',
          internLocationCurrencyCode: '',
        });
      })
      .catch(err => console.log('error on registration', err));
  }

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value });

  handleInputChangeForAutoCompleteField = name => (value) => {
    // console.log('name, value', name, value);
    const dataToSet = {};
    dataToSet[name] = value;
    const countryCodeName = name === 'homeLocationCountry' ? 'homeLocationCountryCode' :
      name === 'internLocationCountry' ? 'internLocationCountryCode' : '';
    const currencyCodeName = name === 'homeLocationCountry' ? 'homeLocationCurrencyCode' :
      name === 'internLocationCountry' ? 'internLocationCurrencyCode' : '';
    if (this.state.countryCodeData && countryCodeName) {
      const countryCode = this.state.countryCodeData[value] || '';
      if (countryCode) dataToSet[countryCodeName] = countryCode;
    }
    if (this.state.countryCurrencyCodeData && currencyCodeName) {
      const currencyCode = this.state.countryCurrencyCodeData[value] || '';
      if (currencyCode) dataToSet[currencyCodeName] = currencyCode;
    }
    // console.log('new state data to set', dataToSet);
    this.setState(dataToSet);
  }

  submitForm = (event) => {
    event.preventDefault();
    // get/set intern location
    let place = `${this.state.internLocationCity}, ${this.state.internLocationCountry}`;
    util.getGeoLocation(place).then((iGeo) => {
      this.setState({
        // internLocationCountryCode: iGeo.cc,
        internLocationLatitude: iGeo.lat,
        internLocationLongitude: iGeo.lng,
      });
      util.getTimezone({ lat: iGeo.lat, lng: iGeo.lng }).then((iTZ) => {
        this.setState({
          internLocationTimezone: JSON.stringify(iTZ.json),
        });
        // get/set home location
        place = `${this.state.homeLocationCity}, ${this.state.homeLocationCountry}`;
        util.getGeoLocation(place, false).then((hGeo) => {
          this.setState({
            // homeLocationCountryCode: json2.cc,
            homeLocationLatitude: hGeo.lat,
            homeLocationLongitude: hGeo.lng,
          });
          util.getTimezone({ lat: hGeo.lat, lng: hGeo.lng }).then((hTZ) => {
            this.setState({
              homeLocationTimezone: JSON.stringify(hTZ.json),
            });
            this.sendRegistrationData();
          });
        });
      });
    });
  }

  render() {
    // console.log('state upon rendering: ', this.state);
    return (
      <div>
        <h1>Registration Form</h1>
        <form>
          <TextField label="Username" name="username" type="text" required value={this.state.username} onChange={this.handleInputChange} />
          <br />
          <TextField label="Email" name="email" type="text" required value={this.state.email} onChange={this.handleInputChange} />
          <br />
          <TextField label="Password" name="password" type="password" required value={this.state.password} onChange={this.handleInputChange} />
          <TextField label="PasswordConfirm" name="passwordConfirm" required type="password" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
          <br />
          <TextField label="Fullname" name="fullname" type="text" required value={this.state.fullname} onChange={this.handleInputChange} />
          <br />
          <TextField label="HomeLocationCity" name="homeLocationCity" required type="text" value={this.state.homeLocationCity} onChange={this.handleInputChange} />
          <br />
          <IntegrationReactSelect label="Home Country" value={this.state.homeLocationCountry} handleInputChange={() => this.handleInputChangeForAutoCompleteField('homeLocationCountry')} placeholder={'Home Location Country'} selectSuggestions={this.state.countryNameSuggestions} />
          <br />
          <TextField label="Country Code" name="homeLocationCountryCode" required type="text" value={this.state.homeLocationCountryCode} onChange={this.handleInputChange} />
          <TextField label="Home Currency" name="homeLocationCurrencyCode" type="text" value={this.state.homeLocationCurrencyCode} onChange={this.handleInputChange} />
          <br />
          <TextField label="InternLocationCity" name="internLocationCity" required type="text" value={this.state.internLocationCity} onChange={this.handleInputChange} />
          <IntegrationReactSelect label="Intern Country" name="internLocationCountry" required type="text" value={this.state.internLocationCountry} handleInputChange={(value) => this.handleInputChangeForAutoCompleteField('internLocationCountry')} selectSuggestions={this.state.countryNameSuggestions} placeholder="Intern Location Country" />
          <TextField label="Country Code" name="internLocationCountryCode" required type="text" value={this.state.internLocationCountryCode} onChange={this.handleInputChange} />
          <TextField label="Intern Location Currency" name="internLocationCurrencyCode" type="text" value={this.state.internLocationCurrencyCode} onChange={this.handleInputChange} />
          <br />

          <FormControl >
            <InputLabel htmlFor="preferredUnits-helper">Preferred Units</InputLabel>
            <Select
              value={this.state.preferredUnits}
              onChange={this.handleInputChange}
              input={<Input name="preferredUnits" id="age-helper" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value='imperial'>Imperial</MenuItem>
              <MenuItem value='metric'>Metric</MenuItem>
            </Select>
            <FormHelperText>Units for retrieved weather data</FormHelperText>
          </FormControl>
          <br />
          <Button variant="raised" color="primary" onClick={this.submitForm}>Register</Button>
        </form>
      </div>
    );
  }
}
