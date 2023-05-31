import React, { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Users from './Users'
import UserProfileBlock from './User-profile-block'
import Preloader from '../Preloader/Preloader'
import { usersAPI } from '../../DAL/api';
import Cookies from 'universal-cookie';
// import { generatePagination } from './generatePagination';
import { getUserListThunkCreator } from '../../redux/users-reducer';
import ModalNewMessage from './ModalNewMessage';
import { useNavigate } from 'react-router-dom';

function UsersContainer() {
    const [subscribe, setSubscribe] = useState(false);
    const [isFetching, setFetching] = useState(true);
    const [userSearchValue, setUserSearchValue] = useState('');
    const [isModalActive, setModalActive] = useState(false);
    const [modalData, setModalData] = useState({})

    const state = useSelector(state => state.usersReducer)
    const dispatch = useDispatch();
    let id = useSelector(state => state.authReducer.id);
    let isAuthorized = useSelector(state => state.authReducer.authorized);
    const cookie = new Cookies();
    const token = cookie.get('cookie localhost');
    const navigate = useNavigate();


    useLayoutEffect(() => {

        if (isAuthorized) {
            dispatch(getUserListThunkCreator(token, id))
            setFetching(false)
        }
        else navigate('/', { replace: true });
    }, [isAuthorized])


    function sendMessageModalHandler(id, name, photo) {
        setModalActive(true);
        setModalData(data => data = { id, name, photo })
        console.log(modalData);
    }


    // function loadMoreUsers() {
    //     console.log(token, state.currentUsersPage + 1, state.usersPerList, id);
    //     setFetching(true);
    //     usersAPI.getUsers(token, state.currentUsersPage + 1, state.usersPerList, id).then(res => {
    //         dispatch({
    //             type: 'LOAD_MORE_USERS',
    //             users: [...res.data.users],
    //         })
    //     })
    //         .then(() => {
    //             setFetching(false)
    //         })
    // }

    //  function setPagination(page) {

    //     if (!userSearchValue) {
    //         setFetching(true);
    //         usersAPI.getUsers(token, page, state.usersPerList, id)
    //             .then(res => {
    //                 console.log(`pag res >> `, res);
    //                 dispatch({ type: 'SET_PAGINATION_PAGE', page: page, users: [...res.data.users] })
    //             })
    //             .then(() => {
    //                 setFetching(false);
    //             })
    //     }
    //     else {
    //         setFetching(true)
    //         usersAPI.getFilteredUsers(userSearchValue, page).then(res => {
    //             console.log(res);
    //             dispatch({ type: 'SET_USERS', page: page, users: res.data.users, totalUsersCount: res.data.totalUsers })
    //             setFetching(false);
    //         });
    //     }
    // }


    // LEGACY BEFORE MUI
    // let pages = generatePagination(state.currentUsersPage, state.totalPages).map((el, i) => {
    //     return <> <span key={i} onClick={() => setPagination(el)} className={`${u.elem} ${el == state.currentUsersPage ? u.active_elem : ''}`}>{el}</span></>
    // })


    // function followUser(userId, followId) {
    //     console.log(`followUser called`);

    //     usersAPI.postFollowUser(userId, followId).then(res => console.log(res));
    // }

    // function unfollowUser(userId, followId) {
    //     console.log(`unfollowUser called`);

    //     usersAPI.deleteUnfollowUser(userId, followId).then(res => console.log(res));
    // }



    // function searchUserInputHandler(e) {

    //     setUserSearchValue(e.target.value)

    //     usersAPI.getFilteredUsers(e.target.value).then(res => {
    //         dispatch({ type: 'SET_USERS', users: res.data.users, totalUsersCount: res.data.totalUsers, page: 1 })
    //     });

    // }

    let users = state.users
        .map((el, i) => {
            let followed = state.userFriendlist ? state.userFriendlist.map(el => el.id).includes(el.id) : false;
            return <>
                <UserProfileBlock key={i} setActive={sendMessageModalHandler} subscribe={subscribe} setSubscribe={setSubscribe} follow={followed} photo={el.photo} userId={id} name={el.name} id={el.id} dispatch={dispatch} />
            </>

        })

    return <div>
        <h1>USERS LIST</h1>


        <ModalNewMessage isActive={isModalActive} modalData={modalData} setModalActive={setModalActive} />

        {isAuthorized ?
          <Users isFetching={isFetching} setFetching={setFetching} state={state} token={token} userSearchValue={userSearchValue} users={users} pages={state.totalPages}  />
            :
            null
        }

    </div>
}

export default UsersContainer;

