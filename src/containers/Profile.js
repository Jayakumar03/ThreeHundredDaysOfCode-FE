import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication.
import { Auth } from "aws-amplify";

// Styles,
import '../styles/CodeSubmitForm.css';

// Cookies
import Cookies from 'universal-cookie';

// Utility.
const getUuid = require('uuid-by-string');

function Profile() {
  const [form] = Form.useForm();
  const [formLayout] = useState('horizontal');
  const [, SetProfileData] = useState([]);

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

async function getProfileDataGoogleSSO() {
  const userAuth = await Auth.currentAuthenticatedUser();
  const requestOptions = { 'method': 'GET' };
  const userId = getUuid(userAuth.email);
  const query = process.env.REACT_APP_API_URL + '/google/me?userId=' + userId;
  getProfileDataWithQuery(query, requestOptions);
}

async function getProfileDataCognitoUser() {  
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const query = process.env.REACT_APP_API_URL + '/me';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      }
    };
    getProfileDataWithQuery(query, requestOptions);
  }
  
  async function getProfileDataWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      SetProfileData(responseJson);
      form.setFieldsValue(responseJson);
    })
    .catch((error) => {
      showMessage(null, "Error");
      console.log(error);
    });
  }

  async function getProfileData() {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getProfileDataCognitoUser();
    } else {
      getProfileDataGoogleSSO();
    }
  }
  
  useEffect(() => { getProfileData(); }, [])

function updateProfile(query, requestOptions) {
  fetch(query, requestOptions)
   .then(res => res.json())
   .then(data => {
     console.log('Response', data);
     if (data.message === 'Success') {
     const successMessage = "Profile updated successfully.";
     showMessage(successMessage);
     } else {
       const errorMessage = "Something went wrong. Please try again, later.";
       showMessage(null, errorMessage);
     }
   })
   .catch(console.log)
}

async function onFinish(values) {
  const query = process.env.REACT_APP_API_URL + '/updateProfile';
  const res = await Auth.currentSession();
  const accessToken = res.getAccessToken();
  const jwtToken = accessToken.getJwtToken();
  const userId = accessToken.payload.sub;
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken 
    },
    body: JSON.stringify({
      'userId': userId,
      'name': values.name,
      'email': values.email,
      'org': values.org
    })
  };
  updateProfile(query, requestOptions);
};

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 4,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 4,
            offset: 4,
          },
        }
      : null;
      
  return (
    <div className='code-submit-form-parent'>
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}      
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item 
      label="Your Name" 
      name='name'
      rules={[
        {
          required: true,
          message: "Please input your name!"
        }
      ]}
      >
        <Input placeholder='Personal Name' />
      </Form.Item>

      <Form.Item 
      label="Email Id" 
      name="email"      
      >
      <Input placeholder="input placeholder" disabled={true} />
      </Form.Item>
      <Form.Item label="Organization" name="org">
        <Input placeholder="Company Or Institute Name" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType='submit'>Update</Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Profile;