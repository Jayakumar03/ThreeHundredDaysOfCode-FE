import React from 'react';
import { Button } from 'antd';
import '../styles/Home.css';

function Home() {
    function handleClick() {
        window.open("/signup");
    }

    return (
    <div>
        <div className="header-bar">
            <p className='header-text'> Code for 300 days straight, and get a chance to win $100/week in the process. <a href="/challenge"> Learn more </a></p>
        </div>
        <div className='header-span'>
            <img src='https://ik.imagekit.io/wfx6bvuzj/300Code/300_CODE_G1us9B5ug.png' className='home-logo'/>
            <div className='empty-span'/>
            <a href="/login" className="link link-quiet focus-visible understroke active link-quiet navbar-text login-home">Log in</a>
        </div>
    <div className='splash-container '>
        <div className='splash-text-box'>
            <h2> Learn, With A Community </h2>
            <p className='home-subtext'> Can you challange yourself to 300 days of coding? </p>
            <Button className='join-community-btn' type='primary' onClick={handleClick}> Join The Community It's free </Button>
        </div>
        <div><img className='splash-image' src ='https://ik.imagekit.io/wfx6bvuzj/300Code/giphy_JXWyCqrh4.gif' /></div>        
    </div>
    </div>    
    );
}

export default Home;