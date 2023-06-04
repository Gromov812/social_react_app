import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersAPI } from "../../DAL/api";
import Contact from "./Contact";
import m from './Messages.module.css';
import List from '@mui/material/List';


const ContactsWindow = ({dialogRef, state, dispatch}) => {
    const ownerId = useSelector(state => state.authReducer.id);
    const messageContactsData = useSelector(state => state.messageReducer.contactsData);
    const [selectedIndex, setSelectedIndex] = useState(false);

    useEffect(() => {
        // usersAPI.getDialogContacts(ownerId)
        // .then(async res => { 
        //     if (res.data !== 'Empty array') {
        //     let arr = [...res.data];
        //     await arr.map(el => {
        //         if (el.contragent_id == ownerId) el.contragent_id = el.from_id;
        //         return el;
        //     });
        //     dispatch({type:'SET_CONTACTS', arr: arr })
        // }
        // })
        // .then(() => {
        //     console.log(messageContactsData);
        //     messageContactsData.forEach(async el => {
        //         await usersAPI.getDialogContactsUnreads(ownerId, el.id)
        //         .then(res => {
        //             console.log(res);
        //             dispatch({type:'SET_UNREAD_COUNTER', id: el.id, count: res.data.length == 0 ? 0 : res.data[0].unread_counter})
        
        //         })
        //     })

        // })


    }, [ownerId, selectedIndex, messageContactsData.length])
    let contacts = state.contactsData
        .map((item,i) => {
           return <Contact
            ownerId={ownerId}
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
});
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

