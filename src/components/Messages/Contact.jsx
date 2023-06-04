import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import m from './Messages.module.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Badge from '@mui/material/Badge';
import { usersAPI } from "../../DAL/api";




const Contact = (props) => {
    let { id, name, dialogRef, avatar, selectedIndex, setSelectedIndex, ownerId, dispatch, unreadCounter } = props;



    useLayoutEffect(() => {

    },[ownerId])

    // console.log(name, ` - `, unreadCounter);
    const clickLinkHandler = () => {
        setSelectedIndex(id);
        dialogRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    } 

    const setClass = ({ isActive }) => isActive ? `${m.active} ${m.item}` : m.item;

    return <div className={m.contact__element}>
        <NavLink to={`/messages/${id}`}>
  <ListItemButton selected={selectedIndex == id} onClick={clickLinkHandler}>
    <ListItemIcon>
    {unreadCounter > 0 ? <Badge  badgeContent={unreadCounter} overlap="circular" color="primary">
    <Avatar src={avatar} />
    </Badge> :
     <Avatar src={avatar} />}

    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton >
</NavLink>
    {/* <Avatar src={avatar} />
        <NavLink
            onClick={clickLinkHandler} 
            key={id}
            to={`/messages/${id}`}
            className={setClass}>
            {name}
            {unreadCounter > 0 && <span className={m.unreadMessages}>{unreadCounter}</span>}
        </NavLink> */}

        </div>
}

export default Contact;



