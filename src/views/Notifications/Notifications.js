// React.
import React, { useEffect, useState } from 'react';

// Authentication.
import { Auth } from "aws-amplify";

// Cookies.
import Cookies from 'universal-cookie';

// Components.
import NotificationCard from '../../components/cards/notification-card/NotificationCard';

// Styles.
import './Notifications.css';

// Utility.
const getUuid = require('uuid-by-string');

function Notifications() {
    const [notifications, SetNotifications] = useState([]);

async function GetNotificationsWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
        SetNotifications(responseJson.data);
    })
    .catch((error) => {      
      console.log(error);
    });   
  }
  
  async function GetNotificationsGoogleSSO(){
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestOptions = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/notifications?userId=' + userId + "&pageId=1";
    GetNotificationsWithQuery(query, requestOptions);
  }
  
  async function GetNotificationsCognito() {  
      const currentSessionResponse = await Auth.currentSession();
      const accessToken = currentSessionResponse.getAccessToken();
      const jwtToken = accessToken.getJwtToken();
      const query = process.env.REACT_APP_API_URL + '/notifications?pageId=1';
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwtToken
        }
      };
      GetNotificationsWithQuery(query, requestOptions);
  }
  
  async function GetNotifications() {
    const cookies = new Cookies();
      const loginType = cookies.get('loginType');
      if (loginType === 'cognito') {
        GetNotificationsCognito();
      } else {
        GetNotificationsGoogleSSO();
      }
  }
    
    useEffect(() => { 
        GetNotifications();        
    }, [])

    return (
        <div className='notification-container'>
          <div className='notification-list-container'>
          <div className='notification-header-text'>Notifications</div>
          {
              notifications.length > 0 && notifications.map((result) => (
              <NotificationCard key={result.postId} card={result}/>
              
          ))}
          </div>
      </div>
    );
}


export default Notifications;