import React, { useLayoutEffect } from 'react';
import h from './Header.module.css';
import AuthContainer from './AuthContainer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { usersAPI } from '../../DAL/api';

const Header = ({ setIsOpenMenu, isOpenMenu}) => {

  const isAuthorized = useSelector(state => state.authReducer.authorized);
  let ownerId = useSelector(state => state.authReducer.id);
  const messageContactsData = useSelector(state => state.messageReducer.contactsData);
  const dispatch = useDispatch();


    useLayoutEffect(() => {
      if (ownerId) {
      (async function () {
        await usersAPI.getDialogContacts(ownerId)
        .then(res => { 
            if (res.data !== 'Empty array') {
            let arr = [...res.data];
             arr.map(el => {
                if (el.contragent_id == ownerId) el.contragent_id = el.from_id;
                return el;
            });
            dispatch({type:'SET_CONTACTS', arr: arr })
        }
        })
  
        await messageContactsData.forEach(async el => {
          await usersAPI.getDialogContactsUnreads(ownerId, el.id)
          .then(res => {
              dispatch({type:'SET_UNREAD_COUNTER', id: el.id, count: res.data.length == 0 ? 0 : res.data[0].unread_counter})
  
          })
      })
      
      })()
    }
    },[messageContactsData.length, ownerId])


    return (<>
  
  <Box>
      <AppBar position="static">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              'min-width': 'fit-content', 
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
          <AuthContainer />     
        </Toolbar>
      </AppBar>
    </Box>
    </>
)};

export default Header;