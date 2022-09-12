import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles.
import '../styles/ProblemOfTheDay.css';

// Authentication
import { Auth } from "aws-amplify";
import Cookies from 'universal-cookie';
// Utility.
const getUuid = require('uuid-by-string');

const ProblemOfTheDay = () => {
  const [logic] = useState("daily");  

  let navigate = useNavigate();

  async function getProblemOfTheDay() {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getProblemOfTheDayCognito();
    } else {
      getProblemOfTheDayGoogleSSO();
    }
  }

  async function getProblemOfTheDayGoogleSSO() {
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestOptions = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/problem?userId=' + userId + "&logic=" + logic;
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      navigate('/problem/' + responseJson.problemId);
    })
    .catch((error) => {      
      console.log(error);
    });
  }

  async function getProblemOfTheDayCognito() {
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const query = process.env.REACT_APP_API_URL + '/problem?logic=' + logic;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      }
    };
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      navigate('/problem/' + responseJson.problemId);
    })
    .catch((error) => {      
      console.log(error);
    });
  }

  useEffect(() => {  getProblemOfTheDay(); }, [logic])  
  return (<></>);
};

export default ProblemOfTheDay;