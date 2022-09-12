import { Button, Form, Input, message } from 'antd';
import React, { useState, useEffect } from 'react';
import ProblemBar from '../components/ProblemBar';
import { useNavigate } from 'react-router-dom';

// Styles.
import '../styles/ProblemOfTheDay.css';

// Authentication
import { Auth } from "aws-amplify";
import Cookies from 'universal-cookie';

// Components
import CodeEditor from './CodeEditor/CodeEditor';
import ProblemDescription from './CodeEditor/ProblemDescription';

// Utility.
const getUuid = require('uuid-by-string');

const ProblemOfTheDay = () => {
  const [form] = Form.useForm();
  const [formLayout] = useState('horizontal');
  const [problem, SetProblem] = useState([]);  
  const [problemId, SetProblemId] = useState("");
  const [, SetUserStats] = useState(null);
  const [logic] = useState("daily");  
  const [problemSet, SetProblemSet] = useState([]);    
  const [problemOfTheDay, SetProblemOfTheDay] = useState({});
  const [totalResults, SetTotalResults] = useState(0);
  const [userId, SetUserId] = useState('');

  let navigate = useNavigate();

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

  async function getProblemOfTheDay() {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getProblemOfTheDayCognito();
    } else {
      getProblemOfTheDayGoogleSSO();
    }
  }

  async function getProblemOfTheDayGoogleSSO() {
    const userAuth = await Auth.currentAuthenticatedUser();
    const requestOptions = { 'method': 'GET' };
    const userId = getUuid(userAuth.email);
    const query = process.env.REACT_APP_API_URL + '/google/problem?userId=' + userId + "&logic=" + logic;
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
        SetProblem(responseJson);
        SetProblemId(responseJson.problemId);
        form.setFieldsValue(responseJson);
    })
    .catch((error) => {      
      console.log(error);
    });
  }

  async function getProblemOfTheDayCognito() {
  const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const query = process.env.REACT_APP_API_URL + '/problem?logic=' + logic;
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
        SetProblemId(responseJson.problemId);
        form.setFieldsValue(responseJson);
    })
    .catch((error) => {      
      console.log(error);
    });
}

async function getUserId() {  
  const cookies = new Cookies();
  const loginType = cookies.get('loginType');
  let userId = '';
  if (loginType === 'cognito') {
      const currentSessionResponse = await Auth.currentSession();
      const accessToken = currentSessionResponse.getAccessToken();        
      userId = accessToken.payload.sub;        
  } else {
      const userAuth = await Auth.currentAuthenticatedUser();        
      userId = getUuid(userAuth.email);      
  }
  SetUserId(userId);
}

useEffect(() => { 
  getProblemOfTheDay(); 
  getUserStats();
  getUserId();
}, [logic])

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
          'I just solved the problem '+ problem.problemTitle +
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
  async function getProblemsWithRequestParams(query, requestOptions) {
    fetch(query, requestOptions)
      .then(res => res.json())
      .then(responseJson => {
        const problemsSet = responseJson.data;
        const max = responseJson.size;
        const rand = 1 + Math.random() * (max - 1);        
        navigate("/problem/" + problemsSet.at(rand).problemId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getProblemSetCognito() {
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const query = process.env.REACT_APP_API_URL + '/problems';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      }
    };
    getProblemsWithRequestParams(query, requestOptions);
  }
  
  async function getProblemSetGoogleSSO() {
    const requestOptions = { 'method': 'GET' };        
    const query = process.env.REACT_APP_API_URL + '/google/problems';
    getProblemsWithRequestParams(query, requestOptions);
  }
  
  async function getProblemSet() {            
      const cookies = new Cookies();
      const loginType = cookies.get('loginType');
      if (loginType === 'cognito') {
        getProblemSetCognito();
      } else {
        getProblemSetGoogleSSO();
      }      
    }

  async function handleNewProblemClick() {    
    await getProblemSet();    
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
        'problemName': values.problemTitle,
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
        'problemName': values.problemTitle,
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

  function renderForm() {
    return (
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
          className="problem-form-text"
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
            ]}
          >
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
        );
  }

    return (
      <div className='problem-solve-page-container'>
        <div className='code-submit-form-parent'>
          <ProblemBar
            headerText="The problem of the day is "
            problem={problem}
          />
          <>{renderForm()}</>
        </div>
          {(problemId.length > 0) && <ProblemDescription problem={problem} />}
          {(problemId.length > 0) && <CodeEditor problem={problem} problemId={problemId} userId={userId} />}
      </div>
    );
};

export default ProblemOfTheDay;