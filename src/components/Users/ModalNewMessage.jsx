import React, { useState, useEffect } from 'react'
import u from './Users.module.css';
import UsersModal from '../Modals/UsersModal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function ModalNewMessage({ modalData, setModalActive, isActive }) {

    const [textareaInput, setTextareaInput] = useState('');
    const [isSent, setSent] = useState(false);
    let ownerId = useSelector(state => state.authReducer.id);

    useEffect(() => {
        if (isSent) {
            setTimeout(() => {
                setModalActive(false);
                setTimeout(() => {
                    setSent(!isSent);
                }, 300);
            }, 700);
        }
    }, [isSent])

    const sendMsg = (ownerId, to_id) => {

        if (textareaInput) {
            axios.post('http://193.168.46.22:3005/messages/post', {

                from_id: ownerId,
                to_id: to_id,
                message: textareaInput

            })
                .then(() => {
                    setTextareaInput('');
                    setSent(true);
                })
        }
    }

    return (
        <>
            <UsersModal isActive={isActive} setActive={setModalActive}>
                {isSent ?
                    <>
                        <p className={u.modal__block_newMessage}>Message sent!</p>
                    </>
                    :
                    <><p className={u.modal__block_newMessage}>New message:</p>
                        <div className={u.modal__block_middle}>
                            <div className={u.modal__block_userData}>
                                <img className={u.user_avatar} src={modalData.photo || 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_male_person-256.png'} height='36px' alt={modalData.name} srcset="" />
                                <Link to={`/user/${modalData.id}`}>{modalData.name}</Link>
                            </div>
                            <textarea className={u.modal__block_textarea} cols="30" rows="20" onChange={(e) => setTextareaInput(e.target.value)} value={textareaInput} />
                        </div>
                        <button className={`${u.button} ${u.remove} ${u.modal__block_button}`} onClick={() => sendMsg(ownerId, modalData.id)}>Send</button>
                    </>}
            </UsersModal>
        </>
    )
}
