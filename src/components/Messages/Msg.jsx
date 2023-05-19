import React from "react";
import m from './Messages.module.css';

const Msg = (props) => {
    let { text, name, answer, sent } = props;

   
    let time = new Date(+sent);
    sent = time.toLocaleTimeString();


    const displayMessage = () => {
        if (answer) {
            return <>
                <div className={`${m.content} ${m.answer}`}>
                    <div className={m.person}>
                        <div className={m.ava}><img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-32.png" alt="" /></div>
                        <div className={m.name}>Me</div>
                    </div>
                    <div className={m.message}><span>{sent}</span>{text}</div>
                </div>
            </>
        }
        if (!answer) {
            return <>
                <div className={m.content}>
                    <div className={m.person}>
                        <div className={m.ava}><img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-32.png" alt="" /></div>
                        <div className={m.name}>{name}</div>
                    </div>
                    <div className={m.message}><span>{sent}</span>{text}</div>
                </div>
            </>
        }
    }

    return <>

        {displayMessage()}

    </>
}

export default Msg;