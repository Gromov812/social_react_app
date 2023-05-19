import React from 'react'
import h from './Header.module.css';
import { Link } from 'react-router-dom';  

function Auth({setPass, setLogin, authorizeMe, login, pass, errorMessage}) {

    function authorization (e) {
        e.preventDefault();
        authorizeMe(login, pass)
    }

    return (
        <>
        
            <div className={h.auth__block}>
                <form action="submit" onSubmit={authorization}>
                    <label className={h.auth__block_label} htmlFor="login">Login:</label>
                    <input className={h.auth__block_input} placeholder='Login' type="text" id='login' onChange={(e) => setLogin(e.target.value)} value={login} required/>
                    <label className={h.auth__block_label} htmlFor="pass">Password:</label>
                    <input className={h.auth__block_input} placeholder='Password' type="text" id='pass' onChange={(e) => setPass(e.target.value)} value={pass} required/>
                    <button className={h.button} type='submit'>Log in</button>
                </form>
                <div className={h.auth__block_notice}>{errorMessage && <span className={h.auth__block_error}>{errorMessage}</span>}</div>
        <div className={h.register__link}>
        <Link to={'/register'}>Register</Link>
        </div>
            </div>
        </>
    )
}

export default Auth;