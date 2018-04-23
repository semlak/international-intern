import React from 'react';
import { Link } from "react-router-dom";
import MenuItem from 'material-ui/MenuItem';

// inline style
const active = {
  background: 'linear-gradient(45deg, #00bcd4 30%, #00b1d3 90%)',
  padding: '0 10px',
  color: '#fff',
};

export default class SidebarItem extends React.Component {
  render() {
    const {path, text} = this.props;
    return (   
      <MenuItem
        style={ window.location.pathname === path ? active : null}
        primaryText={text}
        containerElement={<Link to={path} />}
      />
    )
  }
}
