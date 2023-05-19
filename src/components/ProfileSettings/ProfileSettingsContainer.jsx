import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import { usersAPI } from '../../DAL/api';
import ProfileSettings from './ProfileSettings';
import './ProfileSettings.css';

export default function ProfileSettingsContainer(props) {

    const dispatch = useDispatch();
    const ownerId = useSelector(state => state.authReducer.id);

    const userData = useSelector(state => state.authReducer.userData);
    const cookie = new Cookies();
    const token = cookie.get('cookie localhost');


    let [success, setSuccess] = useState('');

    function onSubmitSettings(e) {
        e.preventDefault();
            usersAPI.updateProfileSettings(token, userData, ownerId).then(res => setSuccess(res.status))
            }

    return (
        <div >
         {success && <p className='success'>Successfully updated!</p>}
         <div className='settings'>
            <form className="form" onSubmit={onSubmitSettings}>
               
               <div className="item">
                <label htmlFor="name">Name: </label>
                <input type="text" id='name' onChange={(e) => dispatch({ type: 'USER_NAME_SETTINGS_HANDLER', name: e.target.value })} value={userData.name} required />
               </div>

               <div className="item">

                <label htmlFor="email">Email: </label>
                <input type="email" id='email' onChange={(e) => dispatch({ type: 'USER_EMAIL_SETTINGS_HANDLER', email: e.target.value })} value={userData.email} required />
                
                </div>

                <div className="item">
                
                <label htmlFor="gender">Gender: </label>
                <select name="gender" id="gender" onChange={(e) => dispatch({ type: 'USER_GENDER_SETTINGS_HANDLER', gender: e.target.value })} value={userData.info.gender} >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </div>

                <div className="item">
                
                <label htmlFor="age">Age: </label>
                <input type="number" id='age' onChange={(e) => dispatch({ type: 'USER_AGE_SETTINGS_HANDLER', age: e.target.value })} value={userData.info.age} />
                </div>
                <div className="item">
                <label htmlFor="city">City: </label>
                <input type="text" id='city' onChange={(e) => dispatch({ type: 'USER_CITY_SETTINGS_HANDLER', city: e.target.value })} value={userData.info.city} />
                
                </div>


                <button type='submit'>Save settings</button>
            </form>
</div>

            <ProfileSettings />
        </div>
    )
}
