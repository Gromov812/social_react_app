// export const dialogReducer = (state, action) => {

//     if (action.type == 'SET_MESSAGE_INTO_STATE') {


//        return state._state.messagesPage.contactsData.filter(el => el.id == state._state.messagesPage.activeDialogId)[0].currentMessageText = action.text;
//     }
//     else if (action.type == 'SET_USER_MESSAGE_INTO_TEXTAREA') {
       
//         return state._state.messagesPage.contactsData.filter(el => el.id == state._state.messagesPage.activeDialogId)[0].currentMessageText;
//     }
//     else if (action.type == 'SEND_MESSAGE') {
//         console.log(state._state.messagesPage.contactsData[state._state.messagesPage.activeDialogId].currentMessageText);
//         let newMessage = {sent: new Date().getTime(), conversation: action.conversation_id, text: state._state.messagesPage.contactsData.filter(el => el.id == state._state.messagesPage.activeDialogId)[0].currentMessageText, name: state.getUserName(action.conversation_id), answer: true}
//         state._state.messagesPage.contactsMsg.push(newMessage);
//         state._state.messagesPage.contactsData.filter(el => el.id == state._state.messagesPage.activeDialogId)[0].currentMessageText = '';
//     }
// } 