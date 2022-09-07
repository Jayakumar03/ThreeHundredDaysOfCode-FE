import React from 'react';
import '../styles/NavbarLandingPage.css';

function LandingFeatureBox(props) {
    return (
        <div className='landing-feature-box-outer-container'>
            <div className="landing-feature-box-container">            
                <span className="landing-feature-box-container-title"> {props.title} </span>
                <br></br>
                <br></br>
                <span className="landing-feature-box-container-text"> {props.text} </span>
            </div>
        </div>
    );
}

export default LandingFeatureBox;