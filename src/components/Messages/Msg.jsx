import React from "react";
import m from './Messages.module.css';

const Msg = (props) => {
    let { text, name, answer, sent } = props;

   
    let time = new Date(+sent);
    sent = time.toLocaleString();


    const displayMessage = () => {
        if (answer) {
            return <>
                <div className={`${m.content} ${m.answer}`}>
                    <div className={m.person}>
                        <div className={m.name}>Me: <span style={{fontWeight:'300'}}>{sent}</span></div>
                    </div>
                    <div className={m.message}>{text}</div>
                </div>
            </>
        }
        if (!answer) {
            return <>
                <div className={m.content}>
                    <div className={m.person}>
                        <div className={m.name}>{name}: <span style={{fontWeight:'300'}}>{sent}</span></div>
                    </div>
                    <div className={m.message}>{text}</div>
                </div>
            </>
        }
    }

    return <div >
            
        {displayMessage()}

    </div>
}

export default Msg;