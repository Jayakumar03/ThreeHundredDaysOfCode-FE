import React, { useState, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { AppContext } from "./lib/contextLib";

import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from './lib/errorLib';
import Cookies from 'universal-cookie';

import NavbarCustom from './components/Navbar';
import FooterNavbar from './components/FooterNavbar';


// Design Components
import { message } from 'antd';

// Styling
import './App.css';

function App() {
 let navigate = useNavigate();
 const [isAuthenticated, userHasAuthenticated] = useState(false);
 const [isAuthenticating, setIsAuthenticating] = useState(true);
 const [filteredSuggestions, setFilteredSuggestions] = useState([]);
 const [activeSuggestion, setActiveSuggestion] = useState(0);

 useEffect(() => {
  onLoad();
}, []);

async function onLoad() {
  try {
    await Auth.currentSession();
    userHasAuthenticated(true);
  }
  catch(e) {
    if (e !== 'No current user') {
      onError(e);
    }
  }
  setIsAuthenticating(false);
}

 async function handleLogout() {
   await Auth.signOut();
   userHasAuthenticated(false);
   const cookies = new Cookies();
   cookies.remove('isLoggedIn', { path: '/' });
   cookies.remove('jwtToken', { path: '/' });
   navigate("/");
 }
 
 function deleteAllData(query, requestHeaders) {  
   fetch(query, requestHeaders)
   .then(res => res.json())
   .then(data => {
     console.log('Response', data);
     if (data.message === 'Success') {
     const successMessage = "Your data and credentials have been succesfully deleted.";
     showMessage(successMessage);
     } else {
       const errorMessage = "Something went wrong. Please try again, later.";
       showMessage(null, errorMessage);
     }
   })
   .catch(console.log)
 }

function triggerIndexBuild(query, requestOptions) {
  fetch(query, requestOptions)
   .then(res => res.json())
   .then(data => {
     console.log('Response', data);
     if (data.message === 'Success') {
     const successMessage = "Index build triggered successfully.";
     showMessage(successMessage);
     } else {
       const errorMessage = "Something went wrong. Please try again, later.";
       showMessage(null, errorMessage);
     }
   })
   .catch(console.log)
}

 async function handleDeleteAllDataCognitoUser() {
  const query = process.env.REACT_APP_API_URL + '/deleteAllData';
  const res = await Auth.currentSession();
  const accessToken = res.getAccessToken();
  const jwtToken = accessToken.getJwtToken();
  const requestHeaders = {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + jwtToken }
  };
  deleteAllData(query, requestHeaders);
}

async function handleDeleteAllDataGoogleSSO() {  
  const requestHeaders = { 'method': 'POST' };  
  const query = process.env.REACT_APP_API_URL + '/google/deleteAllData';
  deleteAllData(query, requestHeaders);
}

 async function handleDeleteAllData() {  
  const cookies = new Cookies();
  const loginType = cookies.get('loginType', { path: '/' });
  if (loginType === 'cognito') {
    handleDeleteAllDataCognitoUser();
  } else {
    handleDeleteAllDataGoogleSSO();
  }
 }

async function handleTriggerIndexBuildCognitoUser() {
  const query = process.env.REACT_APP_API_URL + '/buildIndex';
  const res = await Auth.currentSession();
  const accessToken = res.getAccessToken();
  const jwtToken = accessToken.getJwtToken();
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken 
    },
    body: JSON.stringify({
      'userId': accessToken.payload.sub,
      'userName': accessToken.payload.username,
      'userEmail': accessToken.payload.username,
      'dataSource': 'ALL'
    })
  };
  triggerIndexBuild(query, requestOptions);
}

async function handleTriggerIndexBuildGoogleSSO() {}

 async function handleTriggerIndexBuild() {
  const cookies = new Cookies();
  const loginType = cookies.get('loginType', { path: '/' });
  if (loginType === 'cognito') {
    handleTriggerIndexBuildCognitoUser();
  } else {
    handleTriggerIndexBuildGoogleSSO();
  }
 }

 function showMessage(success, error, warning) {
  if (success !== null) {
      message.success({
      content: success,
      className: 'display-message',
    });
  } else if (error !== null) {
      message.error({
      content: error,
      className: 'display-message',
    });
  } else if (warning !== null) {
    message.warning({
    content: warning,
    className: 'display-message',
  });
}
}

function handleClick() {
  setFilteredSuggestions([]);
  setActiveSuggestion(-1);
  var elementExists = document.getElementById('searchInputContainer');
  if (elementExists) {
    document.getElementById('searchInputContainer').style.borderRadius = '30px';
    document.getElementById('searchSuggestionContainerId').style.display = 'none';
  }
}

return (
    <div className="App" onClick={handleClick}>
      <div className="app-content">
        <NavbarCustom isAuthenticating={isAuthenticating} isAuthenticated={isAuthenticated} handleLogout={handleLogout} handleDeleteAllData={handleDeleteAllData} handleTriggerIndexBuild={handleTriggerIndexBuild}/>      
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, filteredSuggestions, setFilteredSuggestions, activeSuggestion, setActiveSuggestion }}>
          <AppRoutes />
        </AppContext.Provider>
      </div>
      <FooterNavbar />
    </div>
);
}

export default App;
