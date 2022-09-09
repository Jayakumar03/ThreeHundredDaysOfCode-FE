import React from 'react';
import { Button } from 'antd';
import LandingFeatureBox from './LandingFeatureBox';

import '../styles/LandingPage.css';

function handleOnSignupClick() { window.open("/signup"); }
function handleOnLoginClick() { window.open("/login"); }
function handleOnJoinCommunityClick() { window.open("https://discord.gg/6duGefKtyv"); }

function NavbarLandingPage() {
return (
    <>
        <div className='landing-navbar-outer-container'>            
            <div className='landing-navbar-left-panel'>
                <a href="">
                    <img className='landing-navbar-logo' src='https://ik.imagekit.io/wfx6bvuzj/300Code/300_CODE__4__-UaQvrImP.png'/>
                </a>
                <a className='landing-navbar-text' href='/blog'> Blog </a>
                <a className='landing-navbar-text' href='/faq'> FAQ </a>
            </div>
            <div className='landing-filler' />
            <div className='landing-page-button-container'>
                <Button onClick={handleOnSignupClick} className='landing-navbar-sign-up-button'> Sign up</Button>
                <Button onClick={handleOnLoginClick} className='landing-navbar-log-in-button'> Log in</Button>
            </div>            
        </div>
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
    </>
    )
}

export default NavbarLandingPage;