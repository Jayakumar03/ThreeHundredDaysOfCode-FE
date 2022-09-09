// React.
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// AntD Elements.
import { HomeOutlined, BookOutlined, NotificationOutlined, QuestionCircleOutlined, DashboardOutlined, ProfileOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

// Authentication.
import { Auth } from "aws-amplify";

// Cookies.
import Cookies from 'universal-cookie';

// Styles.
import '../styles/FeedNew.css';

// Utility.
const getUuid = require('uuid-by-string');

function FeedLeftPanel(props) {
    const [numberNotifications, SetNumberNotifications] = useState(0);
    let navigate = useNavigate();

    function handleHomeClick() { navigate("/"); }
    function handleProblemSetClick() { navigate("/problemset/all"); }
    function handleNotificationsClick() { navigate("/notifications"); }
    function handleLeaderBoardClick() { navigate("/leaderBoard"); }
    function handleFAQClick() { navigate("/faq"); }
    function handleMyFeedClick() { navigate("/feed"); }
    function handleDailyChallenge() { navigate("/problemOfTheDay"); }

    async function GetNumberOfNotificationsWithQuery(query, requestOptions) {
        fetch(query, requestOptions)
        .then(res => res.json())
        .then(responseJson => {
            SetNumberNotifications(responseJson.numberNotifications);
        })
        .catch((error) => {      
        console.log(error);
        });   
    }
    
    async function GetNumberOfNotificationsGoogleSSO(){
        const userAuth = await Auth.currentAuthenticatedUser();
        const requestOptions = { 'method': 'GET' };
        const userId = getUuid(userAuth.email);
        const query = process.env.REACT_APP_API_URL + '/google/numberOfNotifications?userId=' + userId;
        GetNumberOfNotificationsWithQuery(query, requestOptions);
    }
    
    async function GetNumberOfNotificationsCognito() {  
        const currentSessionResponse = await Auth.currentSession();
        const accessToken = currentSessionResponse.getAccessToken();
        const jwtToken = accessToken.getJwtToken();
        const query = process.env.REACT_APP_API_URL + '/numberOfNotifications';
        const requestOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
            }
        };
        GetNumberOfNotificationsWithQuery(query, requestOptions);
    }
    
    async function GetNumberOfNotifications() {
        const cookies = new Cookies();
        const loginType = cookies.get('loginType');
        if (loginType === 'cognito') {
            GetNumberOfNotificationsCognito();
        } else {
            GetNumberOfNotificationsGoogleSSO();
        }
    }

    useEffect(() => { 
        GetNumberOfNotifications();
    }, [])

    return (
        <div className='feed-left-panel'>            
            <div className='feed-left-panel-icon-title-container' onClick={handleHomeClick}> 
                <HomeOutlined className='feed-left-panel-icon' />
                {
                    props.showTitle === "true" &&                     
                    <div className='feed-left-panel-title'>Home</div>
                }
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleProblemSetClick}>
                <BookOutlined className='feed-left-panel-icon' />
                {
                    props.showTitle === "true" && 
                    <div className='feed-left-panel-title'>Problems</div>
                }
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleNotificationsClick}>
                <Badge style={{ backgroundColor: "blue" }}  count={numberNotifications}>
                    <NotificationOutlined className='feed-left-panel-icon' />
                </Badge>
                {
                    props.showTitle === "true" &&                     
                    <div className='feed-left-panel-title'>Notifications</div>
                }                
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleDailyChallenge}>
                <ProfileOutlined className='feed-left-panel-icon' />                    
                {
                    props.showTitle === "true" &&                     
                    <div className='feed-left-panel-title'>Daily Challenge</div>
                }                
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleLeaderBoardClick}>
                <DashboardOutlined className='feed-left-panel-icon' />                    
                {
                    props.showTitle === "true" && 
                    <div className='feed-left-panel-title'>LeaderBoard</div>
                }                
            </div>                
            {/* <div className='feed-left-panel-icon-title-container' onClick={handleMySubmissionsClick}>
                <ProfileOutlined className='feed-left-panel-icon' />                    
                {
                    props.showTitle === "true" && 
                    <a href="/mySubmissions" className='feed-left-panel-title'>My Submissions</a>
                }
            </div> */}
            <div className='feed-left-panel-icon-title-container' onClick={handleMyFeedClick}>
                <UnorderedListOutlined className='feed-left-panel-icon' />                    
                {
                    props.showTitle === "true" &&                     
                    <div className='feed-left-panel-title'>Feed</div>
                }
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleFAQClick}>
                <QuestionCircleOutlined className='feed-left-panel-icon' />
                {
                    props.showTitle === "true" &&                    
                    <div className='feed-left-panel-title'>FAQ</div>
                }                
            </div>
        </div>
    );
}

export default FeedLeftPanel; 