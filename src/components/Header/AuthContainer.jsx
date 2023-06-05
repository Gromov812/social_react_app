import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Auth from './Login';
import Logout from './Logout';
import { usersAPI } from '../../DAL/api';
import Cookies from 'universal-cookie';

import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';


function AuthContainer() {


    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const cookies = new Cookies();
    let state = useSelector(state => state.authReducer);
    let dispatch = useDispatch();
    let isAuthorized = useSelector(state => state.authReducer.authorized);
    let token = cookies.get('cookie localhost');

    let ownerId = useSelector(state => state.authReducer.id);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        
        if (!isExpired(token)) {
            console.log(`not expired`);
            usersAPI.authentification(token, decodeToken(token).id)
                .then(res => {
          
                    let id = decodeToken(token).id
                    dispatch({ type: 'SET_USER_INFO_AFTER_LOGIN', userData: res.data.userInfo, id: id })
                    dispatch({ type: 'SET_AUTHORIZED', authorized: true })
                    return res;
                }).then((res) => {

                    console.log(`refresh token >>`, res.data.token)
                    cookies.remove('cookie localhost');
                    cookies.set('cookie localhost', res.data.token, {path:'/'})
                })
        }
        else {
            cookies.remove('cookie localhost')
            dispatch({ type: 'SET_AUTHORIZED', authorized: false })
            dispatch({ type: 'REMOVE_USER_DATA' });
            navigate('/', {replace: true});
        }

    }, [])

    function authorizeMe(login, pass) {


        usersAPI.authorizedMe(login, pass)
            .then(res => {
                if (res.status == 200) {
                    cookies.set('cookie localhost', res.data.token, {})
                    dispatch({ type: 'SET_USER_INFO_AFTER_LOGIN', userData: res.data.userInfo, id: res.data.userInfo.id })
                    dispatch({ type: 'SET_AUTHORIZED', authorized: true, errorMessage: null })
                }
            })
            .catch(err => {
                // console.log(err);
                if (err.code == 'ERR_NETWORK') return dispatch({ type: 'SET_AUTHORIZED', authorized: false, errorMessage: 'some problems with network' })
                else if (err.response.status == 400) return dispatch({ type: 'SET_AUTHORIZED', authorized: false, errorMessage: 'wrong password or login' })
            })

    }
    function logoutMe() {
        cookies.remove('cookie localhost');
        dispatch({ type: 'SET_AUTHORIZED', authorized: false });
    }


    return (

        <>
   
            {isAuthorized == null ?
            ''
            :
            isAuthorized ?
                <Logout logout={logoutMe} name={state.userData.name} />
                :
                <Auth errorMessage={state.errorMessage} state={state} setLogin={setLogin} setPass={setPassword} login={login} pass={password} authorizeMe={authorizeMe} />
            }
          
        </>
    )
}

export default AuthContainer;