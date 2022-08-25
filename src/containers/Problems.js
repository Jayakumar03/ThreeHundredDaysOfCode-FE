import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

// Authentication
import { Auth } from "aws-amplify";

import Cookies from 'universal-cookie';

const getUuid = require('uuid-by-string');

const columns = [
  {
    title: 'Title',
    dataIndex: 'problemTitle',
    key: 'problemTitle',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Difficulty',
    dataIndex: 'complexity',
    key: 'complexity',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'loser') {
            color = 'volcano';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


function Problems() {
   const [problemSet, SetProblemSet] = useState([]);

    async function getProblemsWithRequestParams(query, requestOptions) {
        fetch(query, requestOptions)
          .then(res => res.json())
          .then(responseJson => {
            SetProblemSet(responseJson.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      async function getProblemSetCognito() {
        const currentSessionResponse = await Auth.currentSession();
        const accessToken = currentSessionResponse.getAccessToken();
        const jwtToken = accessToken.getJwtToken();
        const query = process.env.REACT_APP_API_URL + '/problems?page=1';
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
        const userAuth = await Auth.currentAuthenticatedUser();
        const requestOptions = { 'method': 'GET' };        
        const query = process.env.REACT_APP_API_URL + '/google/problems?page=1';
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

    return ( <Table columns={columns} dataSource={problemSet} />);
}

export default Problems;