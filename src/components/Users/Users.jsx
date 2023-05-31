import React from 'react'
import u from './Users.module.css';
import Pagination from '@mui/material/Pagination';


function Users({users, loadMoreUsers, pages, userSearchValue, searchUserInputHandler, currentUsersPage, setPagination}) {
    
    return <div className={u.container}>
    <div className={u.user__search_block}>
        <label htmlFor="user_search-input" >Find user:</label>
        <input onChange={searchUserInputHandler} type="text" className={u.user_search__input} id='user_search-form' placeholder='Enter username...' value={userSearchValue} />
    </div>
            {users}
            <div>
                <button onClick={loadMoreUsers} className={`${u.button} ${u.remove}`}>Load more...</button>
            </div>
            <Pagination page={currentUsersPage} count={pages} onClick={(e) => setPagination(+e.target.textContent)}/>
            </div>
}
export default Users