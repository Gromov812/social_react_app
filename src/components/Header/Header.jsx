import React from 'react';
import h from './Header.module.css';
import logo from './react.png';
import { Link } from 'react-router-dom';
import AuthContainer from './AuthContainer';

const Header = () => {
    return (
    <header className={h.header}>
    <div className={h.logo}>
    <Link to="/">
    <img src={logo} alt='logo' />
    </Link>

    </div>
    <AuthContainer />
  </header>
)};

export default Header;