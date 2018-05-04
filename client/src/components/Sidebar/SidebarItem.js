import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

const style = {
  active: {
    background: '#3f51b5',
  }
};

// export default class SidebarItem extends Component {
const App = (props) => {
  return (
    <Link to={props.path} style={{ textDecoration: 'none' }}>
      <ListItem button onClick={() => props.pageChange(props.text)} style={window.location.pathname === props.path ? style.active : null}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Link>
  );
}
export default App;