import React, { useReducer } from "react";
import ContactsWindow from "./ContactsWindow";
import DialogWindow from "./DialogWindow";
import m from './Messages.module.css';
import { useSelector, useDispatch } from 'react-redux'

const Messages = () => {



let state = useSelector(state => state.messageReducer)
let dispatch = useDispatch();


return <>
        <div className={m.title}>
            <h2>Messages</h2>
        </div>
        <div className={m.container}>
                <ContactsWindow state={state} dispatch={dispatch} />
                <DialogWindow state={state} dispatch={dispatch} />

        </div>
    </>
}

export default Messages;