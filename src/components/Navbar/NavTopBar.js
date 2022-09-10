// React.
import React, { useState } from 'react';

// Styles.
import { Grid, message } from 'antd';
import '../../styles/FeedNew.css';
import '../../styles/Navbar.css';
import '../../styles/Common.css';
import { AppBar, Typography, IconButton, Toolbar, Avatar, Button } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';

// Auth imports
import Cookies from 'universal-cookie';
import { Auth } from "aws-amplify";
import '../../styles/LandingPage.css';
import '../../styles/LeftPanelDrawer.css';
import { checkAuth } from '../../utils/ClassUtils';


// Replaces old Navbar.js
function NavTopBar(props) {
    const navBarWidth = (props.open)? `calc(100% - ${props.width}px)`: '100%'

    // Authentication info
    const isAuthenticating = props.isAuthenticating;
    const isAuthenticated = checkAuth()
  
    function showMessage(success, error, warning) {
        if (success !== null) {
            message.success({
                content: success,
                className: 'display-message',
            });
        } else if (error !== null) {
            message.error({
                content: error,
                className: 'display-message',
            });
        } else if (warning !== null) {
            message.warning({
                content: warning,
                className: 'display-message',
            });
        }
    }

    async function handleReferralOnClick() {
        const currentSessionResponse = await Auth.currentSession();
        const accessToken = currentSessionResponse.getAccessToken();
        const url = process.env.REACT_APP_URL + "/signup?" + "__referrerId=" + accessToken.payload.sub;
        navigator.clipboard.writeText(url);
        showMessage('Referral link copied to your clipboard.');    
    }

    let appBarClass = 'nav-appbar'
    if (!isAuthenticated) {
        appBarClass = 'nav-appbar-landing'
    }
    function handleOnSignupClick() { window.open("/signup"); }
    function handleOnLoginClick() { window.open("/login"); }
    
    return (
        !isAuthenticating && (
        <Box sx={{display: 'flex'}}>
            <AppBar
                className={appBarClass}
                sx={{ zIndex:123123123, width: navBarWidth }}
                position="fixed" open={props.open}
            >
                <Toolbar variant='dense' className={'nav-appbar-toolbar'}>
                    {/* Render based on auth */}
                    {
                    isAuthenticated &&
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 0, ...(props.open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                    {/* Logo always appears */}
                    <Typography variant="p" noWrap component="div">
                        <NavLink to='/' className={'logo-box'}>
                            <img src='https://ik.imagekit.io/wfx6bvuzj/300Code/300_CODE__4__-UaQvrImP.png' className='logo-box'/>
                        </NavLink>
                    </Typography>
                    {
                        !isAuthenticated ? <>
                            <NavLink className='landing-navbar-text' to='/blog'> Blog </NavLink>
                            <NavLink className='landing-navbar-text' to='/faq'> FAQ </NavLink>
                        </>: null
                    }
                    <Box sx={{flexGrow:1}}/>

                    {/* Only if logged in */}
                    {isAuthenticated ? <>
                        <NavLink to="/profile" className={'profile-container'}>
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                        </NavLink>
                        <IconButton onClick={props.handleLogout}>
                            <Logout className={appBarClass} />
                        </IconButton>
                    </>: (
                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                            <NavLink to="/signup" className={'landing-navbar-button'}>Sign up</NavLink>
                            <NavLink to="/login" className={'landing-navbar-button'}>Log in</NavLink>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>)
    );
}

export default NavTopBar; 