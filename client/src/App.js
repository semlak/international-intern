import React from 'react';
import dotenv from 'dotenv';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Material UI components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
// Pages
import Journal from './pages/Journal/';
import Expenses from './pages/Expenses/';
import UserLocation from './pages/Location';
import Requirements from './pages/Requirements';
import NoMatch from './pages/NoMatch';
// Components
import RegistrationForm from './components/Users/RegistrationForm';
import LoginForm from './components/Users/LoginForm';
import NewNeed from './components/Needs/NewNeed';
import Sidebar from './components/Sidebar/Sidebar';
import ContentArea from './components/ContentArea/ContentArea';

// read the .env file and load values into the process.env object
// must come before any use of process.env
dotenv.config();
console.log('env:', process.env);
// read .env.development.local
// dotenv.config({path: './.env.development.local'})

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <AppBar title="International Intern" style={{ zIndex: '1600' }} />
        <Sidebar />
        <ContentArea>
          <Switch>
            <Route exact path="/" component={Journal} />
            <Route exact path="/journal" component={Journal} />
            <Route exact path="/expenses" component={Expenses} />
            <Route exact path="/location" component={UserLocation} />
            <Route exact path="/requirements" component={Requirements} />
            <Route exact path="/register" component={RegistrationForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/newNeed" component={NewNeed} />
            <Route component={NoMatch} />
          </Switch>
        </ContentArea>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
