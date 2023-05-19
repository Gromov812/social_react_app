import React, { useEffect } from 'react'
import Wall from './Wall';
import UserProfileInfo from '../Profile/UserProfileInfo';
import Post from './post';
import { useSelector, useDispatch } from 'react-redux'
import { usersAPI } from '../../DAL/api';
import w from './PostsWall.module.css';
import authorizedSamPicture from '../../assets/img/authorized_Sam.jpg'
import { typeOnWallTextArea } from '../../redux/wall-reducer';
import { getUserPostsThunkCreator } from '../../redux/wall-reducer';
import axios from 'axios';

function WallContainer() {

    const isAuthorized = useSelector(state => state.authReducer.authorized);
    const ownerId = useSelector(state => state.authReducer.id);
    const userId = useSelector(state => state.usersReducer.currentProfilePageUserInfo.id);
    const state = useSelector(state => state.wallReducer);
    const dispatch = useDispatch()


    useEffect(() => {


        // axios.get(`http://127.0.0.1:3005/getMessages?from_id=${41}&to_id=${42}`)
        // .then(res => console.log(res))
            // axios.get(`http://127.0.0.1:3005/get`)




        if (isAuthorized) {
        dispatch(getUserPostsThunkCreator(ownerId));
        }
    }, [JSON.stringify(state.userPosts), isAuthorized])


        function typeTextArea (e) {
            return dispatch(typeOnWallTextArea(e.target.value))
        }

    const posts = state.userPosts
            .map((item, i) =>
                <Post
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
                />)

    return (
        <>
            {isAuthorized ?
                <>
                    <UserProfileInfo />
                    <Wall state={state} typeTextArea={typeTextArea} ownerId={ownerId} posts={posts} userId={userId} dispatch={dispatch} usersAPI={usersAPI}/>

                </>
                :
                isAuthorized == null ?
                null
                :
                <div className={w.not__autorized_block}>
                    <img className={w.image} src={authorizedSamPicture} alt="Unauthorezid Sam" />
                    <p>You are not authorized.</p>
                </div>
            }
        </>
    )
}

export default WallContainer;