import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersAPI } from "../../DAL/api";
import Contact from "./Contact";
import m from './Messages.module.css';

const ContactsWindow = (props) => {
    const dispatch = useDispatch();
    const ownerId = useSelector(state => state.authReducer.id);

    useEffect(() => {
    //     axios.post('http://127.0.0.1:3005/messages/post', {
                  
    //         from_id: 50, 
    //         to_id: 39,
    //         message: `${new Date()}` 
          
    // }).then(res => console.log(res))

        usersAPI.getDialogContacts(ownerId)
        .then(res => { 
            console.log(res);
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
    let contacts = props.state.contactsData
        .map((item,i) =>
            <Contact
                dispatch={props.dispatch}
                key={i}
                id={item.id} 
                name={item.name}
                unreadCounter={item.unreadCounter}
            />
        );
    return <>
        <div className={m.contacts}>
            <ul className={m.items_list}>
                {contacts}
            </ul>
        </div>
    </>
}

export default ContactsWindow;