import React from "react";
import { BrowserRouter } from "react-router-dom";
import ContactsWindow from "./ContactsWindow";
import DialogWindow from "./DialogWindow";
import m from './Messages.module.css';

const Messages = (props) => {

return <>
        <div className={m.title}>
            <h2>Messages</h2>
        </div>
        <div className={m.container}>

                <ContactsWindow data={props.data.contactsData}/>
                <DialogWindow data={props.data}/>
                
        </div>
    </>
}

export default Messages;