import React from 'react';

// Styles
import '../styles/ProblemOfDay.css'

function ProblemBar(props) {
let timeLeft = props.timeLeft;
const timerComponents = [];
Object.keys(timeLeft).forEach((interval) => {
  if (!timeLeft[interval]) {
    return;
  }
  timerComponents.push(
    <span key={interval}>
      {timeLeft[interval]} {interval}{" "}
    </span>
  );
});

  return (
    <div className="problem-bar-box">
      <p className="problem-bar-text"> {props.headerText} - "{props.problem.problemTitle}". Use 
      <a target="_blank" href={props.problem.problemLink}> this link </a> to validate your solution.
      {
      props.isProblemOfTheDay && 
      <>
          Time left to solve the problem is {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </>
      }
      </p>
    </div>        
    );
}

export default ProblemBar;