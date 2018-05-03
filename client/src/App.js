import React from 'react';
import dotenv from 'dotenv';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Material UI components
import CssBaseline from 'material-ui/CssBaseline';
// Pages
import Journal from './pages/Journal/';
import Expenses from './pages/Expenses/';
import UserLocation from './pages/Location';
import Requirements from './pages/Requirements/';
import NoMatch from './pages/NoMatch';

// test

import { withStyles } from 'material-ui/styles';
//import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// icons
import Place from '@material-ui/icons/Place';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Create from '@material-ui/icons/Create';
import Book from '@material-ui/icons/Book';
// import SidebarItem from './SidebarItem';
import { MenuList } from 'material-ui/Menu';

// Components
import RegistrationForm from './components/Users/RegistrationForm';
import Sidebar from './components/Sidebar/Sidebar';
import TopNav from './components/TopNav/TopNav';

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
  toolbar: theme.mixins.toolbar,
  content: {
    position: 'relative',
    marginLeft: drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

// read the .env file and load values into the process.env object
// must come before any use of process.env
dotenv.config();
// console.log('env:', process.env);
// read .env.development.local
// dotenv.config({path: './.env.development.local'})

class App extends React.Component {
  state = {
    currentUser: '',
  };

  handleLogin = (currentUser) => {
    this.setState({ currentUser });
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <TopNav onLogin={this.handleLogin} currentUser={this.state.currentUser} />            
              <Sidebar />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* <ContentArea> */}
                  <Switch>
                    <Route exact path="/" component={Journal} />
                    <Route exact path="/journal" component={Journal} />
                    <Route exact path="/expenses" component={Expenses} />
                    <Route exact path="/location" component={UserLocation} />
                    <Route exact path="/requirements" component={Requirements} />
                    <Route exact path="/register" component={RegistrationForm} />
                    <Route component={NoMatch} />
                  </Switch>
                {/* </ContentArea> */}
              </main>
            </div>
          </div>
        </React.Fragment>
      </Router>
      
    // <React.Fragment>
    //   <CssBaseline />
    //   <Router>
    //     <div style={{
    //       flexGrow: 1,
    //       zIndex: 1,
    //       position: 'relative',
    //       display: 'flex',
    //     }}
    //     >
    //       <TopNav onLogin={this.handleLogin} currentUser={this.state.currentUser} />
    //       <Sidebar />
    //       <ContentArea>
    //         <Switch>
    //           <Route exact path="/" component={Journal} />
    //           <Route exact path="/journal" component={Journal} />
    //           <Route exact path="/expenses" component={Expenses} />
    //           <Route exact path="/location" component={UserLocation} />
    //           <Route exact path="/requirements" component={Requirements} />
    //           <Route exact path="/register" component={RegistrationForm} />
    //           <Route component={NoMatch} />
    //         </Switch>
    //       </ContentArea>
    //     </div>
    //   </Router>
    // </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
