import React from "react";
import LikeCounter from "./LikeCounter";
import pw from './PostsWall.module.css';
import { deletePost } from '../../state';




const Post = (props) => {


    let deleteFunc = () => {
        deletePost(props.index);
    }

    function setEditPostProps () {
        props.setEditIndex(props.index)
        props.addEditPostToTextarea(props.text);
        props.setEditStatus(true)
    } 


    let date = new Date(props.sent);
    let dateTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    let dateDay = date.toLocaleDateString();

    return <>
        <div className={pw.post}>
            <i className={pw.edit} onClick={setEditPostProps}></i>
            <i className={pw.delete} onClick={deleteFunc}></i>
            <p className={pw.name}>Alex Alexov <span>{dateDay} at {dateTime}</span></p>
            <pre>{props.text}</pre>
            <LikeCounter likes={props.likes} index={props.index} updateLikes={props.updateLikes} userId={props.id} />
        </div>

    </>
}

export default Post;