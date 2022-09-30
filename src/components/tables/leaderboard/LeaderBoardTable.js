import "antd/dist/antd.css";

import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { Button, message } from 'antd';

// Cookies
import Cookies from 'universal-cookie';

// Styles
import "./LeaderBoard.css";

// Utility.
const getUuid = require('uuid-by-string');

const StyledTable = styled((props) => <Table {...props} />)`
  && thead > tr > th {
    background-color: black!important;
    color: white;
    font-weight: 600;
    font-size: 20px;
  }
  && tbody > tr:hover > td {
    background-color: rgb(40, 40, 40)!important;
  }
  && td.ant-table-column-sort {
    background-color: rgb(40, 40, 40)!important;
  }  
`;

function getUrl(text, record) {  
  return "/profile/" + record.userId;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text, record) => <NavLink to={getUrl(text, record)} className='leaderboard-name'>{text}</NavLink>,
  },
  {
    title: 'Longest Streak (Days)',
    dataIndex: 'longestStreak',
    key: 'longestStreak',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.longestStreak - b.longestStreak,    
  },
  {
    title: '# Problems Solved',
    dataIndex: 'numberOfSubmissions',
    key: 'numberOfSubmissions',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.numberOfSubmissions - b.numberOfSubmissions,    
  },  
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

function LeaderBoardTable(props) {
  const [leaderBoardStats, SetLeaderBoardStats] = useState([]);
  const [timeFilter, SetTimeFilter] = useState(props.timeFilter);
  const [tableHeading, SetTableHeading] = useState("LeaderBoard");

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
    let arr = responseJson.data;
    SetLeaderBoardStats(arr);
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
  
}, [timeFilter])

function handleWeeklyButtonClick() {
  SetTimeFilter("WEEK");
  document.getElementById('last-week-btn').type = '';
  document.getElementById('weekly-btn').type = 'primary';
  document.getElementById('all-time-btn').type = '';
  SetTableHeading("Leader Board - This Week");
}

function handleAllTimeButtonClick() {
  SetTimeFilter("ANY_TIME");
  document.getElementById('last-week-btn').type = '';
  document.getElementById('all-time-btn').type = 'primary';
  document.getElementById('weekly-btn').type = '';
  SetTableHeading("Leader Board - All Time");
}

function handleLastWeekButtonClick() {
  SetTimeFilter("LAST_WEEK");
  document.getElementById('last-week-btn').type = 'primary';
  document.getElementById('all-time-btn').type = '';
  document.getElementById('weekly-btn').type = '';
  SetTableHeading("Leader Board - Last Week");
}

return (
    <div className='leaderboard-table'>      
      <div className='leaderboard-title'>{tableHeading}</div>
        <StyledTable 
          rowClassName= 'problem-set-table-row-light'
          columns={columns} 
          dataSource={leaderBoardStats} 
          onChange={onChange}
          pagination={{className: "leaderboard-pagination", defaultPageSize: 10}}
        />
        {
          props.showFilters !== undefined && props.showFilters === "true" && 
          <>
            <Button className='last-week-btn' id='last-week-btn' onClick={handleLastWeekButtonClick}>
              Last Week
            </Button>
            <Button className='weekly-btn' id='weekly-btn' onClick={handleWeeklyButtonClick}>
              Weekly
            </Button>
            <Button className='all-time-btn' id='all-time-btn' onClick={handleAllTimeButtonClick}>
              All Time
            </Button>
          </>
        }
    </div>
);
}

export default LeaderBoardTable;