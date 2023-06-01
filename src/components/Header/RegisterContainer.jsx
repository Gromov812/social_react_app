import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../../DAL/api';
import Register from './Register';
import { useDispatch } from 'react-redux';

import Cookies from 'universal-cookie';

function RegisterContainer() {

    const cookies = new Cookies();
    let dispatch = useDispatch();

    const navigate = useNavigate();

    function registerUser(login, pass, email) {

        axios.post('http://193.168.46.22:3005/users/register', {
            login: login,
            password: pass,
            email: email
        })
            .then(res => {
                if (res.status == 201) {
                    usersAPI.authorizedMe(login, pass).then((res) => {
                        cookies.set('cookie localhost', res.data.token, {})
                        dispatch({ type: 'SET_USER_INFO_AFTER_LOGIN', userData: res.data.userInfo, id: res.data.userInfo.id })
                        dispatch({ type: 'SET_AUTHORIZED', authorized: true, errorMessage: null })
                        if (res.status == 200) {
                            navigate('/settings', { replace: true });
                        }
                        console.log(res);
                    })

                }
                console.log(res.status)
            })
    }
    return (
        <>
                    <Register registerUser={registerUser} />
        </>
    )
}
export default RegisterContainer;