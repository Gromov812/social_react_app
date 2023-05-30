import React, { useEffect } from 'react'
import Wall from './Wall';
import UserProfileInfo from '../Profile/UserProfileInfo';
import Post from './post';
import { useSelector, useDispatch } from 'react-redux'
import { usersAPI } from '../../DAL/api';
import w from './PostsWall.module.css';
import authorizedSamPicture from '../../assets/img/authorized_Sam.jpg'
import { typeOnWallTextArea, getUserPostsThunkCreator} from '../../redux/wall-reducer';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';


function WallContainer() {

    const isAuthorized = useSelector(state => state.authReducer.authorized);
    const ownerId = useSelector(state => state.authReducer.id);
    const userId = useSelector(state => state.usersReducer.currentProfilePageUserInfo.id);
    const state = useSelector(state => state.wallReducer);
    const dispatch = useDispatch()

    // const Alert = React.forwardRef(function Alert(props, ref) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    //   });

    useEffect(() => {
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
                    <img className={w.image} src={authorizedSamPicture} alt="Unauthorized Sam" />
                    <p>You are not authorized.</p>
                 
                    <MuiAlert elevation={6}  variant="filled" severity="info">Use Login: <b>Toby14</b> | Pass: <b>password123</b></MuiAlert>
                    <p className={w.small_text}>or <Link to="/register">register</Link> new account</p>

                </div>
            }
        </>
    )
}

export default WallContainer;