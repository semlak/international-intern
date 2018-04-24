import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Pages
import Journal from "./pages/Journal";
import Expenses from "./pages/Expenses";
import UserLocation from "./pages/Location";
import Requirements from "./pages/Requirements";
import NoMatch from "./pages/NoMatch";
// Components
import RegistrationForm from "./components/Users/RegistrationForm";
import LoginForm from "./components/Users/LoginForm";
import NewNeed from "./components/Needs/NewNeed";
import Sidebar from "./components/Sidebar/Sidebar";
// Material UI components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <AppBar title="International Intern" style={{ zIndex: '1600'}} />
        <Sidebar />
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
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
