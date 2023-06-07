import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import m from './Messages.module.css';
import Msg from "./Msg";
import { sendMessage, setConversationId, typeOnPrimaryMsgTextArea } from "../../redux/message-reducer";
import { useSelector } from "react-redux";
import { usersAPI } from "../../DAL/api";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Balaboba from 'balaboba-api/src/balaboba';
import { Configuration, OpenAIApi } from "openai";

const DialogWindow = ({ state, dispatch, dialogRef }) => {
    const balaboba = new Balaboba()

    const openAIApiKey = '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';
    const openAIConfiguration = new Configuration({
  
      apiKey: openAIApiKey,
  });
  const openai = new OpenAIApi(openAIConfiguration);


    let ownerId = useSelector(state => state.authReducer.id);
    let params = useParams();



    const sendMsg = (ownerId, to_id) => {
        let msg = state.contactsData.filter(el => el.id == to_id)[0].currentMessageText;
        console.log(msg);
        if (msg) {
            usersAPI.sendMsg(ownerId, to_id, msg).then(res => console.log(res))
            if (to_id == 102 && ownerId != 102) {
                balaboba.generate(`${msg}`, 8).then(result => {

                    usersAPI.sendMsg(102, ownerId, result).then(() => {

                        usersAPI.getDialogMessages(ownerId, params['*']).then(res => {
                            dispatch({type:'SET_USER_MESSAGES', payload: res.data, ownerId})
                        })

                    })
                    .then(() => {
                        dispatch({ type: 'SET_TO_NULL_UNREAD_COUNTER', userId: params['*'] });
                    });
                })
                
            }
            if (to_id == 103 && ownerId != 103) {  
                

                openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: 'Тоже хорошо, чем занят?',
                    max_tokens: 2048,
                    temperature: 1,
                  }).then((res) => {

                    usersAPI.sendMsg(103, ownerId, res.data.choices[0].text).then(() => {

                        usersAPI.getDialogMessages(ownerId, params['*']).then(res => {
                            dispatch({type:'SET_USER_MESSAGES', payload: res.data, ownerId})
                        })

                    })
                    .then(() => {
                        dispatch({ type: 'SET_TO_NULL_UNREAD_COUNTER', userId: params['*'] });
                    });
                })



            }
                dispatch(sendMessage())
        }
    }

    useLayoutEffect(() => {
        if (params['*']) {
            console.log(ownerId);
            usersAPI.getDialogMessages(ownerId, params['*']).then(res => {
                console.log(`dialogs >>> `, res);
                dispatch({type:'SET_USER_MESSAGES', payload: res.data, ownerId})
                return res.data
            })
            .then(res => {
                console.log(res);
            })
        }
        console.log(params['*']);
        dispatch(setConversationId(params['*']));
        dispatch({ type: 'SET_TO_NULL_UNREAD_COUNTER', userId: params['*'] });
        console.log(`RERENDER DW`);

    }, [params['*'], ownerId])


    function displayFirstScreen() {
        if (params['*']) {
            return <>
                <textarea placeholder="Type your message here..." onChange={(e) => dispatch(typeOnPrimaryMsgTextArea(e.target.value))} value={state.contactsData[state.currentConversationIndex].currentMessageText} onKeyDown={(e) => (e.key === 'Enter' && e.ctrlKey) ? sendMsg(ownerId, params['*']) : ''} />
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

        let ref = useRef();

    let messages = Object.assign([], state.contactsMsg)
        .filter(el => el.conversation == state.activeDialogId)
        .reverse()
        .map((el,i, arr) => {

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

            <div className={m.dialogContainer}>
                {messages}
            </div>

            <div className={m.area}  >
                {displayFirstScreen()}
                <div ref={dialogRef} ></div>
            </div>
        </div>
    </>
}

export default DialogWindow;