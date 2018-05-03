import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

const style = {
  active: {
    background: '#3f51b5',
  }
};

export default class SidebarItem extends React.Component {
  render() {
    return (
      <Link to={this.props.path} style={{ textDecoration: 'none' }}>
        <ListItem button style={window.location.pathname === this.props.path ? style.active : null}>
          <ListItemIcon>{this.props.icon}</ListItemIcon>
          <ListItemText primary={this.props.text} />
        </ListItem>
      </Link>
    );
  }
}
