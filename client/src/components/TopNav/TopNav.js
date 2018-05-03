import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
// from Material, used to inject an array of styles into the DOM
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import API from '../../utils/API';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

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

  // open login modal
  handleClickOpen = () => { this.setState({ open: true }); };
  // close login modal
  handleClose = () => { this.setState({ open: false }); };
  // update username / password state on input change
  handleInputChange = event => this.setState({ [event.target.name]: event.target.value })
  // click 'login' form button
  submitForm = (event) => {
    event.preventDefault();
    // sample error handling, make sure username and password are present
    if (this.state.password.length < 1 && this.state.username.length < 1) {
      throw new Error('Bad login info. This is a crappy error message');
    }
    // create object containing username/password from the components state
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    // attempt login
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
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }} noWrap> page title here </Typography>
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
        {/* login modal begin */}
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

export default withStyles(styles)(TopNav);
