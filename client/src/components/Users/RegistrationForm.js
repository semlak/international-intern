import React, { Component } from 'react';
import { Button, TextField, Typography, Paper } from 'material-ui';

import API from '../../utils/API';
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
    internLocationCity: '',
    internLocationCountry: '',
    internLocationCountryCode: '',
    internLocationCurrencyCode: '',
    preferredUnits: 'imperial',
    openWeatherCityCode: '',
  }

  componentDidMount() {
    // API.getCurrentUser().then((response) => {
    //   const currentUser = response.data.user;
    //   this.setState({ currentUser });
    // });
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
      internLocationCity: this.state.internLocationCity,
      internLocationCountry: this.state.internLocationCountry,
      internLocationCountryCode: this.state.internLocationCountryCode,
      internLocationCurrencyCode: this.state.internLocationCurrencyCode,
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

  getCurrencyCodes = (countryNames, callback) => {
    API.getCurrencyCodes(countryNames)
      .then((response) => {
        const data = response.data;
        const currencyCodes = data.currencyCodes;
        const countryCodes = data.countryCodes;
        if (!countryCodes[this.state.homeLocationCountry] ||
          countryCodes[this.state.internLocationCountry] ||
          currencyCodes[this.state.homeLocationCountry] ||
          currencyCodes[this.state.internLocationCountry]
        ) {
          return console.error("Error retrieving currency/country code data");
        }
        console.log('resonse from getting currency codes:', response);
        this.setState({
          homeLocationCurrencyCode: data.currencyCodes[this.state.homeLocationCountry],
          internLocationCurrencyCode: data.currencyCodes[this.state.internLocationCountry],
          homeLocationCountryCode: data.countryCodes[this.state.homeLocationCountry],
          internLocationCountryCode: data.countryCodes[this.state.internLocationCountry],
        }, console.log(this.state));
      })
      .catch(err => console.error('error when gettin currency codes: ', err));
  };

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value });

  submitForm = (event) => {
    event.preventDefault();
    this.sendRegistrationData();
  }


  pullInCurrencyAndCountryCodes = (event) => {
    event.preventDefault();
    this.getCurrencyCodes([this.state.homeLocationCountry, this.state.internLocationCountry]);
  }

  render() {
    // console.log('state upon rendering: ', this.state);
    return (
      <div>
        <h1>Registration Form</h1>
        <form>
          <TextField label="Username" name="username" type="text" required value={this.state.username} onChange={this.handleInputChange} />
          <br/>
          <TextField label="Email" name="email" type="text" required value={this.state.email} onChange={this.handleInputChange} />
          <br/>
          <TextField label="Password" name="password" type="password" required value={this.state.password} onChange={this.handleInputChange} />
          <TextField label="PasswordConfirm" name="passwordConfirm" required type="password" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
          <br/>
          <TextField label="Fullname" name="fullname" type="text" required value={this.state.fullname} onChange={this.handleInputChange} />
          <br/>
          <TextField label="HomeLocationCity" name="homeLocationCity" required type="text" value={this.state.homeLocationCity} onChange={this.handleInputChange} />
          <TextField label="HomeLocationCountry" name="homeLocationCountry" required type="text" value={this.state.homeLocationCountry} onChange={this.handleInputChange} />
          <TextField label="Country Code" name="homeLocationCountryCode" required type="text" value={this.state.homeLocationCountryCode} onChange={this.handleInputChange} />
          <TextField label="Home Currency" name="homeLocationCurrencyCode" type="text" value={this.state.homeLocationCurrencyCode} onChange={this.handleInputChange} />
          <br/>
          <TextField label="InternLocationCity" name="internLocationCity" required type="text" value={this.state.internLocationCity} onChange={this.handleInputChange} />
          <TextField label="InternLocationCountry" name="internLocationCountry" required type="text" value={this.state.internLocationCountry} onChange={this.handleInputChange} />
          <TextField label="Country Code" name="internLocationCountryCode" required type="text" value={this.state.internLocationCountryCode} onChange={this.handleInputChange} />
          <TextField label="Intern Location Currency" name="internLocationCurrencyCode" type="text" value={this.state.internLocationCurrencyCode} onChange={this.handleInputChange} />
          <br />
          <Button variant="raised" color="primary" onClick={this.submitForm}>Register</Button>
          <Button variant="raised" color="secondary" onClick={this.pullInCurrencyAndCountryCodes}>Fill In Currency Data</Button>
        </form>
        {/* <Link to="/login">Login</Link>  */}
      </div>
    );
  }
}
