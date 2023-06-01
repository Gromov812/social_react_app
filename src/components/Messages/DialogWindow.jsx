import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import m from './Messages.module.css';
import Msg from "./Msg";
import ScrollToBottom from 'react-scroll-to-bottom';
import { sendMessage, setConversationId, typeOnPrimaryMsgTextArea } from "../../redux/message-reducer";
import { useSelector } from "react-redux";
import axios from "axios";
import { usersAPI } from "../../DAL/api";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const DialogWindow = ({ state, dispatch, dialogRef }) => {

    let ownerId = useSelector(state => state.authReducer.id);
    let msgStateLength = useSelector(state => state.messageReducer.contactsMsg.length);
    let params = useParams();

    const sendMsg = (ownerId, to_id) => {
        let msg = state.contactsData.filter(el => el.id == to_id)[0].currentMessageText;
        console.log(msg);
        if (msg) {
            usersAPI.sendMsg(ownerId, to_id, msg).then(res => console.log(res))
            dispatch(sendMessage())
        }
    }



    useEffect(() => {
        if (params['*']) {

            usersAPI.getDialogMessages(ownerId, params['*']).then(res => {
                console.log(`dialogs >>> `, res);
                dispatch({type:'SET_USER_MESSAGES', payload: res.data, ownerId})
            })
        }
        console.log(params['*']);
        dispatch(setConversationId(params['*']));
        dispatch({ type: 'SET_TO_NULL_UNREAD_COUNTER', userId: params['*'] })

    }, [params['*'], msgStateLength])


    function displayFirstScreen() {
        if (params['*']) {
            return <>
                <textarea placeholder="Type your message here..." onChange={(e) => dispatch(typeOnPrimaryMsgTextArea(e.target.value))} value={state.contactsData[state.currentConversationIndex].currentMessageText} onKeyDown={(e) => (e.key === 'Enter' && e.ctrlKey) ? sendMsg(ownerId, params['*']) : ''} />
                {/* <button className={m.button} onClick={() => sendMsg(ownerId, params['*'])}>Send</button> */}
                <Button sx={{height: '100%', margin: '0 5px', 'border-color': '#c9c9c9', color: '#242424'}} variant="outlined" onClick={() => sendMsg(ownerId, params['*'])} endIcon={<SendIcon />}>
        Send
      </Button>
            </>
        }
        else return <>
            <div>
                <p>
                    Выберете диалоговое окно!
                </p>
            </div>
        </>
    }


    let messages = Object.assign([], state.contactsMsg)
        .filter(el => el.conversation == state.activeDialogId)
        .map((el,i) => {
            return <Msg
                key={i}
                text={el.text}
                conversation={el.conversation}
                name={el.name}
                answer={el.answer}
                sent={el.sent}
            />
        })


    return <>
        <div className={m.screen}>

            <ScrollToBottom className={m.dialogContainer}>
                {messages}
            </ScrollToBottom>

            <div className={m.area}  >
                {displayFirstScreen()}
                <div ref={dialogRef} ></div>
            </div>
        </div>
    </>
}

export default DialogWindow;