import React from 'react';

// Styles
import './TimerBar.css'

function TimerBar(props) {
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
    <div className="timer-bar-box">      
      {
      props.isProblemOfTheDay &&
      <>          
          <div className='timer-bar-day-text'>Day {props.problem.problemIndex}</div>
          <p className="timer-bar-timeleft-text">
          Time left: {timerComponents.length ? timerComponents : <span>Time's up!</span>}</p>
      </>
      }      
    </div>        
    );
}

export default TimerBar;