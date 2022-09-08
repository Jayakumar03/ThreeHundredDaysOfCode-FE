// React.
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// AntD Elements.
import { HomeOutlined, BookOutlined, NotificationOutlined, QuestionCircleOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
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
    function handleMySubmissionsClick() { navigate("/mySubmissions"); } 
    function handleFAQClick() { navigate("/faq"); }


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
                    <a href="/problemset/all" className='feed-left-panel-title'>Problems</a>
                }
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleNotificationsClick}>
                <Badge style={{ backgroundColor: "blue" }}  count={numberNotifications}>
                    <NotificationOutlined className='feed-left-panel-icon' />
                </Badge>
                {
                    props.showTitle === "true" && 
                    <a href="/notifications" className='feed-left-panel-title'>Notifications</a>
                }                
            </div>                
            <div className='feed-left-panel-icon-title-container' onClick={handleLeaderBoardClick}>
                <DashboardOutlined className='feed-left-panel-icon' />                    
                {
                    props.showTitle === "true" && 
                    <a href="/leaderBoard" className='feed-left-panel-title'>LeaderBoard</a>
                }                
            </div>                
            <div className='feed-left-panel-icon-title-container' onClick={handleMySubmissionsClick}>
                <ProfileOutlined className='feed-left-panel-icon' />                    
                {
                    props.showTitle === "true" && 
                    <a href="/mySubmissions" className='feed-left-panel-title'>My Submissions</a>
                }
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleFAQClick}>
                <QuestionCircleOutlined className='feed-left-panel-icon' />
                {
                    props.showTitle === "true" && 
                    <a href="/faq" className='feed-left-panel-title'>FAQ</a>
                }                
            </div>
        </div>
    );
}

export default FeedLeftPanel; 