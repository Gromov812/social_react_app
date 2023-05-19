import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Users from './Users'
import u from './Users.module.css';
import UserProfileBlock from './User-profile-block'
import Preloader from '../Preloader/Preloader'
import { usersAPI } from '../../DAL/api';
import Cookies from 'universal-cookie';
import { generatePagination } from './generatePagination';
import { getUserListThunkCreator } from '../../redux/users-reducer';
import ModalNewMessage from './ModalNewMessage';

function UsersContainer() {
    const [subscribe, setSubscribe] = useState(false);
    const [isFetching, setFetching] = useState(true);
    const [userSearchValue, serUserSearchValue] = useState('');
    const [isModalActive, setModalActive] = useState(false);
    const [modalData, setModalData] = useState({})

    const state = useSelector(state => state.usersReducer)
    const dispatch = useDispatch();
    let id = useSelector(state => state.authReducer.id);
    let isAuthorized = useSelector(state => state.authReducer.authorized);
    const cookie = new Cookies();
    const token = cookie.get('cookie localhost')

    useEffect(() => {


        if (isAuthorized || !id) {
            dispatch(getUserListThunkCreator(token, id))
            setFetching(false)
        }
    }, [isAuthorized])


    function sendMessageModalHandler (id, name, photo) {
        setModalActive(true);
        setModalData(data => data = {id, name, photo})
        console.log(modalData);
    }


    function loadMoreUsers() {
        setFetching(true)
        usersAPI.getUsers(token, state.currentUsersPage + 1, state.usersPerList).then(res => {
            dispatch({
                type: 'LOAD_MORE_USERS',
                users: [...res.data.users],
            })
        })
            .then(() => {
                setFetching(false)
            })
    }

    function setPagination(page) {

        if (!userSearchValue) {
            setFetching(true);
            usersAPI.getUsers(token, page, state.usersPerList, id)
                .then(res => {
                    console.log(`pag res >> `, res);
                    dispatch({ type: 'SET_PAGINATION_PAGE', page: page, users: [...res.data.users] })
                })
                .then(() => {
                    setFetching(false);
                })
        }
        else {
            setFetching(true)
            usersAPI.getFilteredUsers(userSearchValue, page).then(res => {
                console.log(res);
                dispatch({ type: 'SET_USERS', page: page, users: res.data.users, totalUsersCount: res.data.totalUsers })
                setFetching(false);
            });
        }
    }

    let pages = generatePagination(state.currentUsersPage, state.totalPages).map(el => {
        return <> <span key={crypto.randomUUID()} onClick={() => setPagination(el)} className={`${u.elem} ${el == state.currentUsersPage ? u.active_elem : ''}`}>{el}</span></>
    })


    function followUser(userId, followId) {
        console.log(`followUser called`);

        usersAPI.postFollowUser(userId, followId).then(res => console.log(res));
    }

    function unfollowUser(userId, followId) {
        console.log(`unfollowUser called`);

        usersAPI.deleteUnfollowUser(userId, followId).then(res => console.log(res));
    }



    function searchUserInputHandler(e) {
        serUserSearchValue(e.target.value)
        usersAPI.getFilteredUsers(e.target.value).then(res => {
            dispatch({ type: 'SET_USERS', users: res.data.users, totalUsersCount: res.data.totalUsers, page: 1 })
        });
    }

    // console.log(`RERENDER?`);
    let users = state.users
        .map((el) => {
            // console.log(state.userFriendlist);
            let followed = state.userFriendlist ? state.userFriendlist.map(el => el.id).includes(el.id) : false;
            return <>
                <UserProfileBlock key={crypto.randomUUID()} setActive={sendMessageModalHandler} subscribe={subscribe} setSubscribe={setSubscribe} follow={followed} unfollowUser={unfollowUser} followUser={followUser} photo={el.photo} userId={id} name={el.name} id={el.id} dispatch={dispatch} />
            </>

        })

    return <div>
        <h1>USERS LIST</h1>

        
            <ModalNewMessage isActive={isModalActive} modalData={modalData} setModalActive={setModalActive} />

        {isAuthorized ?
            isFetching ? <Preloader /> : <Users userSearchValue={userSearchValue} searchUserInputHandler={searchUserInputHandler} users={users} loadMoreUsers={loadMoreUsers} pages={pages} />
            :
            null
        }

    </div>
}

export default UsersContainer;

