import React from 'react';
import Drawer from 'material-ui/Drawer';
import { MenuList } from 'material-ui/Menu';
import SidebarItem from './SidebarItem';

// import { withStyles } from 'material-ui/styles';

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
    text: 'temp - Register',
    path: '/register',
  },
];

const drawerWidth = 240;

const style = { 
  position: 'relative',
  width: drawerWidth,
}

const Sidebar = (props) => {
  // const { classes } = props;
  return (
    <div style={style}>
    <Drawer
    variant="permanent" 
    style={style}
    >
      <MenuList style={{paddingTop: '64px'}}>
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
