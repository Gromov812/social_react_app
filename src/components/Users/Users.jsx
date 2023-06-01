import React, { useState } from 'react'
import u from './Users.module.css';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { usersAPI } from '../../DAL/api';
import Preloader from '../Preloader/Preloader'


function Users({state, token, users, pages, isFetching, setFetching }) {
    
    const dispatch = useDispatch();



    const [userSearchValue, setUserSearchValue] = useState('');
    let id = useSelector(state => state.authReducer.id);


    function loadMoreUsers() {
        console.log(token, state.currentUsersPage + 1, state.usersPerList, id);
        setFetching(true);
        usersAPI.getUsers(token, state.currentUsersPage + 1, state.usersPerList, id).then(res => {
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

    function searchUserInputHandler(e) {

        setUserSearchValue(e.target.value)

        usersAPI.getFilteredUsers(e.target.value).then(res => {
            dispatch({ type: 'SET_USERS', users: res.data.users, totalUsersCount: res.data.totalUsers, page: 1 })
        });

    }


    return <>
          {isFetching ? <Preloader /> : 
    <div className={u.container}>
    <div className={u.user__search_block}>
        <label htmlFor="user_search-input" >Find user:</label>
        <input onChange={searchUserInputHandler} type="text" className={u.user_search__input} id='user_search-form' placeholder='Enter username...' value={userSearchValue} />
    </div>
            {users}
            <div>
                <button onClick={loadMoreUsers} className={`${u.button} ${u.remove}`}>Load more...</button>
            </div>
            <Pagination page={state.currentUsersPage} count={pages} onClick={(e) => setPagination(+e.target.textContent)}/>
            </div>
          }
            </>
}
export default Users