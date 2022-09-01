import React, { useEffect, useState } from 'react';

// Styles
import '../styles/ProblemOfDay.css'

function ProblemBar(props) {
  return (
    <div className="problem-bar-box">
      <p className="problem-bar-text"> {props.headerText} - "{props.problem.problemTitle}". Use 
      <a target="_blank" href={props.problem.problemLink}> this link </a> to validate your solution.</p>
    </div>        
    );
}

export default ProblemBar;