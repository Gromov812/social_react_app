import React from 'react'
import h from './Header.module.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function Auth({ setPass, setLogin, authorizeMe, login, pass, errorMessage }) {




    function authorization(e) {
        e.preventDefault();
        authorizeMe(login, pass)
    }

    const loginHandler = (e) => {
        setLogin(e.target.value);
        console.log(login);
    }

    const passwordHandler = (e) => {
        setPass(e.target.value)
    }


    return (
        <>

            <div className={h.auth__block}>
                <form action="submit" onSubmit={authorization}>

                    <TextField InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                        color="success"
                        id="outlined-basic"
                        label="Login"
                        size='small'
                        value={login}
                        onChange={loginHandler}
                        required />
                    <TextField
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        color="success"
                        id="outlined-basic"
                        label="Password"
                        type="password"
                        size='small'
                        value={pass}
                        onChange={passwordHandler}
                        required />

                    {/* <label className={h.auth__block_label} htmlFor="login">Login:</label>
                    <input className={h.auth__block_input} placeholder='Login' type="text" id='login' onChange={(e) => setLogin(e.target.value)} value={login} required/>
                    <label className={h.auth__block_label} htmlFor="pass">Password:</label>
                    <input className={h.auth__block_input} placeholder='Password' type="text" id='pass' onChange={(e) => setPass(e.target.value)} value={pass} required/> */}
                    {/* <button className={h.button} type='submit'>Log in</button> */}
                    <Button variant="contained" type='submit'>Log me in!</Button>

                </form>
                <div className={h.auth__block_notice}>{errorMessage && <span className={h.auth__block_error}>{errorMessage}</span>}</div>
                <div className={h.register__link}>
                    <Link to={'/register'}><Button
                        style={{
                            color: '#FFF'
                        }}
                        color="primary"
                        size="small"
                        variant="text"
                    >Register</Button></Link>
                </div>
            </div>
        </>
    )
}

export default Auth;