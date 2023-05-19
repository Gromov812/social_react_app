import React from "react";
import m from './Messages.module.css';


const WriteMessageArea = (props) => {

    let textArea = React.createRef();
    
let sendMessage = () => {
    props.dispatch({type: 'SEND_MESSAGE', conversation_id: props.data.activeDialogId})
    textArea.current.value = '';
}
 
    return <>
    
    <div className={m.area}>
        
            <textarea className={m.textarea} placeholder="Type your message here..." ref={textArea} onChange={(e) => props.dispatch({type: 'GET_MESSAGE_INTO_STATE', text: e.target.value})} ></textarea>
        
        <button className={m.button} onClick={sendMessage}>Send</button>
    </div>
    
    </>
}

export default WriteMessageArea;