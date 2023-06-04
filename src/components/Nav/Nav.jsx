import React, { useState, useEffect, useLayoutEffect } from 'react';
import n from './Nav.module.css';
import { NavLink, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import ListItemIcon from '@mui/material/ListItemIcon';
import MessageIcon from '@mui/icons-material/Message';
import DnsIcon from '@mui/icons-material/Dns';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SettingsIcon from '@mui/icons-material/Settings';
import Badge from '@mui/material/Badge';

import { usersAPI } from '../../DAL/api';


const Nav = ({ isOpenMenu, setIsOpenMenu}) => {

  let isAuthorized = useSelector(state => state.authReducer.authorized)
  let ownerId = useSelector(state => state.authReducer.id);
  const messageContactsData = useSelector(state => state.messageReducer.contactsData);
  const dispatch = useDispatch();
  let state = useSelector(state => state.messageReducer)
  let location = useLocation().pathname;
  const [selectedIndex, setSelectedIndex] = useState(`${location}`);



  useLayoutEffect(() => {
    setSelectedIndex(`${location}`);


    (async function () {
      await usersAPI.getDialogContacts(ownerId)
      .then(res => { 
          if (res.data !== 'Empty array') {
          let arr = [...res.data];
           arr.map(el => {
              if (el.contragent_id == ownerId) el.contragent_id = el.from_id;
              return el;
          });
          dispatch({type:'SET_CONTACTS', arr: arr })
      }
      })

      await         messageContactsData.forEach(async el => {
        await usersAPI.getDialogContactsUnreads(ownerId, el.id)
        .then(res => {
            // console.log(res);
            dispatch({type:'SET_UNREAD_COUNTER', id: el.id, count: res.data.length == 0 ? 0 : res.data[0].unread_counter})

        })
    })
    })()

  }, [location,messageContactsData.length])

  const setActive = ({ isActive }) => isActive ? `${n.active} ${n.item}` : n.item;

  return <>
    <nav className={n.nav}>
    

      <div className={isOpenMenu ? `${n.item_list} ${n.item_list__open} `: `${n.item_list}`}>
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
                <ListItemButton selected={selectedIndex === '/'} onClick={() => setIsOpenMenu(false)}>
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts Wall" />
                </ListItemButton >
              </NavLink>
              <NavLink to="/messages">
                <ListItemButton selected={selectedIndex === '/messages'} onClick={() => setIsOpenMenu(false)}>
                <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Messages" /> <Badge badgeContent={state.currentUnreadCounter} color="primary" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/users_list">
                <ListItemButton selected={selectedIndex === '/users_list'} onClick={() => setIsOpenMenu(false)}>
                <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/friends">
                <ListItemButton selected={selectedIndex === "/friends"} onClick={() => setIsOpenMenu(false)}>
                <ListItemIcon>
                    <Diversity3Icon />
                  </ListItemIcon>
                  <ListItemText primary="Friends" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/settings">
                <ListItemButton selected={selectedIndex === '/settings'} onClick={() => setIsOpenMenu(false)}>
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
    </nav>
  </>
};

export default Nav;