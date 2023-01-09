import React from "react";
import { NavLink } from "react-router-dom";
import Contact from "./Contact";
import m from './Messages.module.css';


const ContactsWindow = (props) => {



 let contacts = props.data.map(item =><Contact key={crypto.randomUUID()} id={item.id} name={item.name} unread={item.unread} unreadCounter={item.unreadCounter} />);
    return <>
        <div className={m.contacts}>
            <ul className={m.items_list}>
             {contacts} 
            </ul>
        </div>
    </>
}

export default ContactsWindow;