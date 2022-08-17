import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../lib/contextLib";
import { useFormFields } from "../lib/hooksLib";
import { onError } from "../lib/errorLib";
import "../styles/Signup.css";
import { Auth } from "aws-amplify";
import Cookies from 'universal-cookie';

export default function Signup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  let navigate = useNavigate();
  const [newUser, setNewUser] = useState(null);
  const {userHasAuthenticated} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
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

 function triggerCreateUserAccount(query, requestOptions) {
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

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);     

    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            className="margin-left-none"
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
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
      </Form>
    );
  }

  return (
    <div className="Signup"> {renderForm()} </div>
  );
}
