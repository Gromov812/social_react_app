import React from 'react';
import h from './Header.module.css';
import logo from './react.png';
import { Link } from 'react-router-dom';
import AuthContainer from './AuthContainer';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const Header = ({currentPageName}) => {

    return (<>

  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div className={h.mobile__menu}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentPageName}
          </Typography>
          <AuthContainer />
        </Toolbar>
      </AppBar>
    </Box>

    {/* <header className={h.header}>
    <div className={h.logo}>
    <Link to="/">
    <img src={logo} alt='logo' />
    </Link>

    </div>
  
  </header> */}
    </>
)};

export default Header;