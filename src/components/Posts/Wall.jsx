import React from 'react';
import pw from './PostsWall.module.css';



const Wall = ({ state, posts, ownerId, userId, typeTextArea, dispatch, usersAPI }) => {

function addPost(from, to, message) {
    if (message.trim()) {
        if (!state.editData.status) {
            dispatch({ type: 'ADD_POST' })
            usersAPI.sendUserWallPost(from, to, message).then(res => {
            })
        }
        else {
            dispatch({ type: 'ADD_POST' })
            usersAPI.updatepost({ type: 'editPost', postId: state.editData.postId, message: state.textAreaState }).then(res => console.log(res))
        }
    }
}
       return <>
        <div className={pw.postswall}>
            <div className={pw.add_new_post}>
                <textarea cols="80" rows="1" placeholder='New post about..'
                    onChange={typeTextArea}
                    onKeyDown={(e) => (e.key === 'Enter' && e.ctrlKey) ? addPost(ownerId, userId || ownerId, state.textAreaState) : ''} value={state.textAreaState} tabIndex="13" ></textarea>
                <button onClick={() => {addPost(ownerId, userId || ownerId, state.textAreaState)}} className={pw.button}>Post it!</button>
            </div>
        </div>

        <div className={pw.posts}>
            {posts}
        </div>
    </>
}

export default Wall;