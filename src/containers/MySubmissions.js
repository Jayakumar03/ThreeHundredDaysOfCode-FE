import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { message } from 'antd';

import '../styles/LeaderBoard.css';

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

async function getSubmissions() {        
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