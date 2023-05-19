import axios from 'axios';
import React, { useState } from 'react'
import Register from './Register';

 function RegisterContainer() {
    
    const [isSuccsessRegistration, setIsSuccsessRegistration] = useState(false);

function registerUser (login, pass, email) {

    axios.post('http://127.0.0.1:3005/users/register', {
        login: login,
        password: pass,
        email: email
    })
    .then(res => {
        if (res.status == 201) {
            setIsSuccsessRegistration(true)
        }
        console.log(res.status)})
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