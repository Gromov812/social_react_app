import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usersAPI } from "../../DAL/api";
import { deletePost, editPost } from "../../redux/wall-reducer";
import LikeCounter from "./LikeCounter";
import pw from "./PostsWall.module.css";

const Post = (props) => {

  let deleteFunc = () => {
    usersAPI
      .updatepost({ postId: props.postId, type: "deletePost" })
      .then((res) => console.log(res));
    props.dispatch(deletePost(props.index));
  };
  
  function onEdit() {
    props.dispatch(editPost(props.index, props.postId));
  }

  let date = new Date(props.sent);
  let dateTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let dateDay = date.toLocaleDateString();


console.log(props.refs);
props.refs[props.postId]['current'] = useRef();


 const [replyData, setReplyData] = useState({data:'', message: ''});
useEffect(() => {
  // if (props.reply) console.log(props.refs[props.reply]);
 if (props.reply) setReplyData((v) => {
  let dataTime = new Date(props.refs[props.reply]['data']);

  return v = {
    time: dataTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    data: dataTime.toLocaleDateString(),
    message: props.refs[props.reply]['text'],
    name: props.refs[props.reply]['from']
  }
  
})
}, [props.refs[props.reply]])

// console.log(props.refs);
    const replyHandler = () => {
  props.textAreaRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
  props.textAreaRef.current.select();
  props.setReply((v) => v = [props.postId, props.fromName]);
    }

    const scrollToPost = () => {
      props.refs[props.reply]['current']['current'].scrollIntoView({behavior: 'smooth', block: 'center'})
    }

  return (
    <>
      <div className={pw.post} id={props.postId} ref={props.refs[props.postId]['current']}>
        <div className={pw.post__buttons_block}>
        <p className={pw.name}> 
          <Link className={pw.user_link} to={`/user/${props.fromId}`}>
            {props.fromName}
          </Link>
          <span>
            {' '}{dateDay} at {dateTime}
          </span>
        </p>
        {props.homeLander ? (
          props.fromId == props.ownerId ? (
            <div>
              <i className={`${pw.edit} ${pw.post__buttons}`} onClick={onEdit}></i>
              <i className={`${pw.reply} ${pw.post__buttons}`} onClick={replyHandler}></i>
              <i className={`${pw.delete} ${pw.post__buttons}`} onClick={deleteFunc}></i>
              </div>
          ) : (
            <div>
              <i className={`${pw.reply} ${pw.post__buttons}`} onClick={replyHandler}></i>
            <i className={`${pw.delete} ${pw.post__buttons}`} onClick={deleteFunc}></i>
            </div>
          )
        ) : props.fromId == props.ownerId ? (
          <div>
            <i className={`${pw.edit} ${pw.post__buttons}`} onClick={onEdit}></i>
            <i className={`${pw.reply} ${pw.post__buttons}`} onClick={replyHandler}></i>
            <i className={`${pw.delete} ${pw.post__buttons}`} onClick={deleteFunc}></i>
          </div>
        ) : (<>
            <i className={`${pw.reply} ${pw.post__buttons}`} onClick={replyHandler}></i>
        </>
        )}
      

        </div>
        {props.reply ?
        <>
        <span className={pw.reply__metadata}>{replyData.name} {replyData.data} at {replyData.time}</span>
        <div className={pw.reply__block} onClick={scrollToPost} >
            <div className={pw.reply__block_message}>{replyData.message || 'test reply msg'}</div>
        </div> 
        </>
        : 
        ''
        }
        <pre>{props.text}</pre>
        <LikeCounter
          dispatch={props.dispatch}
          likes={props.likes}
          index={props.index}
          postId={props.postId}
          ownerId={props.ownerId}
        />
      </div>
    </>
  );
};

export default Post;
