import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoaderButton from '../components/LoaderButton';
import { onError } from '../lib/errorLib';
import { useFormFields } from '../lib/hooksLib';
import Cookies from 'universal-cookie';

// Styling.
import "../styles/Login.css";

// Utility.
export const getUuid = require('uuid-by-string');

function Login(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handlePasswordLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      userHasAuthenticated(true);
      var cognitoUser = await Auth.signIn(fields.username, fields.password);
      const jwtToken = cognitoUser.signInUserSession.accessToken.jwtToken;
      const userId = cognitoUser.signInUserSession.accessToken.payload.sub;
      const cookies = new Cookies();
      const expiresDate = new Date();
      expiresDate.setFullYear(new Date().getFullYear() + 1);
      cookies.set('isLoggedIn', 'true', { path: '/', expires: expiresDate });
      cookies.set('jwtToken', jwtToken, { path: '/', expires: expiresDate });
      cookies.set('loginType', 'cognito', { path: '/', expires: expiresDate });
      cookies.set('userId', userId, { path: '/', expires: expiresDate });
      navigate("/home");
    } catch (e) {
      onError(e);
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: data => handleCredentialResponse(data),
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"), // Ensure the element exist and it is a div to display correcctly
      { theme: "outline", size: "large" }  // Customization attributes
    );
  }, []);

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
 
   return JSON.parse(jsonPayload);
 };

async function triggerCreateUserAccount(query, requestOptions) {
  fetch(query, requestOptions)
   .then(res => res.json())
   .then(data => {
     console.log('Response', data);
     if (data.message === 'Success') {
     const successMessage = "Index build triggered successfully.";
     console.log(successMessage);
     } else {
       const errorMessage = "Something went wrong. Please try again, later.";
       console.log(errorMessage);
     }
   })
   .catch(console.log)
}

 async function createUserAccountWithSSO(email, name) {
  const query = process.env.REACT_APP_API_URL + '/google/createProfile';
  let referrerId = searchParams.get("__referrerId");
  const userId = getUuid(email);
  if (referrerId === null) {
    referrerId = userId;
  }
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify({
      'userName': name,
      'userId': userId,
      'emailId': email,
      'referrerId': referrerId
    })
  };
  triggerCreateUserAccount(query, requestOptions);
}

async function handleCredentialResponse(response) {
  const jwtToken = response.credential;
  const payload = parseJwt(jwtToken);
  const idToken = jwtToken;
  const expiresAt = payload.exp;
  const user = {
      email: payload.email,
      name: payload.name
  };
  await Auth.federatedSignIn(
    'google', { token: idToken, expiresAt }, user
  );

  const userId = getUuid(payload.email);
  const cookies = new Cookies();
  const expiresDate = new Date();
  expiresDate.setFullYear(new Date().getFullYear() + 1);
  cookies.set('isLoggedIn', 'true', { path: '/', expires: expiresDate });
  cookies.set('jwtToken', jwtToken, { path: '/', expires: expiresDate });
  cookies.set('loginType', 'googleSSO', { path: '/', expires: expiresDate });
  cookies.set('userId', userId, { path: '/', expires: expiresDate });
  createUserAccountWithSSO(payload.email, payload.name);
  navigate('/');
}

return (
  <div className="login-div-container">
    <span className='login-title-text'> Log in to your account</span>
    <div className="Login">      
      <Form onSubmit={handlePasswordLogin}>
        <Form.Group size="lg" controlId="username">
          <Form.Control
            autoFocus
            type="text"
            placeholder="Email"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group className="margin-top-10" size="lg" controlId="password">          
          <Form.Control
            type="password"
            placeholder="Password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>      
        <LoaderButton
          size="lg"
          type="submit"
          className="margin-top-20 button-large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Log in
        </LoaderButton>
        <div className="signupContainer">Don't have an account? <a href="/signup">Sign up</a></div>
        <div className="forgotPasswordContainer">Forgot your password? <a href="/forgotPassword">Reset password</a></div>
        <hr className="solid divContainer" />
        <div id="buttonDiv" className="googleSignupContainer"/>
      </Form>
    </div>
  </div>
);
}

export default Login;