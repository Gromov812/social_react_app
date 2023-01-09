import React from 'react';
import h from './Header.module.css';
import logo from './react.png';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return <header className={h.header}>
    <div className={h.logo}><Link to="/"><img src={logo} alt='logo' /></Link></div>
  </header>
};

export default Header;