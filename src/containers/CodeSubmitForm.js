import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import '../styles/CodeSubmitForm.css';

// Authentication
import { Auth } from "aws-amplify";

const CodeSubmitForm = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

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

function submitCode(query, requestOptions) {
    fetch(query, requestOptions)
     .then(res => res.json())
     .then(data => {       
       if (data.message === 'Success') {
       const successMessage = "Submission updated successfully.";
       showMessage(successMessage);
       } else {
         const errorMessage = "Something went wrong. Please try again, later.";
         showMessage(null, errorMessage);
       }
     })
     .catch(console.log)
  }
  
  async function onFinish(values) {
    const query = process.env.REACT_APP_API_URL + '/submitCode';
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
        'problemName': values.problemName,
        'problemLink': values.problemLink,
        'solutionLink': values.solutionLink
      })
    };
    submitCode(query, requestOptions);
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
      label="Problem Name" 
      name="problemName"
      rules={[
        {
          required: true,
          message: "Please input the problem name!"
        }
      ]}
      >
        <Input placeholder="Problem Name" />
      </Form.Item>
      <Form.Item label="Problem Link" name='problemLink'
      rules={[
        {
          required: true,
          message: "Please input the problem link!"
        }
      ]}
      >
        <Input placeholder="Leetcode Link" />
      </Form.Item>
      <Form.Item label="Solution Link" name='solutionLink'
      rules={[
        {
          required: true,
          message: "Please input the solution link!"
        }
      ]}>
        <Input placeholder="Github Link" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default CodeSubmitForm;