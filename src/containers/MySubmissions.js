import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { message } from 'antd';

import '../styles/LeaderBoard.css';
import Cookies from 'universal-cookie';

const getUuid = require('uuid-by-string');

const columns = [  
  {
    title: 'Problem Name',
    dataIndex: 'problemName',
    key: 'problemName',
  },
  {
    title: 'Problem Link',
    dataIndex: 'problemLink',
    key: 'problemLink',
  },
  {
    title: 'Solution Link',
    dataIndex: 'solutionLink',
    key: 'solutionLink',
  },
  {
    title: 'Submission Date',
    dataIndex: 'submissionDate',
    key: 'submissionDate',
  },
];

function MySubmissions() {
  const [submissionStats, SetSubmissionStats] = useState([]);

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
async function getSubmissionWithRequestParams(query, requestOptions) {
  fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      SetSubmissionStats(responseJson.data);
    })
    .catch((error) => {
      showMessage(null, "Error");
      console.log(error);
    });
}
async function getSubmissionsCognito() {
  const currentSessionResponse = await Auth.currentSession();
  const accessToken = currentSessionResponse.getAccessToken();
  const jwtToken = accessToken.getJwtToken();
  const query = process.env.REACT_APP_API_URL + '/mySubmissions';
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken
    }
  };
  getSubmissionWithRequestParams(query, requestOptions);
}
async function getSubmissionsGoogleSSO() {
  const userAuth = await Auth.currentAuthenticatedUser();
  const requestOptions = { 'method': 'GET' };
  const userId = getUuid(userAuth.email);
  const query = process.env.REACT_APP_API_URL + '/google/mySubmissions?userId=' + userId;
  getSubmissionWithRequestParams(query, requestOptions);
}

async function getSubmissions() {            
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getSubmissionsCognito();
    } else {
      getSubmissionsGoogleSSO();
    }
    
  }

useEffect(() => {
  getSubmissions();
}, [])

  return (
    <div className='leaderboard-table'>
      <h1> My Submissions</h1>    
    <Table columns={columns} dataSource={submissionStats} />
    </div>
  );
}

export default MySubmissions;