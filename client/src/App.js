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
// Components
import RegistrationForm from './components/Users/RegistrationForm';
import Sidebar from './components/Sidebar/Sidebar';
import TopNav from './components/TopNav/TopNav';
import ContentArea from './components/ContentArea/ContentArea';

// test
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
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

import SidebarItem from './components/Sidebar/SidebarItem';


const links = [
  {
    text: 'Journal',
    path: '/journal',
    icon: <Book />,
  }, {
    text: 'Expenses',
    path: '/expenses',
    icon: <AttachMoney />,
  }, {
    text: 'Location',
    path: '/location',
    icon: <Place />,
  }, {
    text: 'Requirements',
    path: '/requirements',
    icon: <AssignmentTurnedIn />,
  }, {
    text: 'temp - Register',
    path: '/register',
    icon: <Create />,
  },
];

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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  // drawerPaper: {
  //   position: 'relative',
  //   width: drawerWidth,
  // },
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   padding: '0 24px',
  //   ...theme.mixins.toolbar,
  // },
  toolbar: theme.mixins.toolbar,
  content: {
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
          
          {/* <TopNav onLogin={this.handleLogin} currentUser={this.state.currentUser} /> */}
          
            <AppBar
              position="absolute"
              className={classNames(classes.appBar)}
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

            {/* <AppBar
              position="absolute"
              className={classNames(classes.appBar)}
            >
              <Toolbar>
                <Typography variant="title" color="inherit" noWrap>
                Page Title
                </Typography>
              </Toolbar>
            </AppBar> */}
            
            <Sidebar />

            {/* <Drawer
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
            >
              <div className={classes.drawerHeader}>                
                <Typography variant="title" color="inherit" noWrap>Intl.Intern</Typography>
              </div>
              <Divider />
              <MenuList>
                {links.map(link => (
                  <SidebarItem
                    key={link.text}
                    text={link.text}
                    path={link.path}
                    icon={link.icon}
                  />
                ))}
              </MenuList>
            <Divider />
              requirement list here
            </Drawer> */}
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <ContentArea>
                <Switch>
                  <Route exact path="/" component={Journal} />
                  <Route exact path="/journal" component={Journal} />
                  <Route exact path="/expenses" component={Expenses} />
                  <Route exact path="/location" component={UserLocation} />
                  <Route exact path="/requirements" component={Requirements} />
                  <Route exact path="/register" component={RegistrationForm} />
                  <Route component={NoMatch} />
                </Switch>
              </ContentArea>
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
