import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import PropTypes from 'prop-types';

const style = {
  active: {
    background: '#3f51b5',
  }
};

const SidebarLink = props => (
  <Link to={props.path} style={{ textDecoration: 'none' }}>
    <ListItem button onClick={() => props.pageChange(props.text)} style={window.location.pathname === props.path ? style.active : null}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  </Link>);

SidebarLink.propTypes = {
  path: PropTypes.string.isRequired,
  pageChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default SidebarLink;
