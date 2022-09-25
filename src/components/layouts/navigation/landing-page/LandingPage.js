import React from 'react';
import { Button } from 'antd';
import LandingFeatureBox from './LandingFeatureBox';

import './LandingPage.css';

function handleOnSignupClick() { window.open("/signup"); }
function handleOnJoinCommunityClick() { window.open("https://discord.gg/6duGefKtyv"); }

function NavbarLandingPage() {
    return (
        <div className='landing-page-body'>
            <div className='landing-main-text-container'>
                <span className='landing-main-text'> Learn With A Community </span>
                <div className='landing-main-button-container'> 
                    <Button onClick={handleOnSignupClick} className='landing-get-started-button'> Get Started </Button>
                    <Button onClick={handleOnJoinCommunityClick} className='landing-join-the-community-button'> Join The Community </Button>
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
            
            <div className='landing-reference-section-container'> 
                <div className='landing-reference-section-title'>Trusted By:</div> 
                <div className='landing-reference-section-logos'>
                    <div className='landing-reference-section-logo'> ThoughtSpot </div>
                    <div className='landing-reference-section-logo'> Spotnana </div>
                    <div className='landing-reference-section-logo'> Airtel </div>
                    </div>
                    <div className='landing-reference-section-logos'>
                    <div className='landing-reference-section-logo'> IIT Guwahati </div>
                    <div className='landing-reference-section-logo'> University Of Windsor </div>
                    <div className='landing-reference-section-logo'> Grab </div>
                </div>
            </div>

            <div className='landing-footer-container'>
                <div className='landing-supported-language-container'> 
                    <div className='landing-supported-language-title'>languages</div>
                    <div className='landing-supported-language-name'>C++</div>
                    <div className='landing-supported-language-name'>Java</div>
                    <div className='landing-supported-language-name'>JS</div> 
                    <div className='landing-supported-language-name'>PhP</div>
                    <div className='landing-supported-language-name'>Python</div>
                </div>

                <div className='landing-social-media-container'>
                    <div className='landing-social-media-title'>social</div>
                    <a className='landing-social-media-link' href=''>linkedIn</a>
                    <a className='landing-social-media-link' href=''>twitter</a>
                    <a className='landing-social-media-link' href=''>discord</a>
                    <a className='landing-social-media-link' href=''>github</a>
                    <a className='landing-social-media-link' href=''>substack</a>
                </div>

                <div className='landing-legal-container'>
                    <div className='landing-social-media-title'>legal</div>
                    <a className='landing-social-media-link' href=''>privacy</a>
                    <a className='landing-social-media-link' href=''>terms</a>            
                </div>
                
                <div className='landing-legal-container'>
                    <div className='landing-social-media-title'>competition</div>
                    <a className='landing-social-media-link' href='/faq'>faq</a>
                    <a className='landing-social-media-link' href='/blog'>blog</a>
                </div>
            </div>
            <div className='landing-copyright-container'> Copyright © 2022 Three Hundred Days Of Code, Inc. All rights reserved. </div>
        </div>
    )
}

export default NavbarLandingPage;