// React.
import React, { useEffect, useState } from 'react';

// Components.
import CodeCard from '../../components/cards/code-card/CodeCard';
// Authentication.
import { Auth } from "aws-amplify";

// Cookies.
import Cookies from 'universal-cookie';

// Styles.
import './FeedNew.css';

// Utility.
const getUuid = require('uuid-by-string');

function Feed() {
const [feed, SetFeed] = useState([]);

async function GetFeedWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      SetFeed(responseJson.data);
      console.log(responseJson.data);
    })
    .catch((error) => {      
      console.log(error);
    });   
  }
  
  async function GetFeedGoogleSSO(){
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestOptions = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/feed?userId=' + userId + "&pageId=1";
    GetFeedWithQuery(query, requestOptions);
  }
  
  async function GetFeedCognito() {  
      const currentSessionResponse = await Auth.currentSession();
      const accessToken = currentSessionResponse.getAccessToken();
      const jwtToken = accessToken.getJwtToken();
      const query = process.env.REACT_APP_API_URL + '/feed?pageId=1';
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwtToken
        }
      };
      GetFeedWithQuery(query, requestOptions);
  }
  
  async function GetFeed() {
    const cookies = new Cookies();
      const loginType = cookies.get('loginType');
      if (loginType === 'cognito') {
        GetFeedCognito();
      } else {
        GetFeedGoogleSSO();
      }
  }

useEffect(() => { 
    GetFeed();
}, [])

    return (
        <>
          {
              feed.length > 0 && feed.map((result) => (
              <CodeCard key={result.postId} card={result}/>
      ))}
      </>
    );
}

export default Feed;