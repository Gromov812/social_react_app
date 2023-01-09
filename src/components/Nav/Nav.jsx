import React from 'react';
import n from './Nav.module.css';
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  
  let unreadMessages = props.data
  .map((item) => item.unreadCounter);
  unreadMessages = unreadMessages.reduce((acc,cur) => acc+cur);



  const setActive = ({isActive}) => isActive ? `${n.active} ${n.item}` : n.item;
  
  return <nav className={n.nav}>
    <div className={n.item_list}> 
      <NavLink to="/" className = {setActive} >Posts Wall</NavLink>
      <NavLink to="/messages" className = {setActive}>Messages <span className={n.unreadMessages}>{unreadMessages}</span></NavLink>
      <NavLink to="/news" className = {setActive}>News</NavLink>
      <NavLink to="/music" className = {setActive}>Music</NavLink>
      <NavLink to="/settings" className = {setActive}>Settings</NavLink>
    </div>
  </nav>
};

export default Nav;