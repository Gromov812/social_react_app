import React from 'react';
import { useState } from 'react';
import ProfileHead from '../Profile-header/Profile-head';
import Post from './post';
import pw from './PostsWall.module.css';



const Wall = (props) => {


    let [indexEdit, setEditIndex] = useState();
    let [editStatus, setEditStatus] = useState(false);

    let posts =
        props.data.userPosts
            .sort((a, b) => b.sent - a.sent)
            .map((item, i) => <Post
                addEditPostToTextarea = {addEditPostToTextarea}
                setEditIndex = {setEditIndex}
                setEditStatus = {setEditStatus}
                key = {crypto.randomUUID()}
                likes = {item.likes}
                text = {item.text}
                index = {i}
                updateLikes = {props.updateLikes}
                sent = {item.sent}
            />)

    let postTextFromArea = React.createRef();


    function addEditPostToTextarea(text) {
        
        postTextFromArea.current.value = text;
    }

    function sendPost(value) {
        if (!editStatus) {
            value.trim() && props.addPost(value);
            postTextFromArea.current.value = '';
        }
        else {
            value.trim() && props.editPost(indexEdit, postTextFromArea.current.value);
            postTextFromArea.current.value = '';
            setEditStatus(false);
        }
    }
    return <>
        <ProfileHead />
        <div className={pw.postswall}>
            <div className={pw.add_new_post}>
                <textarea ref={postTextFromArea} cols="80" rows="1" placeholder='New post about..' onKeyDown={(e) => (e.key === 'Enter' && e.ctrlKey) ? sendPost(postTextFromArea.current.value) : ''} tabIndex="13" ></textarea>
                <button onClick={() => sendPost(postTextFromArea.current.value)} className={pw.button}>Post it!</button>
            </div>
        </div>

        <div className={pw.posts}>
            {posts}
        </div>

    </>
}

export default Wall;