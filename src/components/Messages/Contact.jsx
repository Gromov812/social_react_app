import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import m from './Messages.module.css';


const Contact = (props) => {
    let { id, name, unreadCounter, dialogRef } = props;


    const setClass = ({ isActive }) => isActive ? `${m.active} ${m.item}` : m.item;

    return <>

        <NavLink
            onClick={() => {
            console.log(dialogRef.current)
            dialogRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })}
                
            } 
            key={id}
            to={`/messages/${id}`}
            className={setClass}>
            {name}
            {unreadCounter > 0 && <span className={m.unreadMessages}>{unreadCounter}</span>}
        </NavLink>

    </>
}

export default Contact;