import { TYPE_ON_WALL_TEXTAREA, ADD_POST, EDIT_POST, UPDATE_LIKES, DELETE_POST  } from "./actionTypes";
import { usersAPI } from '../DAL/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

 let _wallState = {
    updated: false,
    textAreaState: '',
    editData: {
        status: false,
        index: 0,
        postId: 0
    },
    userPosts: [
        {
            id: 1,
             message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
            likes: [9, 2, 3, 1],
            sent: 1672259123420,
        },
        {
            id: 2,
             message: 'This is the second post!',
            likes: [],
            sent: 1672259215520,
        },
        {
            id: 3,
             message: 'Props is props. message named!',
            likes: [2, 3],
            sent: 1672259164367,
        },
        {
            id: 4,
             message: '4th post is here.',
            likes: [],
            sent: 1672259713457,
        },
        {
            id: 5,
             message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
            likes: [1, 2, 32, 323, 23],
            sent: 1672251643744,
        },
        {
            id: 'someRandomId',
             message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aperiam maiores odio vero molestias aspernatur eum temporibus magnam natus ducimus repudiandae adipisci necessitatibus quibusdam obcaecati voluptatibus facere neque tempora nulla.',
            likes: [1],
            sent: 1672259719420,
        }
    ]
}

export const wallReducer = (state = _wallState, action) => {

    switch (action.type) {

        case TYPE_ON_WALL_TEXTAREA: {
            return {
                ...state,
                textAreaState: action.value
            }
        }
        case 'UPDATE_USER_POSTS_STATE' : {
            let incomeUserPosts = JSON.stringify(action.posts);
            incomeUserPosts = JSON.parse(incomeUserPosts);
            incomeUserPosts = incomeUserPosts.map(el =>{
                let date = new Date(el.updated)
                el.updated = date.getTime();
                el.likes = JSON.parse(el.likes)
                return el
            });
            
            return {
                ...state,
                userPosts: incomeUserPosts
            }
        }
        case 'ADD_POST': {

            let newPost = { 'id': crypto.randomUUID(), ' message': state.textAreaState, likes: [], sent: new Date().getTime()}
            let addPostUpdateData = global.structuredClone(state.userPosts);
            let addPostUpdateEditStatus = {...state.editData}



            if (!state.editData.status) {
                state.textAreaState.trim() && addPostUpdateData.unshift(newPost);
            }
            else {
                if (state.textAreaState.trim())  {
                    addPostUpdateData[addPostUpdateEditStatus.index].message = state.textAreaState;
                }
               
            }
            return {
                ...state,
                userPosts : addPostUpdateData,
                textAreaState : '',
                editData: {
                    ...state.editData,
                    status: false
                }
            }
        }

        case EDIT_POST: {
         
            let postsClone = global.structuredClone(state.userPosts);
            let postMessageToEdit = postsClone[action.index].message;

            let editPostUpdateData = {...state.editData}

            editPostUpdateData.status = true;
            editPostUpdateData.index = action.index;
            editPostUpdateData.postId = action.postId;

            return {
                ...state, 
                textAreaState: postMessageToEdit, 
                editData: editPostUpdateData,

            };
        }
        
        case UPDATE_LIKES: {

            let postsClone = global.structuredClone(state.userPosts);
            let postLikes = [...postsClone[action.index].likes]
            let id = action.id;


            if (!postLikes.includes(id)) postLikes.push(id)
            else {
                let likeIndex = postLikes.indexOf(id);
                postLikes.splice(likeIndex, 1);
            }
            postsClone.likes = postLikes;

            return {
                ...state,
                userPosts: postsClone,
            };
        }
         
        case DELETE_POST: {
            let deletePostUpdateData = global.structuredClone(state.userPosts);
            deletePostUpdateData.splice(action.index, 1);
            return {...state,
                userPosts: deletePostUpdateData
            };
        }
            default:
            return state;
    }

}


export const typeOnWallTextArea = (value) => {
    return {type: TYPE_ON_WALL_TEXTAREA, value: value}
}
export const addPost = () => {
    return {type: ADD_POST}
}
export const deletePost = (index) => {
    return {type: DELETE_POST, index: index}
}
export const editPost = (index, postId) => {
    return {type: EDIT_POST, postId: postId, index: index}
}
export const updateLikes = (index, userId) => {
    return {type: UPDATE_LIKES, index: index, id: userId}
}


export const getUserPostsThunkCreator = (ownerId) => {
    return dispatch => {
        console.log(`getUserPostsThunkCreator`);
        usersAPI.getUserPosts(ownerId).then(res => {
            dispatch({ type: 'UPDATE_USER_POSTS_STATE', posts: res.data.posts })
        })
    }
}