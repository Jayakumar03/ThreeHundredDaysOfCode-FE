import "antd/dist/antd.css";

import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import styled from "styled-components";

// Authentication.
import { Auth } from "aws-amplify";
import Cookies from 'universal-cookie';

// Styles.
import '../styles/ProblemSet.css';

function getLink(text, record, index) {  
  const problemId = record.problemId;
  return "/problem/" + problemId + "/";
}

const StyledTable = styled((props) => <Table {...props} />)`
  width: 800px;
  && thead > tr > th {
    background-color: black;
    color: white;
    font-weight: 600;
    font-size: 20px;
  }
  && tbody > tr:hover > td {
    background-color: black;
  }
`;

const columns = [
  {
    title: '#',
    dataIndex: 'problemIndex',
    key: 'problemIndex',
  },
  {
    title: 'Title',
    dataIndex: 'problemTitle',
    key: 'problemTitle',
    render: (text, record, index) => <a className='problem-set-title-text' href={getLink(text, record, index)}>{text}</a>,
  },
  {
    title: 'Difficulty',
    dataIndex: 'problemComplexity',
    key: 'problemComplexity',
    render: (_, {problemComplexity}) => {
      let color = 'red';

      if (problemComplexity === 'Easy') {
        color = 'green';
      } else if (problemComplexity === 'Medium') {
        color = 'blue';
      } else {
        color = 'red';
      }
      return <Tag 
        style={{backgroundColor: 'rgba(255, 255, 255, 0.0)', border: 0, fontWeight: 550, fontSize: 16 }}
        color={color} key={problemComplexity}>{problemComplexity.toUpperCase()}
      </Tag>
    },
  },
];

function Problems() {
   const [problemSet, SetProblemSet] = useState([]);
   const [top] = useState('none');
   const [bottom] = useState('bottomCenter');
   const [totalResults, SetTotalResults] = useState(25);
   const [problemOfTheDay, SetProblemOfTheDay] = useState({});

    async function getProblemsWithRequestParams(query, requestOptions) {
      fetch(query, requestOptions)
        .then(res => res.json())
        .then(responseJson => {
          SetProblemSet(responseJson.data);
          SetTotalResults(responseJson.size);
          SetProblemOfTheDay(responseJson);
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

    useEffect(() => {
      getProblemSet();        
    }, [])

    return (
      <div className='problem-set-container'>
       <div className='problemset-table'>    
        <StyledTable 
          rowClassName={(record, index) => index % 2 === 0 ? 'problem-set-table-row-light' :  'problem-set-table-row-dark'}
          columns={columns} 
          dataSource={problemSet}
          size={25} 
          pagination={{
            position: [top, bottom],          
            total: totalResults,
            defaultPageSize: 10,
            className: "pagination"
          }}        
        />    
    </div>
    </div>
    );
}

export default Problems;