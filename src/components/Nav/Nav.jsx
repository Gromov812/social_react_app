import React, { useState, useEffect } from 'react';
import n from './Nav.module.css';
import { NavLink, useLocation } from "react-router-dom";
import { connect, useSelector } from 'react-redux'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import ListItemIcon from '@mui/material/ListItemIcon';
import MessageIcon from '@mui/icons-material/Message';
import DnsIcon from '@mui/icons-material/Dns';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SettingsIcon from '@mui/icons-material/Settings';

const Nav = ({setCurrentPageName}) => {

  let isAuthorized = useSelector(state => state.authReducer.authorized)

  let state = useSelector(state => state.messageReducer)
  let location = useLocation().pathname;
  const [selectedIndex, setSelectedIndex] = useState(`${location}`);


  let unreadMessages = state.contactsData
    .map((item) => item.unreadCounter);
  unreadMessages = unreadMessages.reduce((acc, cur) => acc + cur);

  useEffect(() => {
    setSelectedIndex(`${location}`);
    switch (location) {
        case '/': {
          setCurrentPageName(isAuthorized ? 'Posts Wall' : '');
          break;
        }
        case '/messages': {
          setCurrentPageName('Messages');
          break;
        }
        case '/users_list': {
          setCurrentPageName('Users List');
          break;
        }
        case '/friends': {
          setCurrentPageName('Friends List');
          break;
        }
        case '/settings': {
          setCurrentPageName('Settings');
          break;
        }
    }

  }, [location])

  const setActive = ({ isActive }) => isActive ? `${n.active} ${n.item}` : n.item;

  return <>
    {isAuthorized && <nav className={n.nav}>
      <div className={n.mobile__menu}></div>
      <div className={n.item_list}>
        {isAuthorized ?
          <>
            {/* <NavLink to="/" className = {setActive} >Posts Wall</NavLink>
      <NavLink to="/messages" className = {setActive}>Messages {unreadMessages > 0 && <span className={n.unreadMessages}>{unreadMessages}</span>}</NavLink>
      <NavLink to="/users_list" className = {setActive}>Users</NavLink> 
      <NavLink to="/friends" className = {setActive}>Friends</NavLink> 
      <NavLink to="/music" className = {setActive}>Music</NavLink>
      <NavLink to="/settings" className = {setActive}>Settings</NavLink> */}

            <List>
              <NavLink to="/">
                <ListItemButton selected={selectedIndex === '/'} >
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts Wall" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/messages">
                <ListItemButton selected={selectedIndex === '/messages'}>
                <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Messages" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/users_list">
                <ListItemButton selected={selectedIndex === '/users_list'} >
                <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/friends">
                <ListItemButton selected={selectedIndex === "/friends"} >
                <ListItemIcon>
                    <Diversity3Icon />
                  </ListItemIcon>
                  <ListItemText primary="Friends" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/settings">
                <ListItemButton selected={selectedIndex === '/settings'} >
                <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </NavLink>
            </List>
          </>
          : ''}
      </div>
    </nav>}
  </>
};

export default Nav;