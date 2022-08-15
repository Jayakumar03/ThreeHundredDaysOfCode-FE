import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Amplify } from 'aws-amplify';
import config from './config/config.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
      domain: config.cognito.DOMAIN,
        scope: [
          "email",
          "profile",
          "openid"
        ],
    responseType: "code",
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />            
    </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
