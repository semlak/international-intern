import React from "react";
import Drawer from 'material-ui/Drawer';
import SidebarItem from "./SidebarItem";

const links = [
  {
    text: "Journal",
    path: "/journal",
  },{
    text: "Expenses",
    path: "/expenses",
  },{
    text: "Location",
    path: "/location",
  },{
    text: "Requirements",
    path: "/requirements",
  },{
    text: "temp - Login",
    path: "/login",
  },{
    text: "temp - Register",
    path: "/register",
  },{
    text: "temp - New Need",
    path: "/newNeed",
  }
]

const Sidebar = () => (
  <Drawer containerStyle={{'top': '64px'}}>
    {links.map(link => (
      <SidebarItem
        key={link.text}
        text={link.text}
        path={link.path}
      />
    ))}
 </Drawer>
);

export default Sidebar;
