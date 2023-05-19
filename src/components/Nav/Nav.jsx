import React, { useEffect } from 'react';
import n from './Nav.module.css';
import { NavLink } from "react-router-dom";
import { connect, useSelector } from 'react-redux' 

const Nav = () => {
  
  let isAuthorized = useSelector(state => state.authReducer.authorized)

  let state = useSelector(state => state.messageReducer)


  let unreadMessages = state.contactsData
  .map((item) => item.unreadCounter);
  unreadMessages = unreadMessages.reduce((acc,cur) => acc+cur);



  const setActive = ({isActive}) => isActive ? `${n.active} ${n.item}` : n.item;
  
  return <>
   { isAuthorized && <nav className={n.nav}>
    <div className={n.item_list}> 
    {isAuthorized ? 
      <>
      <NavLink to="/" className = {setActive} >Posts Wall</NavLink>
      <NavLink to="/messages" className = {setActive}>Messages {unreadMessages > 0 && <span className={n.unreadMessages}>{unreadMessages}</span>}</NavLink>
      <NavLink to="/users_list" className = {setActive}>Users</NavLink> 
      <NavLink to="/friends" className = {setActive}>Friends</NavLink> 

      <NavLink to="/music" className = {setActive}>Music</NavLink>
      <NavLink to="/settings" className = {setActive}>Settings</NavLink>
      </>
      : ''}
    </div>
  </nav>}
  </>
};

export default Nav;