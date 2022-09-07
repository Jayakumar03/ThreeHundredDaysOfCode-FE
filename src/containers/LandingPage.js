import React from 'react';
import { Button } from 'antd';
import '../styles/LandingPage.css';
import NavbarLandingPage from '../components/NavbarLandingPage';

function LandingPage() {
    return(
        <div className='landing-page-body'> <NavbarLandingPage /> </div>
    );
}

export default LandingPage;