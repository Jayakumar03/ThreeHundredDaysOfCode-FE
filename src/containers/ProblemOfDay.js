import React, { useEffect, useState } from 'react';
import { message } from 'antd';

// Authentication
import { Auth } from "aws-amplify";

// Styles
import '../styles/ProblemOfDay.css'

function ProblemOfDay() {
    const [problem, SetProblem] = useState({});

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

    async function getProblemOfTheDay() {
        const currentSessionResponse = await Auth.currentSession();
        const accessToken = currentSessionResponse.getAccessToken();
        const jwtToken = accessToken.getJwtToken();
        const query = process.env.REACT_APP_API_URL + '/problem';
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
            SetProblem(responseJson);
        })
        .catch((error) => {
          showMessage(null, "Error");
          console.log(error);
        });
    }

    useEffect(() => { getProblemOfTheDay(); }, [])

    return (
        <div className="problem-parent-box">
          <h1 className="problem-header"> Problem Of The Day</h1>
          <div>Day {problem.id} <a href={problem.url}> {problem.title} </a>
          <div>Complexity: {problem.complexity}</div>
        </div>
          <div className="problem-desc"><p> {problem.description} </p> </div>
        </div>
    );
}

export default ProblemOfDay;