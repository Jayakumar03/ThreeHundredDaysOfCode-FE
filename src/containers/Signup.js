import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../lib/contextLib";
import { useFormFields } from "../lib/hooksLib";
import { onError } from "../lib/errorLib";
import { Auth } from "aws-amplify";
import Cookies from 'universal-cookie';
// Styles.
import "../styles/Signup.css";

// Utility.
const getUuid = require('uuid-by-string');

export default function Signup() {
  const [searchParams] = useSearchParams();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  let navigate = useNavigate();
  const [setNewUser] = useState(null);
  const {userHasAuthenticated} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
        const newUser = await Auth.signUp({
          username: fields.email,
          password: fields.password,
          attributes: {
            email: fields.email
          }
        });
        setIsLoading(false);
        setNewUser(newUser);        
        createNewUser();
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
  } 

  async function createUserAccount() {
    const query = process.env.REACT_APP_API_URL + '/createProfile';
    const res = await Auth.currentSession();
    const accessToken = res.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    let referrerId = searchParams.get("__referrerId");
    const userId = accessToken.payload.sub;
    if (referrerId === null) {
      referrerId = userId;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        'userName': "",
        'userId': userId,
        'emailId': accessToken.payload.username,
        'referrerId': referrerId
      })
    };
    triggerCreateUserAccount(query, requestOptions);
  }

  async function createNewUser() {
    userHasAuthenticated(true);
      var cognitoUser = await Auth.signIn(fields.email, fields.password);
      const jwtToken = cognitoUser.signInUserSession.accessToken.jwtToken;
      const cookies = new Cookies();
      const expiresDate = new Date();
      expiresDate.setFullYear(new Date().getFullYear() + 1);
      cookies.set('isLoggedIn', 'true', { path: '/', expires: expiresDate });
      cookies.set('jwtToken', jwtToken, { path: '/', expires: expiresDate });
      cookies.set('loginType', 'cognito', { path: '/', expires: expiresDate });
      createUserAccount();
      navigate("/submission");
  }

  async function triggerCreateUserAccount(query, requestOptions) {
    fetch(query, requestOptions)
     .then(res => res.json())
     .then(data => {
       console.log('Response', data);       
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
      'google', { token: idToken, expiresAt }, user);
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

  function renderForm() {
    return (
      <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg" className="margin-top-10">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="margin-left-none"
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg" className="margin-top-10">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="margin-left-none"
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg" className="margin-top-10">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className="margin-left-none"
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          className="margin-top-20 button-large"
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
        <div className="passwordContainer"> Your Password should have the following:
          <ul>
            <li> Minimum length of 8 characters. </li>
            <li> Should have a special character. </li>
            <li> Should have an uppercase character. </li>
            <li> Should have an lowercase character. </li>
            <li> Should have a numerical value. </li>
          </ul>
        </div>
      
      <hr className="solid divContainer" />      
      <div id="buttonDiv" className="googleSignupContainer"/>
      </Form>
      </div>
    );
  }

  return (
    <div className="Signup"> {renderForm()} </div>
  );
}
