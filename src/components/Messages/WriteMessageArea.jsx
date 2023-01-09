import React from "react";
import m from './Messages.module.css';


const WriteMessageArea = () => {

    let textarea = React.createRef();

    return <>
    
    <div className={m.area}>
        
            <textarea placeholder="Type your message here..." ref={textarea}></textarea>
        
        <button className={m.button} onClick={() => alert(textarea.current.value)}>Send</button>
    </div>
    
    </>
}

export default WriteMessageArea;