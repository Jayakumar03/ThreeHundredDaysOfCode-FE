// React.
import React from 'react';

// Styles.
// import { Grid, message } from 'antd';
import '../../../../../styles/FeedNew.css';
import '../../../../../styles/Navbar.css';
import '../../../../../styles/Common.css';
import { AppBar, Typography, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';

// Auth imports
import '../../../../../styles/LandingPage.css';
import '../../../../../styles/LeftPanelDrawer.css';

const NavTopBarNoAuth = (props) => {
    const navBarWidth = (props.open)? `calc(100% - ${props.width}px)`: '100%'
    const appBarClass = 'nav-appbar-landing'

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar
                className={appBarClass}
                sx={{ zIndex:123123123, width: navBarWidth }}
                position="fixed" open={props.open}
            >
                <Toolbar variant='dense' className={'nav-appbar-toolbar'}>
                    <Typography variant="p" noWrap component="div">
                        <NavLink to='/' className={'logo-box'}>
                            <img src='https://ik.imagekit.io/wfx6bvuzj/300Code/300_CODE__4__-UaQvrImP.png' className='logo-box'/>
                        </NavLink>
                    </Typography>
                    <>
                        <NavLink className='landing-navbar-text' to='/blog'> Blog </NavLink>
                        <NavLink className='landing-navbar-text' to='/faq'> FAQ </NavLink>
                    </>
                    <Box sx={{flexGrow:1}} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                        <NavLink to="/signup" className={'landing-navbar-button'}>Sign up</NavLink>
                        <NavLink to="/login" className={'landing-navbar-button'}>Log in</NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavTopBarNoAuth;
