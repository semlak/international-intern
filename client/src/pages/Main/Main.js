import React, { Component } from 'react';
import { Link } from "react-router-dom";
// material ui components
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

class Main extends Component {
  render() {
    return (
      <div>
        {/* <AppBar
          title="Our Title Here"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />, */}
        <Drawer>
          <Link to="/journal"><MenuItem>Journal</MenuItem></Link>
          <Link to="/location"><MenuItem>Location</MenuItem></Link>
          <Link to="/expenses"><MenuItem>Expenses</MenuItem></Link>
          <Link to="/requirements"><MenuItem>Requirements</MenuItem></Link>
          {/* <MenuItem>Login</MenuItem> */}
        </Drawer>
      </div>
    );
  }
}

export default Main;
