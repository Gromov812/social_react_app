import { rerenderEntireTree } from './render';


let state = {
    userSettings: {
        id: 1,
        language: 'Ru'
    },
    messagesPage: {
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
            { sent: 1672251545420, conversation: 2, text: 'H! How r u?', name: 'Alex', answer: true },
            { conversation: 4, text: 'Do you like my new IPhone 3Gs?', name: 'Steve Jobs', sent: 1672259755420 },
        ],
        contactsData: [
            { id: 1, name: 'Nikita', unreadCounter: 0 },
            { id: 2, name: 'Anthony', unreadCounter: 1 },
            { id: 3, name: 'John Deer', unreadCounter: 0 },
            { id: 4, name: 'Steve Jobs', unreadCounter: 3 },
            { id: 5, name: 'Luke Skywalker', unreadCounter: 3 }
        ]
    },
    wallPage: {
        userPosts: [
            {
                id: 1,
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
                likes: [9,2,3,1],
                sent: 1672259123420,
            },
            {
                id: 2,
                text: 'This is the second post!',
                likes: [],
                sent: 1672259215520,
            },
            {
                id: 3,
                text: 'Props is props.text named!',
                likes: [2,3],
                sent: 1672259164367,
            },
            {
                id: 4,
                text: '4th post is here.',
                likes: [],
                sent: 1672259713457,
            },
            {
                id: 5,
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
                likes: [1,2,32,323,23],
                sent: 1672251643744,
            },
            {
                id: 'someRandomId',
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
                likes: [1],
                sent: 1672259719420,
            }
        ]
    }
}

export let addPostOnWall = (text) => {
    let newPost = { 'id': crypto.randomUUID(), 'text': text, likes: [], sent:new Date().getTime() }
    state.wallPage.userPosts.push(newPost)
    rerenderEntireTree(state);
}

export let updateLikes = (index) => {
    if (!state.wallPage.userPosts[index].likes.includes(state.userSettings.id)) {
    state.wallPage.userPosts[index].likes.push(state.userSettings.id);
    }
    else {
        let idIndex = state.wallPage.userPosts[index].likes.indexOf(state.userSettings.id);
        state.wallPage.userPosts[index].likes.splice(idIndex, 1);
    }
    rerenderEntireTree(state); 
}

export let deletePost = (index) => {
    
    state.wallPage.userPosts.splice(index, 1);
    rerenderEntireTree(state); 
}

export let editPost = (index, editText) => {
    
    state.wallPage.userPosts[index].text = editText;

}


export default state;