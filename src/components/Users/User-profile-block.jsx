import React, { useState } from 'react'
import u from './Users.module.css';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../DAL/api';


function UserProfileBlock({ name, photo, id, dispatch, userId, follow, setActive}) {
const [upd, setUpd] = useState(follow)



const setId = (id) => dispatch({type:'SET_CURRENT_PROFILE_PAGE_USER_ID', id});


function followUser(userId, followId) {
    console.log(`followUser called`);

    usersAPI.postFollowUser(userId, followId).then(res => console.log(res));
}

function unfollowUser(userId, followId) {
    console.log(`unfollowUser called`);

    usersAPI.deleteUnfollowUser(userId, followId).then(res => console.log(res));
}

    return <div key={id} className={u.user_profile}>
  

                <div className={u.right_side}>
                    <div className={u.user_avatar}>
                    <NavLink onClick={setId} to={`/user/${id}`}> <img className={u.user_avatar} src={photo || 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_male_person-256.png'} height="36px" alt={`ava_${name}`} /> </NavLink>
                    </div>
                    <div className={u.user_name}>
                    <NavLink className={u.user_link} onClick={setId} to={`/user/${id}`}> {name} </NavLink>
                    </div>
                </div>
                <div className={u.left_side}>
                <button className={`${u.button} ${u.send__message}`} onClick={() =>  setActive(id, name, photo || 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_male_person-256.png')}>Send message</button>
                    <button onClick={() => {
                    upd ? unfollowUser(userId,id) : followUser(userId,id);
                    setUpd(!upd);
                     }}
                      className={`${u.button} ${upd ? u.add : u.remove}`}>{upd ? 'Remove from friends' : 'Add to friends'}</button>
                </div>
            </div>
           
}

export default UserProfileBlock;

