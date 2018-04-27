import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import API from '../../utils/API';

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
      
      //API.logoutUser().then(response => this.setState({ currentUser: null }));
    }

    render() {
      const actions = [
        <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
        <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.submitForm}
      />,
      ];

      return (
        <div>
          <AppBar
            title="International Intern"
            style={{ zIndex: '1600' }}
            iconElementRight={
              <div>
                <h3>{this.props.currentUser && this.props.currentUser.email ?
                `User: ${this.props.currentUser.email}` :
                'Not Logged in'}
                </h3>

              {this.props.currentUser && this.props.currentUser.email ? <RaisedButton label="Logoff" onClick={this.logoff} /> : <RaisedButton label="Login" onClick={this.handleOpen} />}

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

// ContentArea.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default TopNav;
