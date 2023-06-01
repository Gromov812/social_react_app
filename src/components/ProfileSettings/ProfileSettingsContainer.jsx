import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { usersAPI } from '../../DAL/api';
import ProfileSettings from './ProfileSettings';
import './ProfileSettings.css';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


export default function ProfileSettingsContainer(props) {

    const dispatch = useDispatch();
    const ownerId = useSelector(state => state.authReducer.id);
    const isAuthorized = useSelector(state => state.authReducer.authorized);
    const userData = useSelector(state => state.authReducer.userData);
    const cookie = new Cookies();
    const token = cookie.get('cookie localhost');
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccess(false);
      };

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/', { replace: true });
        }
    }, [isAuthorized]);

    function onSubmitSettings(e) {
        e.preventDefault();
        usersAPI.updateProfileSettings(token, userData, ownerId).then(res => {
            if (res.status == 200) setSuccess(true)

        })
    }
    return (
        <div >

            {success && <>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={true}
                    onClose={handleClose}
                    autoHideDuration={3000}
                >
                     <Alert severity="success">Settings updated successfully.</Alert>
                </Snackbar>
            </>}
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
                        {/* <label htmlFor="gender">Gender: </label>
                        <select name="gender" id="gender" onChange={(e) => dispatch({ type: 'USER_GENDER_SETTINGS_HANDLER', gender: e.target.value })} value={userData.info.gender} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select> */}
                                <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          label="Gender"
          onChange={(e) => dispatch({ type: 'USER_GENDER_SETTINGS_HANDLER', gender: e.target.value })} 
          value={userData.info.gender}>
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
                    </div>
                    <div className="item">
                        <label htmlFor="age">Age: </label>
                        <input type="number" id='age' onChange={(e) => dispatch({ type: 'USER_AGE_SETTINGS_HANDLER', age: e.target.value })} value={userData.info.age} />
                    </div>
                    <div className="item">
                        <label htmlFor="city">City: </label>
                        <input type="text" id='city' onChange={(e) => dispatch({ type: 'USER_CITY_SETTINGS_HANDLER', city: e.target.value })} value={userData.info.city} />
                    </div>
                    <Button size='small' type='submit'>Save settings</Button>
                    {/* <button type='submit'>Save settings</button> */}
                </form>
            </div>
            <ProfileSettings />
        </div>
    )
}
