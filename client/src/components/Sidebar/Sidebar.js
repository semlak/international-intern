import React from 'react';
import Drawer from 'material-ui/Drawer';
import { MenuList } from 'material-ui/Menu';

// icons
import Place from '@material-ui/icons/Place';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Create from '@material-ui/icons/Create';
import Book from '@material-ui/icons/Book';

import SidebarItem from './SidebarItem';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const links = [
  {
    text: 'Journal',
    path: '/journal',
    icon: <Book />,
  }, {
    text: 'Expenses',
    path: '/expenses',
    icon: <AttachMoney />,
  }, {
    text: 'Location',
    path: '/location',
    icon: <Place />,
  }, {
    text: 'Requirements',
    path: '/requirements',
    icon: <AssignmentTurnedIn />,
  }, {
    text: 'temp - Register',
    path: '/register',
    icon: <Create />,
  },
];

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 24px',
    ...theme.mixins.toolbar,
  },
});


const Sidebar = (props) => {
  const { classes } = props;
  return (

    <Drawer
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>                
        <Typography variant="title" color="inherit" noWrap>Intl.Intern</Typography>
      </div>
      <Divider />
      <MenuList>
        {links.map(link => (
          <SidebarItem
            key={link.text}
            text={link.text}
            path={link.path}
            icon={link.icon}
          />
        ))}
      </MenuList>
      <Divider />
      requirements here
    </Drawer>

  
    // <div style={style}>
  //   <Drawer
  //   variant="permanent" 
  //  //  style={style}
  //   >
  //     <MenuList>
  //     {links.map(link => (
  //       <SidebarItem
  //         key={link.text}
  //         text={link.text}
  //         path={link.path}
  //         icon={link.icon}
  //       />
  //     ))}
  //     </MenuList>
  //     </Drawer>
    //  </div>
  )
};

export default withStyles(styles)(Sidebar);
// export default Sidebar;
