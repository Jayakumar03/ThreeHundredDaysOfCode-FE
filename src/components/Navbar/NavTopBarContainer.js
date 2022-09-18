// React.
import React from 'react';

// Styles.
import '../../styles/FeedNew.css';
import '../../styles/Navbar.css';
import '../../styles/Common.css';

// Auth imports
import '../../styles/LandingPage.css';
import '../../styles/LeftPanelDrawer.css';
import NavTopBarAuth from './NavTopBarAuth';
import NavTopBarNoAuth from './NavTopBarNoAuth';
import { useSessionStateContext } from '../../lib/session-context/session-context';


// Replaces old Navbar.js
const NavTopBarContainer = (props) => {
    const { isAuthenticated } = useSessionStateContext();
    return (
        isAuthenticated? <NavTopBarAuth {...props} /> : <NavTopBarNoAuth {...props} />
    );
}

export default NavTopBarContainer;
