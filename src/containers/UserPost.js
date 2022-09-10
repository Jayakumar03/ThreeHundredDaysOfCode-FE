// React.
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Components.
import CodeCard from '../components/CodeCard';

// Authentication.
import { Auth } from "aws-amplify";

// Cookies.
import Cookies from 'universal-cookie';

// Styles.
import '../styles/LeaderBoard.css';
import '../styles/FeedNew.css';

// Utility.
const getUuid = require('uuid-by-string');

function UserPost() {
const [post, SetPost] = useState({});
const postId = useParams().postId;

async function GetFeedWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
        console.log(responseJson.data);
        console.log(responseJson.data.codeBlock);
        SetPost(responseJson.data);      
    })
    .catch((error) => {
      console.log(error);
    });   
  }
  
  async function GetFeedGoogleSSO(){
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestOptions = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/post?userId=' + userId + "&postId="+postId;
    GetFeedWithQuery(query, requestOptions);
  }
  
  async function GetFeedCognito() {  
      const currentSessionResponse = await Auth.currentSession();
      const accessToken = currentSessionResponse.getAccessToken();
      const jwtToken = accessToken.getJwtToken();
      const query = process.env.REACT_APP_API_URL + '/post?postId='+postId;
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
        <div className = 'user-post-container'>
            {
                post !== undefined && post.numLikes !== undefined &&
                <CodeCard card={post}/>
            }
        </div>
        );
}

export default UserPost;