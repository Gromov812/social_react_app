import React from 'react'
import l from './Header.module.css';
function Logout ({logout, name}) {


    return (
        <>
            <div className={l.welcome}>
               Добро пожаловать,  <span className={l.welcome__name}> {name}! </span>
                <button className={l.button} onClick={logout} path='/'>Log out</button>
            </div>
        </>
    )
}

export default Logout;