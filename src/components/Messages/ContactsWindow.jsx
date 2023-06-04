import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersAPI } from "../../DAL/api";
import Contact from "./Contact";
import m from './Messages.module.css';
import List from '@mui/material/List';


const ContactsWindow = ({dialogRef, state, dispatch}) => {
    const ownerId = useSelector(state => state.authReducer.id);
    const [selectedIndex, setSelectedIndex] = useState(false);

    useEffect(() => {
        console.log(selectedIndex);
        usersAPI.getDialogContacts(ownerId)
        .then(res => { 
            console.log(`CONT WIND`, res);
            if (res.data !== 'Empty array') {
            let arr = [...res.data];
            arr.map(el => {
                if (el.contragent_id == ownerId) el.contragent_id = el.from_id;
                
                return el;
            });
            
            dispatch({type:'SET_CONTACTS', arr: arr })
        }
        })

    }, [ownerId])
    let contacts = state.contactsData
        .map((item,i) =>
            <Contact
            selectedIndex={selectedIndex}
             setSelectedIndex={setSelectedIndex}
                avatar={item.photo}
                dialogRef={dialogRef}
                dispatch={dispatch}
                key={i}
                id={item.id} 
                name={item.name}
                unreadCounter={item.unreadCounter}
            />
        );
    return <>
        <div className={m.contacts}>
            <ul className={m.items_list}>
            <List>
                {contacts}
            </List>
            </ul>
        </div>
    </>
}

export default ContactsWindow;

