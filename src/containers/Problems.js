import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication
import { Auth } from "aws-amplify";

import Cookies from 'universal-cookie';

import '../styles/ProblemSet.css';

import ProblemBar from '../components/ProblemBar';

function getLink(text, record, index) {  
  const problemId = record.problemId;
  return "/problem/" + problemId + "/";
}

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
    render: (text, record, index) => <a href={getLink(text, record, index)}>{text}</a>,
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
      return <Tag color={color} key={problemComplexity}>{problemComplexity.toUpperCase()}</Tag>
    },
  },
];

function Problems() {
   const [problemSet, SetProblemSet] = useState([]);
   const [top] = useState('none');
   const [bottom] = useState('bottomCenter');
   const [totalResults, SetTotalResults] = useState(10);
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
              
       <div className='problemset-table'>    
        <Table 
        columns={columns} 
        dataSource={problemSet} 
        pagination={{
          position: [top, bottom],          
          total: totalResults,          
        }}        
        />    
    </div>
    
    );
}

export default Problems;