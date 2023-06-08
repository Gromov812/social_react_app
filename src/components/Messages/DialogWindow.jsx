import React, { useState, useLayoutEffect, useRef } from "react";
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
import axios from 'axios';

const DialogWindow = ({ state, dispatch, dialogRef }) => {

    const [openApiCtx, setOpenApiCtx] = useState([]);
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
                

                                        // ADD OUR MSG TO CTX 
                                        setOpenApiCtx((v) => {
                                            v = [
                                                ...v, 
                                                {role: 'user', content: msg}
                                            ];
                                            return v;
                                        })

                openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [...openApiCtx, {role: 'user', content: msg}],
                    temperature: 1,
                  }).then((res) => {
                    usersAPI.sendMsg(103, ownerId, res.data.choices[0].message.content).then(() => {

                        
                                        // ADD GPT SYSTEM MSG TO CTX 
                                        setOpenApiCtx((v) => {
                                            return [
                                                ...v, 
                                                {role: 'assistant', content: res.data.choices[0].message.content}
                                            ]
                                        })



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
        console.log(openApiCtx);
    }

    useLayoutEffect(() => {
        if (ownerId) {

            if (params['*'] == 103 && openApiCtx.length == 0) {

                axios.get(`http://193.168.46.22:3005/messages/openaicontext?ownerId=${ownerId}`).then(res => {

                let arr = res.data.map(el => {
                    if (el.sys == null) {
                        el = {role: 'user', content: el.usr}
                    }
                    else {
                        el = {role: 'assistant', content: el.sys}
                    }
                    return el;
                })
                    setOpenApiCtx((v) => {
                        return [
                            ...v, 
                            ...arr
                        ]
                    })
                })
            }
           


    

        }

        if (params['*']) {
            console.log(ownerId);
            usersAPI.getDialogMessages(ownerId, params['*']).then(res => {
                dispatch({type:'SET_USER_MESSAGES', payload: res.data, ownerId})
                return res.data
            })

        }
        // console.log(params['*']);
        dispatch(setConversationId(params['*']));
        dispatch({ type: 'SET_TO_NULL_UNREAD_COUNTER', userId: params['*'] });

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