import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import API from '../../utils/API';
// import PropTypes from 'prop-types';

class TopNav extends Component {
  state = {
    username: '',
    password: '',
    open: false,
  };

  componentDidMount() {
    API.getCurrentUser().then((response) => {
      const currentUser = response.data.user;
      this.props.onLogin(currentUser);
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value })

  submitForm = (event) => {
    event.preventDefault();
    if (this.state.password.length < 1 && this.state.username.length < 1) {
      throw new Error('Bad login info. This is a crappy error message');
    }

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    API.loginUser(data)
      .then((response) => {
        // get user from response
        const user = response.data.user;
        // reset username and password fields
        this.setState({ username: '', password: '' });
        // pass user information to App.js
        this.props.onLogin(user);
        // close dialogue
        this.handleClose();
      })
      .catch(err => console.log('error on login', err));
  }

  logoff = (event) => {
    event.preventDefault();
    API.logoutUser().then(this.props.onLogin('null'));
    // API.logoutUser().then(response => this.setState({ currentUser: null }));
  }

  render() {
    const actions = [
      <Button 
        variant="raised"
        label="Cancel"
        primary
        onClick={this.handleClose}
        children={'Cancel'}
      />,
      <Button 
        variant="raised"
        label="Submit"
        primary
        keyboardFocused
        onClick={this.submitForm}
        children={'Submit'}
      />,
    ];

    
    return (
      <div>
        <AppBar
          title="International Intern"
          style={{ zIndex: '1600', position: 'fixed', top: '0' }}
          children={
            <div>
              {this.props.currentUser && this.props.currentUser.email ?
                <div>
                  <h4 style={{display: 'inline-block', paddingRight: '10px', color: '#fff'}}>
                    {this.props.currentUser.email}
                  </h4>
                  <Button variant="raised" label="Logoff" onClick={this.logoff} children={'Logoff'} />
                    </div> :
                  <Button variant="raised" label="Login" onClick={this.handleOpen} children={'Login'} />
                  }
            </div>
          }
        />
        <Dialog
          title="Login!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form>
            <TextField
              floatingLabelText="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <TextField
              floatingLabelText="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </form>
        </Dialog>
      </div>
    );
  }
}

export default TopNav;
