// // // import { rerenderEntireTree } from './render';
// // let store = {}
// // let rerenderEntireTree = () => {
// // }

// import { wallReducer } from "./redux/wall-reducer";

// // let _state = {
// //     userSettings: {
// //         id: 1,
// //         language: 'Ru'
// //     },
// //     messagesPage: {
// //         contactsMsg: [
// //             { sent: 1672259715420, conversation: 1, text: 'Hello, how are u?', name: 'Alex', answer: true },
// //             { sent: 1672259725420, conversation: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem facilis facere laboriosam, minima ullam excepturi, esse eligendi quasi debitis ab iure aperiam quisquam amet iusto animi pariatur a consectetur.', name: 'Nikita' },
// //             { sent: 1672259735420, conversation: 1, text: 'Good bye!', name: 'Alex', answer: true },
// //             { sent: 1672259745420, conversation: 1, text: 'Good Night!!', name: 'Nikita' },
// //             { sent: 1672259755420, conversation: 2, text: 'Hi there!1', name: 'Anthony' },
// //             { sent: 1672259765420, conversation: 2, text: 'Hi there!2', name: 'Anthony' },
// //             { sent: 1672259775420, conversation: 2, text: 'Hi there!3', name: 'Anthony' },
// //             { sent: 1672259795420, conversation: 2, text: 'Hi there!3', name: 'Anthony', answer: true },
// //             { sent: 1672259785420, conversation: 2, text: 'Hi there!4', name: 'Anthony' },
// //             { sent: 1672251545420, conversation: 2, text: 'H! How r u?', name: 'Alex', answer: true },
// //             { conversation: 4, text: 'Do you like my new IPhone 3Gs?', name: 'Steve Jobs', sent: 1672259755420 },
// //         ],
// //         contactsData: [
// //             { id: 1, name: 'Nikita', unreadCounter: 0 },
// //             { id: 2, name: 'Anthony', unreadCounter: 1 },
// //             { id: 3, name: 'John Deer', unreadCounter: 0 },
// //             { id: 4, name: 'Steve Jobs', unreadCounter: 3 },
// //             { id: 5, name: 'Luke Skywalker', unreadCounter: 3 }
// //         ]
// //     },
// //     wallPage: {
// //         textAreaState: '',
// //         editData: {
// //             status:false,
// //             index: 0
// //         },
// //         userPosts: [
// //             {
// //                 id: 1,
// //                 text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
// //                 likes: [9,2,3,1],
// //                 sent: 1672259123420,
// //             },
// //             {
// //                 id: 2,
// //                 text: 'This is the second post!',
// //                 likes: [],
// //                 sent: 1672259215520,
// //             },
// //             {
// //                 id: 3,
// //                 text: 'Props is props.text named!',
// //                 likes: [2,3],
// //                 sent: 1672259164367,
// //             },
// //             {
// //                 id: 4,
// //                 text: '4th post is here.',
// //                 likes: [],
// //                 sent: 1672259713457,
// //             },
// //             {
// //                 id: 5,
// //                 text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
// //                 likes: [1,2,32,323,23],
// //                 sent: 1672251643744,
// //             },
// //             {
// //                 id: 'someRandomId',
// //                 text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
// //                 likes: [1],
// //                 sent: 1672259719420,
// //             }
// //         ]
// //     }
// // }

// // export const addPostOnWall = () => {
// //     let newPost = { 'id': crypto.randomUUID(), 'text': _state.wallPage.textAreaState, likes: [], sent:new Date().getTime() }

// //     if (!_state.wallPage.editData.status) {
// //         _state.wallPage.textAreaState.trim() && _state.wallPage.userPosts.push(newPost);
// //         _state.wallPage.textAreaState = '';
// //     }
// //     else {
// //         if (_state.wallPage.textAreaState.trim()) _state.wallPage.userPosts[_state.wallPage.editData.index].text = _state.wallPage.textAreaState;
// //         _state.wallPage.textAreaState = '';
// //         _state.wallPage.editData.status = false;
// //     }

// //     rerenderEntireTree();

// // }

// // export const updateLikes = (index) => {
// //     if (!_state.wallPage.userPosts[index].likes.includes(_state.userSettings.id)) {
// //     _state.wallPage.userPosts[index].likes.push(_state.userSettings.id);
// //     }
// //     else {
// //         let idIndex = _state.wallPage.userPosts[index].likes.indexOf(_state.userSettings.id);
// //         _state.wallPage.userPosts[index].likes.splice(idIndex, 1);
// //     }
// //     rerenderEntireTree(_state); 
// // }

// // export const deletePost = (index) => {

// //     _state.wallPage.userPosts.splice(index, 1);
// //     rerenderEntireTree(); 
// // }

// // export const editPost = (index, postText) => {
// //     console.log(postText);
// //     _state.wallPage.textAreaState = postText;
// //     _state.wallPage.editData.status = true;
// //     _state.wallPage.editData.index = index;

// //     console.log(_state.wallPage);
// //     rerenderEntireTree()
// //     // _state.wallPage.userPosts[index].text = editText;

// // }
// // export const wallTextAreaState = (value) => {

// //     _state.wallPage.textAreaState = value;


// //     rerenderEntireTree();
// // }

// // export function subscribe (observer) {

// //  rerenderEntireTree = observer;
// // }

// // export default _state;


// // import { rerenderEntireTree } from './render';





// export let store = {
//     rerenderEntireTree() {
//     },

//     _state: {
//         userSettings: {
//             id: 1,
//             language: 'Ru'
//         },
//         messagesPage: {
//             activeDialogId: 0,
//             textAreaMessage : '',
//             contactsMsg: [
//                 { sent: 1672259715420, conversation: 1, text: 'Hello, how are u?', name: 'Alex', answer: true },
//                 { sent: 1672259725420, conversation: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem facilis facere laboriosam, minima ullam excepturi, esse eligendi quasi debitis ab iure aperiam quisquam amet iusto animi pariatur a consectetur.', name: 'Nikita' },
//                 { sent: 1672259735420, conversation: 1, text: 'Good bye!', name: 'Alex', answer: true },
//                 { sent: 1672259745420, conversation: 1, text: 'Good Night!!', name: 'Nikita' },
//                 { sent: 1672259755420, conversation: 2, text: 'Hi there!1', name: 'Anthony' },
//                 { sent: 1672259765420, conversation: 2, text: 'Hi there!2', name: 'Anthony' },
//                 { sent: 1672259775420, conversation: 2, text: 'Hi there!3', name: 'Anthony' },
//                 { sent: 1672259795420, conversation: 2, text: 'Hi there!3', name: 'Anthony', answer: true },
//                 { sent: 1672259785420, conversation: 2, text: 'Hi there!4', name: 'Anthony' },
//                 { sent: 1672251545420, conversation: 2, text: 'H! How r u?', name: 'Alex', answer: true },
//                 { conversation: 4, text: 'Do you like my new IPhone 3Gs?', name: 'Steve Jobs', sent: 1672259755420 },
//             ],
//             contactsData: [
//                 { id: 1, name: 'Nikita', unreadCounter: 0, currentMessageText: '' },
//                 { id: 2, name: 'Anthony', unreadCounter: 1, currentMessageText: '' },
//                 { id: 3, name: 'John Deer', unreadCounter: 0, currentMessageText: '' },
//                 { id: 4, name: 'Steve Jobs', unreadCounter: 3, currentMessageText: '' },
//                 { id: 5, name: 'Luke Skywalker', unreadCounter: 3, currentMessageText: '' }
//             ]
//         },
//         wallPage: {
//             textAreaState: '',
//             editData: {
//                 status: false,
//                 index: 0
//             },
//             userPosts: [
//                 {
//                     id: 1,
//                     text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
//                     likes: [9, 2, 3, 1],
//                     sent: 1672259123420,
//                 },
//                 {
//                     id: 2,
//                     text: 'This is the second post!',
//                     likes: [],
//                     sent: 1672259215520,
//                 },
//                 {
//                     id: 3,
//                     text: 'Props is props.text named!',
//                     likes: [2, 3],
//                     sent: 1672259164367,
//                 },
//                 {
//                     id: 4,
//                     text: '4th post is here.',
//                     likes: [],
//                     sent: 1672259713457,
//                 },
//                 {
//                     id: 5,
//                     text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
//                     likes: [1, 2, 32, 323, 23],
//                     sent: 1672251643744,
//                 },
//                 {
//                     id: 'someRandomId',
//                     text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
//                     likes: [1],
//                     sent: 1672259719420,
//                 }
//             ]
//         }
//     },
//     setActiveDialogId(id) {
//         this._state.messagesPage.activeDialogId = id;
//     },
//     getUserName(userId) {
//         let userName = this._state.messagesPage.contactsData.filter(el => el.id == userId)[0].name;
//         return userName;
//     },
//     getState() {
//         return this._state;
//     },

//     subscribe(observer) {

//         this.rerenderEntireTree = observer;
//     },
   
// dispatch(action) {

// wallReducer(this._state, action);



//          if (action.type == 'SET_MESSAGE_INTO_STATE') {
//             this._state.messagesPage.contactsData.filter(el => el.id == this._state.messagesPage.activeDialogId)[0].currentMessageText = action.text;
//             console.log(this._state.messagesPage.contactsData);
//         }
//         else if (action.type == 'SET_USER_MESSAGE_INTO_TEXTAREA') {
//             return this._state.messagesPage.contactsData.filter(el => el.id == this._state.messagesPage.activeDialogId)[0].currentMessageText;
//         }
//         else if (action.type == 'SEND_MESSAGE') {
//             console.log(this._state.messagesPage.contactsData[this._state.messagesPage.activeDialogId].currentMessageText);
//             let newMessage = {sent: new Date().getTime(), conversation: action.conversation_id, text: this._state.messagesPage.contactsData.filter(el => el.id == this._state.messagesPage.activeDialogId)[0].currentMessageText, name: this.getUserName(action.conversation_id), answer: true}
//             this._state.messagesPage.contactsMsg.push(newMessage);
//             this._state.messagesPage.contactsData.filter(el => el.id == this._state.messagesPage.activeDialogId)[0].currentMessageText = '';
//             this.rerenderEntireTree(this._state);
//         };

        
//         this.rerenderEntireTree(this._state);

//     },
// }

// export const typeOnWallActionCreator = (value) => {
//     return {type: 'TYPE_ON_WALL_TEXTAREA', value: value}
// }
// export const addPostActionCreator = () => ({type : 'ADD_POST'});
