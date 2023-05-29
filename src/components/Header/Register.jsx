import React, { useState } from 'react'
import h from '../Header/Header.module.css'

 function Register({registerUser}) {
    
    let [login, setLogin] = useState('');
    let [pass, setPass] = useState('');
    let [email, setEmail] = useState('');

    return (
        <>
            <div className={h.register__block}>
                <form action="submit" onSubmit={(e) => {
                        e.preventDefault();
                        registerUser(login, pass, email)
                    }}>
                <label htmlFor="email">Email:</label>

                    <input type="text" id='email' onChange={(e)=> setEmail(e.target.value)} value={email} required />
                <label htmlFor="login">Login:</label>
                    <input type="text" id='login' onChange={(e)=> setLogin(e.target.value)} value={login} required />
                <label htmlFor="password">Password:</label>
                    <input type="text" id='password' onChange={(e)=> setPass(e.target.value)} value={pass} required />
                    <button type='submit' >Register user</button>
                </form>

            </div>
        </>
    )
}
export default Register;