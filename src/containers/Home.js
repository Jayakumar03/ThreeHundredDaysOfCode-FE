import React from 'react';
import FeedLeftPanel from '../components/FeedLeftPanel';
import ChallengeCard from '../components/ChallengeCard';
import LeaderBoardTable from '../components/LeaderBoardTable';

import '../styles/Home.css';

function Home() {
   return (
    <div className='home-container'>
      <FeedLeftPanel showTitle="true" />
      <div className='home-my-profile'>
      <div className='home-challenges'>
        <span className='home-title-text'> Challenges </span>
        <div className='home-challenges-container'>
            <ChallengeCard 
            title="Daily Code" 
            description="Solve one problem a day and win exciting weekly prizes. Build a regular habit."
            url="/problemOfTheDay" 
            img="https://ik.imagekit.io/wfx6bvuzj/300Code/300_yEts4SeVC.png"
            />

            <ChallengeCard 
            title="Marathon Coder" 
            description="Solve 300 problems over the course of a year and win an IPhone."
            url="/problemset/all"
            img="https://ik.imagekit.io/wfx6bvuzj/300Code/300_yEts4SeVC.png"
            />
            </div>
      </div>

        {/* <div className='home-my-submissions'>
            <span className='home-title-text'> My Submissions </span>
        </div> */}

        <div className='home-recent-submissions'>        
         <LeaderBoardTable timeFilter="ALL_TIME" />
        </div>
      </div>
    </div>
   );
}

export default Home;