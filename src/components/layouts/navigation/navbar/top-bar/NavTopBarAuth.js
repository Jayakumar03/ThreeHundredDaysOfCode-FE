// React.
import React from 'react';

// Styles.
import { message } from 'antd';
import '../../../../../styles/FeedNew.css';
import '../../../../../styles/Navbar.css';
import '../../../../../styles/Common.css';
import { AppBar, Typography, IconButton, Toolbar, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';

// Auth imports
import { Auth } from "aws-amplify";
import '../../../../../styles/LandingPage.css';
import '../../../../../styles/LeftPanelDrawer.css';
import SearchBar from '../../../../search-bar/SearchBar';
import { useSessionDispatchContext, useSessionStateContext } from '../../../../../lib/session-context/session-context';

// Replaces old Navbar.js
// This is displayed ONLY if user is authenticated.
// No need to check isAuthenticated to render components
const NavTopBarAuth = (props) => {
    const navBarWidth = (props.open)? `calc(100% - ${props.width}px)`: '100%'

    // Authentication info
    const {isAuthenticated} = useSessionStateContext();
    const { logout } = useSessionDispatchContext();

  
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

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar
                className={appBarClass}
                sx={{ zIndex:123123123, width: navBarWidth }}
                position="fixed" open={props.open}
            >
                <Toolbar variant='dense' className={'nav-appbar-toolbar'}>
                    {/* Render based on auth */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.drawerClick}
                        edge="start"
                        // sx={{ mr: 0, ...(props.open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Logo always appears */}
                    <Typography variant="p" noWrap component="div">
                        <NavLink to='/' className={'logo-box'}>
                            <img src='https://ik.imagekit.io/wfx6bvuzj/300Code/300_CODE__4__-UaQvrImP.png' className='logo-box' />
                        </NavLink>
                    </Typography>
                    <Box sx={{flexGrow:1}} />
                    { process.env.REACT_APP_SHOW_SEARCH === "true" && <SearchBar placeholder="Search..." /> }
                    <Box sx={{flexGrow:1}} />
                    <>
                    <NavLink to="/profile" className={'profile-container'}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </NavLink>
                    <IconButton onClick={logout}>
                        <Logout className={appBarClass} />
                    </IconButton>
                    </>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavTopBarAuth;
