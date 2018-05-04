import React from 'react';
// material-ui
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { MenuList } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
// icons
import Place from '@material-ui/icons/Place';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Create from '@material-ui/icons/Create';
import Book from '@material-ui/icons/Book';
// components
import SidebarLink from './SidebarLink';
import SidebarReqs from './SidebarReqs';
import ReqList from '../../pages/Requirements/ReqList';

// side bar links
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
    position: 'fixed',
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

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: props.classes.drawerPaper }}
    >
      <div className={props.classes.drawerHeader}>
        <Typography variant="title" color="inherit" noWrap>Intl.Intern</Typography>
      </div>
      <Divider />
      <MenuList>
        {links.map(link => (
          <SidebarLink
            key={link.text}
            text={link.text}
            path={link.path}
            icon={link.icon}
            pageChange={props.pageChange}
          />
        ))}
      </MenuList>
      <Divider />
      {/* dont break if no user is logged in, or user has no reqs  */}
      {props.currentUser && props.currentUser.needsRef ?
        props.currentUser.needsRef.map(need => (
          <SidebarReqs
            key={need.needDesc}
            text={need.needDesc}
            title={need.needTitle}
            number={need.needNumber}
          />
        )) : null }
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
