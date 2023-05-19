import React from "react";
import pw from './PostsWall.module.css';
import { useState } from "react";
import { usersAPI } from "../../DAL/api";



const LikeCounter = (props) => {

    let likes = props.likes.length;

    let [isLiked , setIsLiked] = useState(props.likes.includes(props.ownerId));



    function likeIt () {

        setIsLiked(isLiked ? false : true);
        let postLikes = props.likes;
        if (!postLikes.includes(props.ownerId)) postLikes.push(props.ownerId)
        else {
                let likeIndex = postLikes.indexOf(props.ownerId);
                postLikes.splice(likeIndex, 1);
            }

            console.log(postLikes);
        usersAPI.updatepost({ type:'updateLikes', postId: props.postId, likes: postLikes }).then(res => console.log(res));
        // props.dispatch(updateLikes(props.index, props.userId));
        
    }

    return (
        <span className={pw.likes_container}>
            <i className={isLiked ? pw.likes + ' ' + pw.liked : pw.likes} onClick={likeIt}></i>
            {likes <= 0 ? '' : likes} {likes <= 0 ? 'No one like it' : likes == 1 ? 'Like it!' : 'Likes it!'}
        </span>
    )
}
export default LikeCounter;