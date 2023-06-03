import React from 'react';
import pw from './PostsWall.module.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const Wall = ({ state, posts, ownerId, userId, typeTextArea, dispatch, usersAPI, textAreaRef, isReply, setReply }) => {

function addPost(from, to, message, isReply) {
    
    console.log(isReply);
    if (message.trim()) {
        if (!state.editData.status) {
            dispatch({ type: 'ADD_POST' })
            usersAPI.sendUserWallPost(from, to, message, isReply)
        }
        else {
            dispatch({ type: 'ADD_POST' })
            usersAPI.updatepost({ type: 'editPost', postId: state.editData.postId, message: state.textAreaState }).then(res => console.log(res))
        }
    }
}
       return <>
        <div className={pw.postswall}>
            <div className={pw.add_new_post} >
               
                <textarea ref={textAreaRef}  className={pw.add_new_post__textarea} cols="80" rows="1" placeholder='New post about..'
                    onChange={typeTextArea}
                    onKeyDown={(e) => (e.key === 'Enter' && e.ctrlKey) ? addPost(ownerId, userId || ownerId, state.textAreaState, isReply[0]) : ''} value={state.textAreaState} tabIndex="13" >
                    </textarea>
                    
                   
                {/* <button onClick={() => {addPost(ownerId, userId || ownerId, state.textAreaState)}} className={pw.button}>Post it!</button> */}
                <Button sx={{height: '50px', margin: '0 5px', 'border-color': '#c9c9c9', color: '#242424', minWidth: 'fit-content', textTransform: 'none'}} variant="outlined" onClick={() => {addPost(ownerId, userId || ownerId, state.textAreaState, isReply[0])}} endIcon={<SendIcon />}>
        {!state.editData.status ? 'Send' : 'Save'}
      </Button>
            </div>
            {isReply[0] && <div className={pw.textarea__reply}>Answer to: {isReply[1]} <span style={{cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', background:'#FFF', padding:'2px', borderRadius:'30px', color:'#000'}} onClick={() => setReply((v) => v = [false, false])}>x</span></div>}
        </div>

        <div className={pw.posts}>
            {posts}
        </div>
    </>
}

export default Wall;