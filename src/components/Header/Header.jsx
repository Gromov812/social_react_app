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
import Badge from "@mui/material/Badge";
import { styled } from '@mui/material/styles';


const Header = ({ setIsOpenMenu, isOpenMenu}) => {

  const isAuthorized = useSelector(state => state.authReducer.authorized);
  let ownerId = useSelector(state => state.authReducer.id);
  const state = useSelector(state => state.messageReducer);
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
  
        await state.contactsData.forEach(async el => {
          await usersAPI.getDialogContactsUnreads(ownerId, el.id)
          .then(res => {
              dispatch({type:'SET_UNREAD_COUNTER', id: el.id, count: res.data.length == 0 ? 0 : res.data[0].unread_counter})
  
          })
      })
      
      })()
    }
    },[state.contactsData.length, ownerId])

    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        padding: `5px`,
        background: '#ff3f3f',
        animation: `1.8s ease-in infinite blinker`
      },
      '@keyframes blinker': {
        '0%': { opacity: 0 },
        '50%': { opacity: 1 },
        '100%': { opacity: 0 },
    },
    }));

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
          {state.currentUnreadCounter > 0 ? 
          <StyledBadge color="secondary" variant="dot" overlap="circular" ><MenuIcon /></StyledBadge>
            :
          <MenuIcon />
        }

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