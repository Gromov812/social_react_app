import React, { useEffect, useLayoutEffect, useRef } from "react";
import ContactsWindow from "./ContactsWindow";
import DialogWindow from "./DialogWindow";
import m from './Messages.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

const Messages = () => {

let state = useSelector(state => state.messageReducer)
let isAuthorized = useSelector(state => state.authReducer.authorized);
let dispatch = useDispatch();
const navigate = useNavigate();
const dialogRef = useRef();



useLayoutEffect(() => {
    if (!isAuthorized) {
        navigate('/', {replace: true});
    }
}, [isAuthorized])

return <>
        <div className={m.title}>
            <h2>Messages</h2>
        </div>
        <div className={m.container}>
                <ContactsWindow state={state} dispatch={dispatch} dialogRef={dialogRef} />
                <DialogWindow state={state} dispatch={dispatch} dialogRef={dialogRef}/>

        </div>
    </>
}

export default Messages;