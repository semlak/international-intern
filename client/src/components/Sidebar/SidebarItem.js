import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, MenuList } from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
import List from 'material-ui/List';

// inline style
const active = {
  background: 'linear-gradient(45deg, #00bcd4 30%, #00b1d3 90%)',
  padding: '0 10px',
  color: '#fff',
};


export default class SidebarItem extends React.Component {
  render() {
    const { path, text } = this.props;
    return (
    <Link to={path} style={{ textDecoration: 'none', display: 'block' }}>
      <MenuItem>
        {text}
      </MenuItem>
    </Link>

      // <MenuItem
      // // style={window.location.pathname === path ? active : null}
      // // children={text}
      // // children={}
      // >
      
      // <Link to={path} />
      // </MenuItem>
    );
  }
}
