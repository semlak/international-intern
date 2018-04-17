import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Books from "./pages/Books";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import RegistrationForm from "./components/Users/RegistrationForm";
import LoginForm from "./components/Users/LoginForm";
import NewNeed from "./components/Needs/NewNeed"

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        {/* <Route exact path="/" component={Books} /> */}
        <Route exact path="/" component={LoginForm} />
        {/* <Route exact path="/books" component={Books} /> */}
        {/* <Route exact path="/books/:id" component={Detail} /> */}
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/newNeed" component={NewNeed} />
        
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
