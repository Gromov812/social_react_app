import React from "react";
import { useState } from "react";
import m from './Messages.module.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Msg = (props) => {
let {text, name, conversation, answer, sent} = props;
// console.log(props);
let time = new Date(sent);
sent = time.toLocaleTimeString();


let answerMsg;
    if (answer) {
        answerMsg = <div className={`${m.content} ${m.answer}`}>
            <div className={m.person}>
                <div className={m.ava}><img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-32.png" alt="" /></div>
                <div className={m.name}>Me</div>
            </div>
            <div className={m.message}><span>{sent}</span>{text}</div>
        </div>
    }
    let Msg;
    if (!answer) {
       Msg = <div className={m.content}>
        <div className={m.person}>
            <div className={m.ava}><img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-32.png" alt="" /></div>
            <div className={m.name}>{name}</div>
        </div>
        <div className={m.message}><span>{sent}</span>{text}</div>
    </div>
    }


    return <>

        <Routes>
            <Route path={`${conversation}`} element={<>
                {Msg}
                {answerMsg}
            </>
            } />
        </Routes>

    </>
}

export default Msg;