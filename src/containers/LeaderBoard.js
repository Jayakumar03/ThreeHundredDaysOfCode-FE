import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { Button, message } from 'antd';

// Cookies
import Cookies from 'universal-cookie';

// Styles
import '../styles/LeaderBoard.css';

// Utility.
const getUuid = require('uuid-by-string');

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Number of submissions',
    dataIndex: 'numberOfSubmissions',
    key: 'numberOfSubmissions',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.numberOfSubmissions - b.numberOfSubmissions,    
  },
  {
    title: 'Longest Streak',
    dataIndex: 'longestStreak',
    key: 'longestStreak',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.longestStreak - b.longestStreak,    
  },    
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

function LeaderBoard() {
  const [leaderBoardStats, SetLeaderBoardStats] = useState([]);
  const [timeFilter, SetTimeFilter] = useState("ANY_TIME");
  const [tableHeading, SetTableHeading] = useState("Leader Border - All Time");

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

async function getLeaderBoardWithQuery(query, requestOptions) {
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

async function getLeaderBoardGoogleSSO(){
  const userAuth = await Auth.currentAuthenticatedUser();
  const requestOptions = { 'method': 'GET' };
  const userId = getUuid(userAuth.email);
  const query = process.env.REACT_APP_API_URL + '/google/leaderBoard?userId=' + userId + "&timeFilter=" + timeFilter;                
  getLeaderBoardWithQuery(query, requestOptions);
}

async function getLeaderBoardCognito() {  
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const query = process.env.REACT_APP_API_URL + '/leaderBoard?timeFilter=' + timeFilter;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      }
    };
    getLeaderBoardWithQuery(query, requestOptions);
}

async function getLeaderBoard() {
  const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      getLeaderBoardCognito();
    } else {
      getLeaderBoardGoogleSSO();
    }
}

useEffect(() => {
  getLeaderBoard();
  document.getElementById('all-time-btn').type = 'primary';
}, [timeFilter])

function handleWeeklyButtonClick() {
  SetTimeFilter("WEEK");
  document.getElementById('weekly-btn').type = 'primary';  
  document.getElementById('all-time-btn').type = '';
  SetTableHeading("Leader Board - This Week");
}
function handleAllTimeButtonClick() {
  SetTimeFilter("ANY_TIME");
  document.getElementById('all-time-btn').type = 'primary';
  document.getElementById('weekly-btn').type = '';
  SetTableHeading("Leader Board - All Time");
}

  return (
    <div className='leaderboard-table'>
      <h1>{tableHeading}</h1>
      <Table columns={columns} dataSource={leaderBoardStats} onChange={onChange} />
      <Button
                  className='weekly-btn'
                  id='weekly-btn'
                  
                  onClick={handleWeeklyButtonClick}>
                    Weekly
                  </Button>
                  <Button
                  className='all-time-btn'
                  id='all-time-btn'
                  
                  onClick={handleAllTimeButtonClick}>
                    All Time
                  </Button> 
    </div>
  );
}

export default LeaderBoard;