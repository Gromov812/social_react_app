import React from 'react'
import l from './Header.module.css';
import Button from '@mui/material/Button';


function Logout ({logout, name}) {

    return (
        <>
            <div className={l.welcome}>
               Добро пожаловать,  <span className={l.welcome__name}> {name}! </span>
               <Button variant="contained" onClick={logout} path='/'>Log out</Button>
                {/* <button className={l.button} onClick={logout} >Log out</button> */}
            </div>
        </>
    )
}

export default Logout;