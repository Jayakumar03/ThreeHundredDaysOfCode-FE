import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import ProblemBar from '../components/ProblemBar';
import Editor from '../containers/Editor';
import { useNavigate } from 'react-router-dom';

// Styles.
import '../styles/CodeSubmitForm.css';

// Authentication
import { Auth } from "aws-amplify";
import Cookies from 'universal-cookie';

// Utility.
const getUuid = require('uuid-by-string');

function Problem(){
  const [form] = Form.useForm();
  const [formLayout] = useState('horizontal');
  const [problem, SetProblem] = useState({});
  const [, SetUserStats] = useState(null);
  const problemId = useParams().problemId;
  const navigate = useNavigate();

  async function getUserStats() {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getUserStatsCognito();
    } else {
      getUserStatsGoogleSSO();
    }
  }
  
  async function getUserStatsCognito() {
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
        SetUserStats(responseJson);
          
      })
      .catch((error) => {      
        console.log(error);
      });
  }

  async function getUserStatsGoogleSSO() {
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestOptions = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/me?userId=' +userId;    
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      SetUserStats(responseJson);        
    })
    .catch((error) => {      
      console.log(error);
    });
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

function submitCode(query, requestOptions) {
    fetch(query, requestOptions)
     .then(res => res.json())
     .then(data => {
       if (data.message === 'Success') {
        const tweet_text = encodeURI(
          'Problem ' + data.userStats.numberOfSubmissions + '/300 done 💪 🔥.\n' +
          'I just solved the problem '+ problem.problemName +
          ' on www.threehundreddaysofcode.com\nJoin here to start the 300 day challenge with me.' +
          ' https://discord.gg/6duGefKtyv\ncc @300daysofcode'
          );
         const tweet_url = 'https://twitter.com/intent/tweet?text=' + tweet_text;
         const successMessage = <p>Submission updated successfully. Well done. Click <a href={tweet_url} target="_blank"> here </a> to share on Twitter.</p>;
         showMessage(successMessage);
       } else {
         const errorMessage = "Something went wrong. Please try again, later.";
         showMessage(null, errorMessage);
       }
     })
     .catch(console.log)
  }
  
  async function handleNewProblemClick() {
    navigate('/problemset/all');
  }    
    
  async function onFinish(values) {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      submitCodeWithCognito(values);
    } else {
      submitCodeWithSSO(values);
    }
  }

  async function submitCodeWithSSO(values) {
    const query = process.env.REACT_APP_API_URL + '/google/submitCode';
    const userAuth = await Auth.currentAuthenticatedUser();   
    const userId = getUuid(userAuth.email);
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userId': userId,
        'problemName': values.problemName,
        'problemLink': values.problemLink,
        'solutionLink': values.solutionLink
      })
    };
    submitCode(query, requestOptions);
  }

  async function submitCodeWithCognito(values) {
    const query = process.env.REACT_APP_API_URL + '/submitCode';
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
        'problemName': values.problemName,
        'problemLink': values.problemLink,
        'solutionLink': values.solutionLink
      })
    };
    submitCode(query, requestOptions);
  };

  async function GetProblemFromURL() {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      GetProblemFromURLCognito();
    } else {
      GetProblemFromURLGoogleSSO();
    }
  }

  async function GetProblemFromURLGoogleSSO() {
    
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestOptions = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/problemById?userId=' + userId + "&problemId=" + problemId;
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
        SetProblem(responseJson);
        form.setFieldsValue(responseJson);
        console.log(problem);
        console.log(problem.length);
    })
    .catch((error) => {      
      console.log(error);
    });
  }

  async function GetProblemFromURLCognito() {
    
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const query = process.env.REACT_APP_API_URL + '/problemById?problemId=' + problemId;
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
        SetProblem(responseJson);
        form.setFieldsValue(responseJson);
    })
    .catch((error) => {      
      console.log(error);
    });
}

  
useEffect(() => { 
    GetProblemFromURL();
    getUserStats();
}, []);

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
      <ProblemBar 
      headerText="The name of the problem is "
      problem={problem}
      />
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
      name="problemTitle"
      rules={[
        {
          required: true,
          message: "Please input the problem name!"
        }
      ]}
      >
        <Input placeholder="Problem Name" disabled={false} />
      </Form.Item>
      <Form.Item 
      label="Problem Link" 
      name='problemLink'
      rules={[
        {
          required: true,
          message: "Please input the problem link!"
        }
      ]}
      >
        <Input placeholder="Leetcode Link" disabled={false} />
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
      <div className='submit-btn-container'>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType='submit'>Submit</Button>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" onClick={handleNewProblemClick}>New Problem</Button>
        </Form.Item>
      </div>
    </Form>
    <Editor problem={problem} />
    </div>
  );
};

export default Problem;