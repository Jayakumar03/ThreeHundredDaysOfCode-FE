// React.
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Containers for routing.
import NotFound from "./containers/NotFound";
import Signup from './containers/Signup';
import ForgotPassword from './containers/ForgotPassword';
import LeaderBoard from './containers/LeaderBoard';
import ProblemOfTheDay from './containers/ProblemOfTheDay';
import Profile from './containers/Profile';
import PrivateRoute from './components/PrivateRoute';
import FAQ from './containers/FAQ';
import Problems from './containers/Problems';
import Problem from './containers/Problem';
import LandingPage from './containers/LandingPage';
import Blog from './containers/Blog';
import FeedNew from "./containers/FeedNew";
import UserPost from './containers/UserPost';
import Home from './containers/Home';
import ProblemSubmission from './containers/ProblemSubmission';
import AllSubmissions from './containers/AllSubmissions';
import ProblemSubmissions from './containers/ProblemSubmissions';
import Search from './containers/Search';
import EditorPage from './containers/EditorPage';

// Components.
import LoginRoute from './components/LoginRoute';
import MySubmissions from "./containers/MySubmissions";
import Notifications from "./containers/Notifications";
import { Alert, Box, Snackbar } from "@mui/material";
import styled, { css } from "styled-components";

import './styles/Home.css';
import PublicProfile from "./containers/PublicProfile";
import { LoginV2 } from "./components/LoginV2/LoginV2";
import { useSessionDispatchContext } from "./lib/session-context/session-context";

const StyledAppContent = styled.main`
  transition: 200ms;
  display: flex;
  flex-grow: 1;

  margin-top: 48px;
  height: calc(100vh - 48px);
  margin-left: 0;
  ${props => props.isAuthenticated && props.open && css`
    margin-left: ${props.leftPanelWidth}px;
  `}
`

/**
 * Combines the NavTopBar, LeftPanelDrawer, AppContent
 * @param {*} props 
 * @returns 
 */
function AppRoutes(props) {
  const { isAuthenticated } = useSessionDispatchContext();
  const [snack, setSnack] = useState(true)

  return (
    <StyledAppContent
      isAuthenticated={isAuthenticated}
      className="app-content-container"
      open={props.isLeftPanelOpen}
      leftPanelWidth={props.leftPanelWidth}
    >
      <Snackbar open={snack} autoHideDuration={6000} onClose={() => {setSnack(false)}}>        
      </Snackbar>
      {/* Show the content based on current path, on the right side of the page */}
      {/* TODO (satyam.sundaram): Add Wrappers as earlier */}
      <Box className={'route-container'}>
        <Routes>
          {/* util routes */}
          <Route exact path="/signup" element={ <Signup /> } />
          <Route exact path="/faq" element={ <FAQ /> } />
          <Route exact path="/blog" element={ <Blog /> } />

          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/login" element={
              <LoginRoute><LoginV2 /></LoginRoute>
            } />
          <Route exact path="/" element={
            <LoginRoute><LandingPage /></LoginRoute>
          } />
          {/* routes starting with "/" */}
          <Route exact path="/home" element={
            <PrivateRoute><Home /></PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute><Profile /></PrivateRoute>
          } />
          <Route path="/mySubmissions" element={
            <PrivateRoute><MySubmissions /></PrivateRoute>
          } />
          <Route path="/submissions" element={
            <PrivateRoute><AllSubmissions /></PrivateRoute>
          } />
          <Route path="/leaderBoard" element={ 
            <PrivateRoute><LeaderBoard /> </PrivateRoute>
          } />          
          <Route path="/problemOfTheDay" element={ 
            <PrivateRoute><ProblemOfTheDay /></PrivateRoute>
          } />
          <Route path="/problemset/all" element={ 
            <PrivateRoute><Problems /></PrivateRoute>
          } />
          <Route path="/problem" element={ 
            <PrivateRoute><ProblemOfTheDay /></PrivateRoute>
          } />
          <Route exact path="/problem/:problemId" element={ 
            <PrivateRoute><Problem /></PrivateRoute>          
          } />
          <Route exact path="/submission/:submissionId" element={ 
            <PrivateRoute><ProblemSubmission /></PrivateRoute>
          } />
          <Route exact path="/problemSubmissions/:problemId" element={ 
            <PrivateRoute><ProblemSubmissions /></PrivateRoute>          
          } />
          <Route path="/editor" element={
            <PrivateRoute><ProblemOfTheDay /></PrivateRoute>
          } />
          <Route exact path="/post/:postId" element={
            <PrivateRoute><UserPost /></PrivateRoute>
          } />
          <Route exact path="profile/:profileId" element={
            <PrivateRoute><PublicProfile /></PrivateRoute>
          } />
          <Route path="feed" element={
            <PrivateRoute> <FeedNew /> </PrivateRoute>
          } />
          <Route path="/notifications" element={
            <PrivateRoute><Notifications /></PrivateRoute>
          } />
          <Route path="search" element={
            <PrivateRoute><Search /></PrivateRoute>
          } />
          <Route path="createProblem" element={
            <PrivateRoute><EditorPage/></PrivateRoute>
          } />            
        </Routes>
      </Box>
    </StyledAppContent>
  );
}

export default AppRoutes;
