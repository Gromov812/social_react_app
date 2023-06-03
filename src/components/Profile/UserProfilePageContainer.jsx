import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserProfilePage from './UserProfilePage';
import { useParams } from 'react-router-dom';
import { usersAPI } from '../../DAL/api';
import Wall from '../Posts/Wall';
import Post from '../Posts/post';
import { typeOnWallTextArea } from '../../redux/wall-reducer';
import { getUserPostsThunkCreator } from '../../redux/wall-reducer';
import { getUserListThunkCreator } from '../../redux/users-reducer';
import Cookies from 'universal-cookie';
import ModalNewMessage from '../Users/ModalNewMessage';

function UserProfilePageContainer() {

    const [isModalActive, setModalActive] = useState(false);
    const [modalData, setModalData] = useState({})

    let userProfileData = useSelector(state => state.usersReducer.currentProfilePageUserInfo);
    let userReducerState = useSelector(state => state.usersReducer);
    let wallReducerState = useSelector(state => state.wallReducer);
    let ownerId = useSelector(state => state.authReducer.id)
    let cookie = new Cookies();
    let token = cookie.get('cookie localhost');
    let dispatch = useDispatch();
    let param = useParams();

    let followed = false;
    userReducerState.userFriendlist && userReducerState.userFriendlist.forEach(el =>  followed = el.id == param.userId ? true : false)

    useEffect(() => {
        dispatch(getUserListThunkCreator(token, ownerId))

        usersAPI.getCurrentUser(param.userId)
            .then(res => {
                dispatch({
                    type: 'SET_CURRENT_PROFILE_DATA',
                    fullName: res.data.name,
                    info: res.data.info,
                    photo: res.data.photo,
                    status: res.data.status,
                    profilePic: res.data.profile_background,
                })
                dispatch(getUserPostsThunkCreator(param.userId))
            })
    }, [param.userId, wallReducerState.userPosts.length, followed])


    function typeTextArea(e) {
        return dispatch(typeOnWallTextArea(e.target.value))
    }

    function followUser(userId, followId) {
        console.log(`followUser called`);

        usersAPI.postFollowUser(userId, followId).then(() => dispatch(getUserListThunkCreator(token, ownerId)));
    }

    function unfollowUser(userId, followId) {
        console.log(`unfollowUser called`);

        usersAPI.deleteUnfollowUser(userId, followId).then(() => dispatch(getUserListThunkCreator(token, ownerId)));
    }

    function sendMessageModalHandler (id, name, photo) {
        setModalActive(true);
        setModalData(data => data = {id, name, photo})
    }

    const textAreaRef = useRef();
    const [isReply, setReply] = useState([null, null]);

    let refs = {};

    const posts = wallReducerState.userPosts.map((item, i) => {


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

return         <Post
setReply={setReply}
refs={refs}
textAreaRef={textAreaRef}
reply={item.reply}
    homeLander={false}
    fromName={item.name}
    fromId={item.from_id}
    ownerId={ownerId}
    message={wallReducerState.textAreaState}
    postId={item.id}
    key={i}
    likes={item.likes}
    text={item.message}
    index={i}
    dispatch={dispatch}
    sent={item.updated}
/>

    }

    


        )

    return (
        <>
        
        <ModalNewMessage isActive={isModalActive} modalData={modalData} setModalActive={setModalActive} />

            <UserProfilePage setActive={sendMessageModalHandler} ownerId={+ownerId} userId={+param.userId} followUser={followUser} unfollowUser={unfollowUser} isFriend={followed} status={userProfileData.status}  profilePic={userProfileData.profilePic} photo={userProfileData.photo} fullName={userProfileData.fullName} contacts={{ facebook: 'fb' }} aboutMe={userProfileData.info} />
            <Wall setReply={setReply} isReply={isReply} textAreaRef={textAreaRef} typeTextArea={typeTextArea} ownerId={ownerId} userId={param.userId} posts={posts} dispatch={dispatch} usersAPI={usersAPI} state={wallReducerState} />
        </>
    )
}

export default UserProfilePageContainer;