import React, { useEffect, useState } from 'react';

// Styles
import '../styles/ProblemOfDay.css'

function ProblemBar(props) {
  return (
    <div className="problem-bar-box">
      <p className="problem-bar-text"> Problem of the day is - "{props.problem.problemName}".
      <a target="_blank" href={props.problem.problemLink}> Click here </a> to get started.</p>
    </div>        
    );
}

export default ProblemBar;