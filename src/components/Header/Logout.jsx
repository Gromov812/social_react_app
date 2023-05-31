import React from 'react'
import l from './Header.module.css';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

function Logout ({logout, name}) {

    return (
        <>
            <div className={l.welcome}>
               Welcome,  <span className={l.welcome__name}> {name}! </span>
               <Button variant="contained" size={'small'} onClick={logout} path='/'> <LogoutIcon /></Button>
                {/* <button className={l.button} onClick={logout} >Log out</button> */}
            </div>
        </>
    )
}

export default Logout;