import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import LoaderButton from '../../components/buttons/LoaderButton';
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useFormFields } from '../../lib/hooksLib';
import { useAppContext } from "../../lib/contextLib";
import { onError } from '../../lib/errorLib';
import Cookies from 'universal-cookie';

import './Login/Login.css';

// Documentation: https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#change-password
function ForgotPassword() {
  let navigate = useNavigate();
  const [emailProvided, setEmailProvided] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    emailId: "",
    code: "",
    newPassword: ""
  });

  function validateForm() {
    return fields.emailId.length > 0;
  }

  function validateCodeForm() {
    return fields.code && fields.code.length > 0 && fields.newPassword && fields.newPassword.length > 0;
  }

  function handleSubmit(e) {
    // Send confirmation code to user's email.
    Auth.forgotPassword(fields.emailId)
      .then(data => console.log(data))
      .catch(err => console.log(err));
    setEmailProvided(true);
    e.preventDefault();
  }

  async function handleSubmitCodeForm(e) {
    e.preventDefault();
    // Collect confirmation code and new password.
    try {
      await Auth.forgotPasswordSubmit(fields.emailId, fields.code, fields.newPassword);
      try {
        userHasAuthenticated(true);
        var cognitoUser = await Auth.signIn(fields.username, fields.password);
        const jwtToken = cognitoUser.signInUserSession.accessToken.jwtToken;
        const cookies = new Cookies();
        const expiresDate = new Date();
        expiresDate.setFullYear(new Date().getFullYear() + 1);
        cookies.set('isLoggedIn', 'true', { path: '/', expires: expiresDate });
        cookies.set('jwtToken', jwtToken, { path: '/', expires: expiresDate });
        cookies.set('loginType', 'cognito', { path: '/', expires: expiresDate });
        setIsLoading(false);
        navigate("/");
      } catch (e) {
        onError(e);
      }
    } catch (e) {
      onError(e);
    }
  }

  function renderChangePasswordForm() {
    return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="emailId">
          <Form.Label>Email-Id</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.emailId}
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
          Reset Password
        </LoaderButton>
      </Form>
    </div>);
  }

  function renderGetCodeForm() {
    return (
      <div className="Login">
      <Form onSubmit={handleSubmitCodeForm}>
        <Form.Group size="lg" controlId="code">
          <Form.Label>Code</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.code}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" className="margin-top-10" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={fields.newPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          size="lg"
          type="submit"
          className="margin-top-20 button-large"
          isLoading={isLoading}
          disabled={!validateCodeForm()}
        >
          Submit
        </LoaderButton>
      </Form>
      </div>
    );
  }

  return (
    <div className="ForgotPasswordContainer">
      {emailProvided === null ? renderChangePasswordForm() : renderGetCodeForm()}
    </div>
  );
}

export default ForgotPassword;
