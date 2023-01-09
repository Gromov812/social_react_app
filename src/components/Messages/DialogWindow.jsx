import React from "react";
import m from './Messages.module.css';
import Msg from "./Msg";
import WriteMessageArea from "./WriteMessageArea";


const DialogWindow = (props) => {

    let messages = props.data.contactsMsg.map(el => el)
        .sort((a, b) => a.sent - b.sent)
        // .map(item => {

        //         let time = new Date(item.sent);
        //         time = time.toLocaleTimeString();
        //         item.sent = time.toString();
        //         return item;
        //     })
        .map(el => <Msg key={crypto.randomUUID()} text={el.text} conversation={el.conversation} name={el.name} answer={el.answer} sent={el.sent} />)

    // props.data.contactsMsg.map(el => <Msg key={crypto.randomUUID()} text={el.text} from={el.from} name={el.name} answer={el.answer} sent={el.sent} />)
    // .sort((a,b) => a.props.sent - b.props.sent);
    // messages.map(item => {

    //     let time = new Date(item.props.sent);
    //     time = time.toLocaleTimeString();
    //     item.props.sent = time;
    // })
    // messages.map(item => console.log(item.props));



    // let mes = [];
    //     for (let el in props) {
    //         // console.log(!!props[`${el}`]['contactsMsg'][1]['answer']);
    //         // mes.push(<Msg key={crypto.randomUUID()} text={props[`${el}`]['contactsMsg']['text']} id={props[`${el}`]['contactsMsg']['id']} name={props[`${el}`]['contactsData']['name']}/>)
    //     };
    return <>

        <div className={m.dialogContainer}>
            {messages}
            
                <WriteMessageArea />
            
        </div>

    </>
}

export default DialogWindow;