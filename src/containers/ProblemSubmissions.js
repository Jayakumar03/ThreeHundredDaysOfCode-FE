import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useParams, useSearchParams } from 'react-router-dom';

// Authentication
import { Auth } from "aws-amplify";

// Design Components
import { message } from 'antd';

import '../styles/LeaderBoard.css';
import Cookies from 'universal-cookie';
import styled from "styled-components";

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

const columns = [
  {
    title: 'Submitter',
    dataIndex: 'authorName',
    key: 'authorName'
  },
  {
    title: 'Problem Name',
    dataIndex: 'problemName',
    key: 'problemName',
    render: (text, record) => <a className='problem-submission-name' href={record.problemLink}>{text}</a>
  },  
  {
    title: 'Solution Link',
    dataIndex: 'solutionLink',
    key: 'solutionLink',
    render: (text, record) => <a className='problem-submission-name' href={getSolutionLink(text, record)}>Submission</a>
  },
  {
    title: 'Submission Date',
    dataIndex: 'submissionDate',
    key: 'submissionDate',
    render: (text, record) => {
        Moment.locale('en');
        var dt = '2016-05-02T00:00:00';
        return(<> {Moment(text).format('d MMM YYYY')} </>) 
    }
  },
];

function ProblemSubmissions() {
  const [submissionStats, SetSubmissionStats] = useState([]);
  const [pageNumber, SetPageNumber] = useState(1);
  const problemId = useParams().problemId;

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
  const query = process.env.REACT_APP_API_URL + '/submissionsProblem?' + "&problemId=" + problemId + "&pageId=" + pageNumber;
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
  const query = process.env.REACT_APP_API_URL + '/google/submissionsProblem?userId=' + userId + "&problemId=" + problemId + "&pageId=" + pageNumber;
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

function handleOnChange(page, pageSize) {
  SetPageNumber(page);  
}

  return (
    <div className='leaderboard-table'>
      <div className='submission-title'> User Submissions</div>
      <StyledTable 
          rowClassName= 'problem-set-table-row-light'
          columns={columns} 
          dataSource={submissionStats}
          pagination={{className: "submission-pagination", defaultPageSize: 10, onChange: handleOnChange, total: 100}}
        />
    </div>
  );
}

export default ProblemSubmissions;