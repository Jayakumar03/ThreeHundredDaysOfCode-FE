import React from 'react';
import { Button } from 'antd';
import LandingFeatureBox from './LandingFeatureBox';

import '../styles/LandingPage.css';

function NavbarLandingPage() {
return (
    <>
        <div className='landing-navbar-text-container'>
            <a className='landing-navbar-text' href='https://thedailycode.substack.com/'> Blog </a>
            <div className='landing-filler' />
            <div className='landing-page-button-container'>
                <Button className='landing-navbar-sign-up-button'> Sign up</Button>
                <Button className='landing-navbar-log-in-button'> Log in</Button>
            </div>        
        </div>
        <div className='landing-main-text-container'>
            <span className='landing-main-text'> Code With A Community </span>
            <div className='landing-main-button-container'> 
                <Button className='landing-get-started-button'> Get Started </Button>
                <Button className='landing-join-the-community-button'> Join The Community </Button>
            </div>
        </div>

        <div className='landing-features-div-container'> 
            <div className='landing-features-div-title'> Platform Features </div>
            <div className='landing-features-array-div-container'>
                <LandingFeatureBox 
                 title="Community"
                 text="Learn coding with a community"
                />
                <LandingFeatureBox 
                title="Browser Native"
                text="Code using an browser based IDE"
                />                
                <LandingFeatureBox 
                title="Resources"
                text="Free resources to learn new technologies"
                />
                <LandingFeatureBox 
                title="Competitions"
                text="Compete in monthly prizes to earn rewards"
                />
            </div>
        </div>

        <div>
            <div className='landing-reference-section-container'> 
                <div className='landing-reference-section-title'>Trusted By:</div> 
                <div className='landing-reference-section-logos'>
                    <div className='landing-reference-section-logo'> ThoughtSpot </div>
                    <div className='landing-reference-section-logo'> Spotnana </div>
                    <div className='landing-reference-section-logo'> Airtel </div>
                    </div><div className='landing-reference-section-logos'>
                    <div className='landing-reference-section-logo'> IIT Guwahati </div>
                    <div className='landing-reference-section-logo'> University Of Windsor </div>
                    <div className='landing-reference-section-logo'> Grab </div>
                </div>
             </div>
        </div>
    </>
    )
}

export default NavbarLandingPage;