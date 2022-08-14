import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication
import { Auth } from "aws-amplify";

// Styles
import '../styles/CodeSubmitForm.css';

function CodeSubmitForm() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [profileData, SetProfileData] = useState([]);

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

async function getProfileData() {        
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
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      SetProfileData(responseJson);
    })
    .catch((error) => {
      showMessage(null, "Error");
      console.log(error);
    });   
  }

  function handleFormSubmit() {}


useEffect(() => {
  getProfileData();
  console.log(profileData.name);
}, [])

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
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
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="Your Name">
        <Input placeholder='Personal Name' value={profileData.name} />
      </Form.Item>
      <Form.Item label="Email Id">
        <Input placeholder="input placeholder" value={profileData.email}/>
      </Form.Item>
      <Form.Item label="Organization">
        <Input placeholder="Company Or Institute Name" value={profileData.org}/>
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button onClick={handleFormSubmit} type="primary">Update</Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default CodeSubmitForm;