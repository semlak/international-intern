import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, MenuList } from 'material-ui/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// import Map from '@material-ui/icons/Map';

const style = {
  active: {
    background: "#3f51b5",
  }
};

export default class SidebarItem extends React.Component {
  render() {
    const { path, text } = this.props;
    return (
      <Link to={path} style={{textDecoration: 'none'}}>      
        <ListItem button style={window.location.pathname === path ? style.active : null}>
          {/* <ListItemIcon>
            <Map />
          </ListItemIcon> */}
          <ListItemText primary={text} />
        </ListItem>
      </Link>
    );
  }
}
