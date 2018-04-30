import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import API from '../../utils/API';

// const styles = theme => ({
//   appBar: {
//     // Make the app bar z-index always one more than the drawer z-index
//     zIndex: theme.zIndex.drawer + 1,
//   },
// });

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

  handleClickOpen = () => {
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
        const { user } = response.data;
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
    return (
      <div>
          <AppBar position="absolute" style={{ zIndex: '1600' }}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>International Intern</Typography>
            { this.props.currentUser && this.props.currentUser.email ? 
              <div>
                <Typography color="inherit" variant="subheading" style={{display: 'inline-block', paddingRight: '10px'}}>
                  {this.props.currentUser.email}
                </Typography>
                <Button color="inherit" onClick={this.logoff}>Logoff</Button>
              </div> :
              <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
            }
          </Toolbar>
        </AppBar>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Login</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitForm} color="primary" autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default TopNav;
