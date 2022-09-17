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
import { Auth } from "aws-amplify";
import '../../styles/LandingPage.css';
import '../../styles/LeftPanelDrawer.css';
import NavTopBarAuth from './NavTopBarAuth';
import NavTopBarNoAuth from './NavTopBarNoAuth';
import { useSessionStateContext } from '../../lib/session-context/session-context';


// Replaces old Navbar.js
const NavTopBarContainer = (props) => {
    const { isAuthenticated } = useSessionStateContext();
    return (
        isAuthenticated?
            <NavTopBarAuth {...props} />
        :
            <NavTopBarNoAuth {...props} />
    );
}

export default NavTopBarContainer;
