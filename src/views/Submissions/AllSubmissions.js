import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { Pagination } from 'antd';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { message } from 'antd';

import '../Leaderboard/LeaderBoard.css';
import Cookies from 'universal-cookie';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

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
function getSolutionLink(text, record) {
  let solutionLink = record.solutionLink;    
  let submissionId = record.submissionId;
  if (solutionLink) {
    if (solutionLink.substring(0, 5) === 'https') {
      return solutionLink;
    }
    submissionId = solutionLink;
  }
  return "/submission/" + submissionId + "/";
}
function getProblemLink(text, record) {
  let problemId = record.problemId;
  if (problemId && problemId.length > 0) {
    return "/problem/" + problemId;
  }
  return record.problemLink;
}
function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }  
  return splitStr.join(' '); 
}
const columns = [
  {
    title: 'Submitter',
    dataIndex: 'authorName',
    key: 'authorName',
    sorter: (a, b) => a.authorName.localeCompare(b.authorName),
    render: (text, record) => <NavLink to={getUrl(text, record)} className='leaderboard-name'>{titleCase(text)}</NavLink>,
  },
  {
    title: 'Submission Date',
    dataIndex: 'submissionDate',
    key: 'submissionDate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => Moment(a.submissionDate).unix() - Moment(b.submissionDate).unix(),
    render: (text) => { return(<> {Moment(text).format('DD MMM YYYY')} </>) }
  },
  {
    title: 'Problem Name',
    dataIndex: 'problemName',
    key: 'problemName',
    sorter: (a, b) => a.problemName.localeCompare(b.problemName),
    render: (text, record) => <a className='table-element-hyperlink' href={getProblemLink(text, record)}>{text}</a>
  },
  {
    title: 'Solution Link',
    dataIndex: 'solutionLink',
    key: 'solutionLink',
    render: (text, record) => <a className='problem-submission-name' href={getSolutionLink(text, record)}>Submission</a>
  },
];

function AllSubmissions() {
  const [submissionStats, SetSubmissionStats] = useState([]);
  const [pageNumber, SetPageNumber] = useState(1);

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
      SetSubmissionStats(
        responseJson.data
        .filter(row => row.problemName.length > 0)
        .filter(row => row.authorName.length > 0)
        );      
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
  const query = process.env.REACT_APP_API_URL + '/submissions?' + "&pageId=" + pageNumber;
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
  const query = process.env.REACT_APP_API_URL + '/google/submissions?userId=' + userId + "&pageId="+pageNumber;
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
}, [pageNumber])


  return (
    <div className='leaderboard-table'>
      <div className='submission-title'> All Submissions</div>
      <StyledTable 
          rowClassName= 'problem-set-table-row-light'
          columns={columns} 
          dataSource={submissionStats}
          pagination={{className: "submission-pagination", showSizeChanger: false}}
        />
    </div>
  );
}

export default AllSubmissions;