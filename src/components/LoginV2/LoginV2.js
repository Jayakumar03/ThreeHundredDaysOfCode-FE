import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSessionDispatchContext, useSessionStateContext } from "../../lib/session-context/session-context";
import { useFormFields } from '../../lib/hooksLib';
import LoaderButton from '../../components/LoaderButton';
import Form from "react-bootstrap/Form";
import { GoogleLogin } from "@react-oauth/google";


export const LoginV2 = () => {
    const { isAuthenticated } = useSessionStateContext();
    let navigate = useNavigate();
    return (
        isAuthenticated? navigate("/") : <BasicLogin />
    );
}

const BasicLogin = () => {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const { basicLogin, googleSSOLogin } = useSessionDispatchContext();
    const [searchParams, setSearchParams] = useSearchParams();


    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
      username: "",
      password: ""
    });

    const handleBasicLogin = () => {
        basicLogin(fields.username, fields.password)
    }

    function validateForm() {
      return fields.username.length > 0 && fields.password.length > 0;
    }

    const onFailure = () => {
      console.log("ON_FAILURE!")
    }

    return (
        <div className="login-div-container">
          <span className='login-title-text'> Log in to your account</span>
          <div className="Login">      
            <Form onSubmit={handleBasicLogin}>
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
              <div id="buttonDiv" className="googleSignupContainer">
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={googleSSOLogin}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                />
              </div>
            </Form>
          </div>
        </div>
      );
}