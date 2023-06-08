import React, { useEffect, useRef, useState } from "react";
import Wall from "./Wall";
import UserProfileInfo from "../Profile/UserProfileInfo";
import Post from "./post";
import { useSelector, useDispatch } from "react-redux";
import { usersAPI } from "../../DAL/api";
import w from "./PostsWall.module.css";
import authorizedSamPicture from "../../assets/img/authorized_Sam.jpg";
import {
  typeOnWallTextArea,
  getUserPostsThunkCreator,
} from "../../redux/wall-reducer";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

function WallContainer() {
  const isAuthorized = useSelector((state) => state.authReducer.authorized);
  const ownerId = useSelector((state) => state.authReducer.id);
  const userId = useSelector(
    (state) => state.usersReducer.currentProfilePageUserInfo.id
  );
  const state = useSelector((state) => state.wallReducer);
  const dispatch = useDispatch();

  const textAreaRef = useRef();

  const [isReply, setReply] = useState([null, null]);
  // const Alert = React.forwardRef(function Alert(props, ref) {
  //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  //   });

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getUserPostsThunkCreator(ownerId));
    }
  }, [JSON.stringify(state.userPosts), isAuthorized]);

  function typeTextArea(e) {
    return dispatch(typeOnWallTextArea(e.target.value));
  }

  let refs = {};

  const posts = state.userPosts.map((item, i) => {
    
    Object.defineProperties(refs, {
      [item.id]: {
        value: {
          current: null,
          text: item.message,
          from: item.name,
          data: item.updated,
        },
      },
    });

    return (
      <Post
        avatar={item.photo}
        setReply={setReply}
        refs={refs}
        textAreaRef={textAreaRef}
        reply={item.reply}
        homeLander={true}
        fromName={item.name}
        fromId={item.from_id}
        ownerId={ownerId}
        message={state.textAreaState}
        postId={item.id}
        key={i}
        likes={item.likes}
        text={item.message}
        index={i}
        dispatch={dispatch}
        sent={item.updated}
      />
    );
  });

  return (
    <>
      {isAuthorized ? (
        <>
          <UserProfileInfo />
          <Wall
            setReply={setReply}
            isReply={isReply}
            textAreaRef={textAreaRef}
            state={state}
            typeTextArea={typeTextArea}
            ownerId={ownerId}
            posts={posts}
            userId={userId}
            dispatch={dispatch}
            usersAPI={usersAPI}
          />
        </>
      ) : isAuthorized == null ? null : (
        <div className={w.not__autorized_block}>
          <p className={w.first__screen_paragraph}>Hi! This is my pet-project. In this case, i've used React with Redux as Front-End and Express.js with MySQL DB as Back-End.</p>
          <p className={w.first__screen_paragraph_header}>Main functionality:</p>
            <ol className={w.first__screen_list}>
              <li>Log-In / Sigh-In / Auth with JWT and cookie-sessions / refresh token when active</li>
              <li>User profile / User settings / Avatars / Background Pics</li>
              <li>All users list / friends list / ability to add-remove user as friend</li>
              <li>User wall posts / posts likes / posts replyes / edit-delete funcs</li>
              <li>Direct messages with users / unread notifications</li>
              <li>Chat-GPT and Yandex Balaboba as companion in DM</li>
            </ol>
          

          <p className={w.first__screen_paragraph_header}>Please!</p>

          <MuiAlert elevation={6} variant="filled" severity="info">
            Use Login: <b>Toby14</b> | Pass: <b>password123</b>
          </MuiAlert>
          <p className={w.small_text}>
            or <Link to="/register">register</Link> new account
          </p>
                    <img
            className={w.image}
            src={authorizedSamPicture}
            alt="Unauthorized Sam"
          />
        </div>
      )}
    </>
  );
}

export default WallContainer;
