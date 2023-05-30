import React, { useState, useEffect } from 'react';
import n from './Nav.module.css';
import { NavLink, useLocation } from "react-router-dom";
import { connect, useSelector } from 'react-redux' 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

const Nav = () => {
  
  let isAuthorized = useSelector(state => state.authReducer.authorized)

  let state = useSelector(state => state.messageReducer)
  let location = useLocation().pathname;
  const [selectedIndex, setSelectedIndex] = useState(`${location}`);


  let unreadMessages = state.contactsData
  .map((item) => item.unreadCounter);
  unreadMessages = unreadMessages.reduce((acc,cur) => acc+cur);

  useEffect(() => {
    console.log(location);
    setSelectedIndex(`${location}`)
  }, [location])

  const setActive = ({isActive}) => isActive ? `${n.active} ${n.item}` : n.item;

  return <>
   { isAuthorized && <nav className={n.nav}>
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
          <ListItemText primary="Posts Wall" />
        </ListItemButton>
        </NavLink>
      <NavLink to="/messages">
      <ListItemButton selected={selectedIndex === '/messages'}> 
          <ListItemText primary="Messages" />
        </ListItemButton>
        </NavLink>
      <NavLink to="/users_list">
      <ListItemButton selected={selectedIndex === '/users_list'} > 
          <ListItemText primary="Users" />
        </ListItemButton>
        </NavLink>
      <NavLink to="/friends">
      <ListItemButton selected={selectedIndex === "/friends"} > 
          <ListItemText primary="Friends" />
        </ListItemButton>
        </NavLink>
      <NavLink to="/settings">
      <ListItemButton selected={selectedIndex === '/settings'} > 
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