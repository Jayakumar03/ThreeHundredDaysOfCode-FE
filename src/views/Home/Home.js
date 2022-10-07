import React from 'react';
import ChallengeCard from '../../components/cards/challenge-card/ChallengeCard';
import LeaderBoardTable from '../../components/tables/leaderboard/LeaderBoardTable';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';

import './Home.css';
import { Box, Grid, Typography } from '@mui/material';


const Home = ({ flags }) => {
  return (
      <Box className='home-my-profile'>
        <Grid>
          <Box sx={{display: "flex", justifyContent: "start", paddingLeft: "8px"}}>
            <Typography align='center' color={"white"} fontSize="26px" fontWeight={600} variant="h4">
              Challenges
            </Typography>
            </Box>
            <Grid container alignItems={"center"}>
              <Box sx={{my: 2,  mx: 1}} >
                {
                 flags.testIntegrationFlag &&
                                
                  <ChallengeCard
                    title="Daily Code" 
                    description="Solve one problem a day and win exciting weekly prizes. Build a regular habit."
                    url="/problemOfTheDay" 
                    img="https://ik.imagekit.io/wfx6bvuzj/300Code/300_yEts4SeVC.png"
                  />
                }

              </Box>
              <Box sx={{my: 2,  mx: 1}} >
                <ChallengeCard
                  title="Marathon Coder" 
                  description="Solve 300 problems over the course of a year and win an IPhone."
                  url="/problemset/all"
                  img="https://ik.imagekit.io/wfx6bvuzj/300Code/300_yEts4SeVC.png"
                />
              </Box>
            </Grid>
          </Grid>

        {/* <div className='home-challenges'>
        
        <div className='home-challenges-container'>
            
            </div>
        </div> */}

        {/* <div className='home-my-submissions'>
            <span className='home-title-text'> My Submissions </span>
        </div> */}

        <div className='home-recent-submissions'>
         <LeaderBoardTable timeFilter="ALL_TIME" />
        </div>
      </Box>
   );
}

export default withLDConsumer()(Home);