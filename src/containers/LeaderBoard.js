import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { message } from 'antd';

import '../styles/LeaderBoard.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Number of submissions',
    dataIndex: 'num_submissions',
    key: 'num_submissions',
  },
  {
    title: 'Longest Streak',
    dataIndex: 'longest_streak',
    key: 'longest_streak',
  },  
];

function LeaderBoard() {
  const [leaderBoardStats, SetLeaderBoardStats] = useState([]);

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

async function getLeaderBoard() {        
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const query = process.env.REACT_APP_API_URL + '/leaderBoard';
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
      SetLeaderBoardStats(responseJson.data);
    })
    .catch((error) => {
      showMessage(null, "Error");
      console.log(error);
    });   
  }

useEffect(() => {
  getLeaderBoard();
}, [])

  return (
    <div className='leaderboard-table'>
      <h1> Leader Board Table</h1>    
    <Table columns={columns} dataSource={leaderBoardStats} />
    </div>
  );
}

export default LeaderBoard;