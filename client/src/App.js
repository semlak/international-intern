import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import RegistrationForm from "./components/Users/RegistrationForm";
import LoginForm from "./components/Users/LoginForm";
import NewNeed from "./components/Needs/NewNeed";
import Main from "./pages/Main";

// pages
import Journal from "./pages/Journal";
import Expenses from "./pages/Expenses";
import UserLocation from "./pages/Location";
import Requirements from "./pages/Requirements";


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <AppBar
          title="Our Title Here"
          // iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Switch>
          {/* Menu Items */}
          <Route exact path="/" component={Main} />
          <Route exact path="/journal" component={Journal} />
          <Route exact path="/expenses" component={Expenses} />
          <Route exact path="/location" component={UserLocation} />
          <Route exact path="/requirements" component={Requirements} />

          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/newNeed" component={NewNeed} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
