import React, { useState, useEffect, useLayoutEffect } from "react";
import n from "./Nav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

import ListItemIcon from "@mui/material/ListItemIcon";
import MessageIcon from "@mui/icons-material/Message";
import DnsIcon from "@mui/icons-material/Dns";
import GroupIcon from "@mui/icons-material/Group";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SettingsIcon from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";

import { usersAPI } from "../../DAL/api";

const Nav = ({ isOpenMenu, setIsOpenMenu }) => {
  let isAuthorized = useSelector((state) => state.authReducer.authorized);
  let state = useSelector((state) => state.messageReducer);
  let location = useLocation().pathname;
  const [selectedIndex, setSelectedIndex] = useState(`${location}`);


  useLayoutEffect(() => {
    console.log(location);
    setSelectedIndex(`${location}`);
  }, [location]);


  return <>
    { isAuthorized && 
        <nav className={n.nav}>
        <div
          className={
            isOpenMenu
              ? `${n.item_list} ${n.item_list__open} `
              : `${n.item_list}`
          }
        > 
        
          
              <List>
                <NavLink to="/">
                  <ListItemButton
                    selected={selectedIndex === "/"}
                    onClick={() => setIsOpenMenu(false)}
                  >
                    <ListItemIcon>
                      <DnsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Posts Wall" />
                  </ListItemButton>
                </NavLink>
                <NavLink to="/messages">
                  <ListItemButton
                    selected={selectedIndex === "/messages"}
                    onClick={() => setIsOpenMenu(false)}
                  >
                    <ListItemIcon>
                      <MessageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Messages" />{" "}
                    <Badge
                      badgeContent={state.currentUnreadCounter}
                      color="primary"
                    />
                  </ListItemButton>
                </NavLink>
                <NavLink to="/users_list">
                  <ListItemButton
                    selected={selectedIndex === "/users_list"}
                    onClick={() => setIsOpenMenu(false)}
                  >
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </NavLink>
                <NavLink to="/friends">
                  <ListItemButton
                    selected={selectedIndex === "/friends"}
                    onClick={() => setIsOpenMenu(false)}
                  >
                    <ListItemIcon>
                      <Diversity3Icon />
                    </ListItemIcon>
                    <ListItemText primary="Friends" />
                  </ListItemButton>
                </NavLink>
                <NavLink to="/settings">
                  <ListItemButton
                    selected={selectedIndex === "/settings"}
                    onClick={() => setIsOpenMenu(false)}
                  >
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </NavLink>
              </List>
        </div>
      </nav>
    }
    </>;
};

export default Nav;
