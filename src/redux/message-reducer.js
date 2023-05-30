import { SET_USER_MESSAGES, SET_TO_NULL_UNREAD_COUNTER, SET_CONTACTS, SEND_MESSAGE, SET_CONVERSATION_ID, TYPE_ON_PRIMARY_MESSAGE_TEXTAREA } from "./actionTypes";


let _messageState = {
    activeDialogId: 0,
    currentConversationIndex: 0,
    contactsMsg: [ 
        { sent: 1672259715420, conversation: 1, text: 'Hello, how are u?', name: 'Alex', answer: true },
        { sent: 1672259725420, conversation: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem facilis facere laboriosam, minima ullam excepturi, esse eligendi quasi debitis ab iure aperiam quisquam amet iusto animi pariatur a consectetur.', name: 'Nikita' },
        { sent: 1672259735420, conversation: 1, text: 'Good bye!', name: 'Alex', answer: true },
        { sent: 1672259745420, conversation: 1, text: 'Good Night!!', name: 'Nikita' },
        { sent: 1672259755420, conversation: 2, text: 'Hi there!1', name: 'Anthony' },
        { sent: 1672259765420, conversation: 2, text: 'Hi there!2', name: 'Anthony' },
        { sent: 1672259775420, conversation: 2, text: 'Hi there!3', name: 'Anthony' },
        { sent: 1672259795420, conversation: 2, text: 'Hi there!3', name: 'Anthony', answer: true },
        { sent: 1672259785420, conversation: 2, text: 'Hi there!4', name: 'Anthony' },
        { sent: 1677084416834, conversation: 2, text: '123321', name: 'Anthony' },
        { sent: 1672251545420, conversation: 2, text: 'H! How r u?', name: 'Alex', answer: true },
        { sent: 1672251545430, conversation: 42, text: 'H! How r u?', name: 'Alex', answer: true },
        { sent: 1672251545440, conversation: 42, text: 'H! How r u?', name: 'Alex', answer: true },
        { sent: 1672251565450, conversation: 42, text: 'H! How r u?', name: 'Alex', answer: true },
        { conversation: 4, text: 'Do you like my new IPhone 3Gs?', name: 'Steve Jobs', sent: 1672259755420 },
        { conversation: 4, text: 'Do you like my new IPhone 3Gs?', name: 'Steve Jobs', sent: 1672259755420 },
    ],
    contactsData: [
        { id: 1, name: 'Nikita', unreadCounter: 0, currentMessageText: '', currentMsgCount:0 },
        { id: 2, name: 'Anthony', unreadCounter: 0, currentMessageText: '', currentMsgCount:0 },
        { id: 3, name: 'John Deer', unreadCounter: 0, currentMessageText: '', currentMsgCount:0 },
        { id: 4, name: 'Steve Jobs', unreadCounter: 0, currentMessageText: '', currentMsgCount:0 },
        { id: 5, name: 'Luke Skywalker', unreadCounter: 0, currentMessageText: '', currentMsgCount:0 },
    ]
}

export const messageReducer = (state = _messageState, action) => {
    
    
    switch (action.type) {


        case SET_USER_MESSAGES : {

            let contactsMsgPayload = [];
            
            let ownerId = action.ownerId;
            action.payload.forEach(el => {
                let answer = el.from_id == ownerId ? true : false;
                let time = 
                contactsMsgPayload.push({text: el.message, name: el.name, sent: el.sent, answer: answer, conversation: answer ? el.contragent_id      : el.from_id})
            })

            console.log(contactsMsgPayload);
            return {
                ...state,
                contactsMsg: [...contactsMsgPayload]
            }
        }

        case SET_CONTACTS : {
            let contactsDataPayload = [];
            console.log(action.arr);
            action.arr.forEach(el => {
                
                contactsDataPayload.push({id: el.contragent_id, name: el.name, unreadCounter:el.unread_counter, currentMessageText:''})
            })
              
            console.log(`contactsDataPayload >> `, contactsDataPayload);

            return {
                ...state,
                contactsData: [...contactsDataPayload]
            }
        }

        case SET_CONVERSATION_ID : {

     
        // let getIndex = global.structuredClone(state.contactsData);
        let getIndex = state.contactsData.slice();
        getIndex = getIndex.findIndex(el => el.id == action.id);

        if (getIndex == -1) getIndex = 0
                        
        return {
                ...state,
                activeDialogId: action.id,
                currentConversationIndex: getIndex,

            }

        }

        case TYPE_ON_PRIMARY_MESSAGE_TEXTAREA : {

        let updCurrMsgText = [...state.contactsData];
        updCurrMsgText[state.currentConversationIndex].currentMessageText = action.text;
        return {
            ...state,
            contactsData: updCurrMsgText,
        }
    }

        case SET_TO_NULL_UNREAD_COUNTER: {
            let contactsDataCopy = state.contactsData.slice();
            contactsDataCopy = contactsDataCopy.map(el => {
                if (el.id == action.userId) el.unreadCounter = 0;
                return el;
            })
            

            return {
                ...state,
                contactsData: contactsDataCopy
            }
        }

        case SEND_MESSAGE : {

            console.log(state);

            let newMessage = {
                sent: new Date().getTime(),
                conversation: state.contactsData[state.currentConversationIndex].id,
                text: state.contactsData[state.currentConversationIndex].currentMessageText,
                name: state.contactsData[state.currentConversationIndex].name,
                answer: true
            }
            let newMessageToPush = [...state.contactsMsg];
            let nullContactCurrentMsg = [...state.contactsData];
            if (nullContactCurrentMsg[state.currentConversationIndex].currentMessageText.trim()) newMessageToPush.push(newMessage);


            nullContactCurrentMsg[state.currentConversationIndex].currentMessageText = '';

            return {
                ...state,
                contactsData: nullContactCurrentMsg,
                contactsMsg: newMessageToPush,

            }
        }

        default: 
        return state
    }
}

export const sendMessage = () => {
    return {type: SEND_MESSAGE}
}
export const setConversationId = (id) => {
    return {type: SET_CONVERSATION_ID, id: id}
}
export const typeOnPrimaryMsgTextArea = (text) => {
    return { type: TYPE_ON_PRIMARY_MESSAGE_TEXTAREA, text: text }
}