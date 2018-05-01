import React from 'react';
import { Link } from 'react-router-dom';
// import { MenuItem, MenuList } from 'material-ui/Menu';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Place from '@material-ui/icons/Place';

const style = {
  active: {
    background: '#3f51b5',
  }
};

export default class SidebarItem extends React.Component {
  render() {
    const { path, text, icon } = this.props;
    return (
      <Link to={path} style={{ textDecoration: 'none' }}>
        <ListItem button style={window.location.pathname === path ? style.active : null}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </Link>
    );
  }
}
