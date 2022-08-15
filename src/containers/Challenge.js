import React from 'react';
import '../styles/Challenge.css';

function Challenge() {
    return (
        <div className='challenge-parent-box'>
            <h1> Challenge & Community Guidelines </h1>
            <p className='challenge-question'> WHERE do I join the community? </p>
            <p> Join <a href="https://discord.gg/t273TDMcvd">this discord community</a> to know more. </p>
            <p className='challenge-question'>The CHALLENGE</p>
            <p>Your goal is to solve 1 coding problem every single day. At the end of the week, everyone who has solved a problem everyday of the week, will be eligible for a prize.</p> 
            <p className='challenge-question'> 1/ How To Submit Your Code? </p>
            <p><b>Step-I:</b> Solve the problem on Leetcode.</p>
            <p><b>Step-II:</b> Use <a href="https://github.com/dheerajmalik1/Code-Submissions">this repository</a> to submit your code.
            To start submissions, please create a top level folder in the repository with your name and create a PR. 
            Each subsequent submission must go in this folder.
            <a href="https://github.com/ravitandon90/Code-Submissions/blob/main/Ravi-Tandon/AddToArrayForm.cpp">  Here</a> is an example of a PR.</p>
            <p><b>Step-III:</b> Submit a link to your solution <a href='/submitCode'> here </a>.</p>
            <p className='challenge-question'> 2/ How will we decide the winner? </p>
            <p> Every Sunday, we will pick one person from the list of those who have the longest streak for the week. If there are tie-breakers, one person will be chosen randomly from the set of winners. </p>
            <p className='challenge-question'> 3/ What is the prize? </p>
            <p>   We will have one winner per week. He/she will receive 100$. </p>
            <p className='challenge-question'> 4/ What will I learn from this process? </p>
            <p>    You will build a habit of daily coding. It sounds easy, but will end up being quite hard.  </p>
            <p className='challenge-question'> 5/ Where can I see the list of questions? </p>
            <p> Check <a href='/problem'>this page</a> for the problem of the day.</p>
            <p> We will expect each of us to follow the <a href="https://en.wikipedia.org/wiki/Academic_honor_code">academic honour code</a>. If found cheating, the member will be kicked off the server. </p>
        </div>
    );
}

export default Challenge;