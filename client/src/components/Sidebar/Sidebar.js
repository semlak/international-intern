import React from 'react';
import Drawer from 'material-ui/Drawer';
import SidebarItem from './SidebarItem';

import { MenuItem, MenuList } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const links = [
  {
    text: 'Journal',
    path: '/journal',
  }, {
    text: 'Expenses',
    path: '/expenses',
  }, {
    text: 'Location',
    path: '/location',
  }, {
    text: 'Requirements',
    path: '/requirements',
  }, {
    text: 'temp - Login',
    path: '/login',
  }, {
    text: 'temp - Register',
    path: '/register',
  }, {
    text: 'temp - New Need',
    path: '/newNeed',
  },
];

const drawerWidth = 240;

const style = { 
  position: 'relative',
  width: drawerWidth,
}

const Sidebar = (props) => {
  const { classes } = props;
  return (
    <div style={style}>
    <Drawer
    variant="permanent" 
    style={style}
    >
      <MenuList style={{paddingTop: '75px'}}>
      {links.map(link => (
        <SidebarItem
          key={link.text}
          text={link.text}
          path={link.path}
        />
      ))}
      </MenuList>
     </Drawer>
     </div>
  )
};

export default Sidebar;
