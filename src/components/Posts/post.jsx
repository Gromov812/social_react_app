import React from "react";
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

  return (
    <>
      <div className={pw.post} id={props.postId}>
        <div className={pw.post__buttons_block}>
        {props.homeLander ? (
          props.fromId == props.ownerId ? (
            <>
              <i className={`${pw.edit} ${pw.post__buttons}`} onClick={onEdit}></i>
              <i className={`${pw.reply} ${pw.post__buttons}`} ></i>
              <i className={`${pw.delete} ${pw.post__buttons}`} onClick={deleteFunc}></i>
            </>
          ) : (
            <>
              <i className={`${pw.reply} ${pw.post__buttons}`} ></i>
            <i className={`${pw.delete} ${pw.post__buttons}`} onClick={deleteFunc}></i>
            </>
          )
        ) : props.fromId == props.ownerId ? (
          <>
            <i className={`${pw.edit} ${pw.post__buttons}`} onClick={onEdit}></i>
            <i className={`${pw.reply} ${pw.post__buttons}`} ></i>
            <i className={`${pw.delete} ${pw.post__buttons}`} onClick={deleteFunc}></i>
          </>
        ) : (
            <i className={pw.reply} ></i>
        )}
        </div>
        <p className={pw.name}> 
          <Link className={pw.user_link} to={`/user/${props.fromId}`}>
            {props.fromName}
          </Link>
          <span>
            {dateDay} at {dateTime}
          </span>
          {/* <span> Reply on: Vasya  <i>25.05.23 at 15:55</i></span> */}
        </p>

        {/* <div className={pw.reply__block}>
       
            <div className={pw.reply__block_message}>The commands your are looking for are editor.action.copyLinesDownAction and editor.action.copyLinesUpAction. he commands your are looking for are editor.action.copyLinesDownAction and editor.action.copyLinesUpAction. he commands your are looking for are editor.action.copyLinesDownAction and editor.action.copyLinesUpAction.</div>
            
        </div> */}
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
