import React from 'react';
import h from './Header.module.css';
import AuthContainer from './AuthContainer';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';


const Header = ({currentPageName, setIsOpenMenu, isOpenMenu}) => {

  const isAuthorized = useSelector(state => state.authReducer.authorized);

    return (<>

  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SOCIALS
          </Typography>
        {isAuthorized && 
          <div className={h.mobile__menu}>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <MenuIcon />
          </IconButton>
          </div>
        }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentPageName}
          </Typography>

          <AuthContainer />
       
        </Toolbar>
      </AppBar>
    </Box>

    </>
)};

export default Header;