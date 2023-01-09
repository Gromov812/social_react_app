import React from "react";
import pw from './PostsWall.module.css';
import { useState } from "react";



const LikeCounter = (props) => {
    let likes = props.likes.length;

    let [isLiked , setIsLiked] = useState(props.likes.includes(1));



    function likeIt () {
        setIsLiked(isLiked ? false : true); 
        props.updateLikes(props.index);
        
    }

    let [likeState, setLikeState] = useState(false);

    // function userLike () {
    //     if (likeState) {
    //         setCount(count - 1);
    //         props.updateLikes(count-1, props.index);
    //         setLikeState(false);
    //     }
    //     else {
    //         setCount(count + 1);
    //         props.updateLikes(count+1, props.index);
    //         setLikeState(true)
    //     }
    // }
    return (
        <span className={pw.likes_container}>
            <i className={isLiked ? pw.likes + ' ' + pw.liked : pw.likes} onClick={likeIt}></i>
            {likes <= 0 ? '' : likes} {likes <= 0 ? 'No one like it' : likes == 1 ? 'Like it!' : 'Likes it!'}
        </span>
    )
}
export default LikeCounter;