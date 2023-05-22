import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../../DAL/api';
import Register from './Register';

function RegisterContainer() {
    const [isSuccsessRegistration, setIsSuccsessRegistration] = useState(false);
    const [isSuccsessLogin, setIsSuccsessLogin] = useState(false);

    const n = useNavigate();

    useEffect(() => {
        if (isSuccsessLogin) {
            console.log('!!!!!');
            setTimeout(() => {
                console.log('22222');
                n('/', { replace: true });
            }, 1000)
        }
    }, [isSuccsessLogin])

    function registerUser(login, pass, email) {

        axios.post('http://193.168.46.22:3005/users/register', {
            login: login,
            password: pass,
            email: email
        })
            .then(res => {
                if (res.status == 201) {
                    setIsSuccsessRegistration(true);
                    usersAPI.authorizedMe(login, pass).then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            setIsSuccsessLogin(true);
                        }
                    })

                }
                console.log(res.status)
            })
    }
    return (
        <>
            {
                isSuccsessRegistration ?
                    <div>Thanks for registration!</div>
                    :
                    <Register registerUser={registerUser} />
            }
        </>
    )
}
export default RegisterContainer;