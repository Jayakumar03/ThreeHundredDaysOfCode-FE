// React.
import React from 'react';
import { useSessionStateContext } from '../../../../../lib/session-context/session-context';

// Auth imports
import NavTopBarAuth from './NavTopBarAuth';
import NavTopBarNoAuth from './NavTopBarNoAuth';


// Replaces old Navbar.js
const NavTopBarContainer = (props) => {
    const { isAuthenticated } = useSessionStateContext();
    return (
        isAuthenticated? <NavTopBarAuth {...props} /> : <NavTopBarNoAuth {...props} />
    );
}

export default NavTopBarContainer;
