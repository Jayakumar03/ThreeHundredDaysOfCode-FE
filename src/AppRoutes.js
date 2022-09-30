// React.
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Containers for routing.
import Signup from "./features/authentication/Signup";
import ForgotPassword from "./features/authentication/ForgotPassword";

import LeaderBoard from './views/Leaderboard/LeaderBoard';
import ProblemOfTheDay from './views/Problem/ProblemOfTheDay';
import Profile from './views/Profile/PrivateProfile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import FAQ from './views/FAQ/FAQ';
import Problems from './views/Problem/Problems';
import Problem from './views/Problem/Problem';
import LandingPage from "./components/layouts/navigation/landing-page/LandingPage";
import Blog from './views/Blog/Blog';
import FeedNew from "./views/Feed/FeedNew";
import UserPost from './views/Post/UserPost';

import Home from './views/Home/Home';
import ProblemSubmission from './views/Submissions/ProblemSubmission';
import AllSubmissions from './views/Submissions/AllSubmissions';
import ProblemSubmissions from './views/Submissions/ProblemSubmissions';
import Search from './views/Search/Search';
import EditorPage from './views/Editor/EditorPage';

// Components.
import LoginRoute from './components/routing/LoginRoute';
import MySubmissions from "./views/Submissions/MySubmissions";
import Notifications from "./views/Notifications/Notifications";
import { Box, Snackbar } from "@mui/material";
import styled, { css } from "styled-components";

import './styles/Home.css';
import PublicProfile from "./views/Profile/PublicProfile/PublicProfile";
import {LoginV2} from './features/authentication/Login/LoginV2';

import { useSessionStateContext } from "./lib/session-context/session-context";

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
  const { isAuthenticated } = useSessionStateContext();
  const [snack, setSnack] = useState(true);

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
          <Route exact path="/profile" element={
            <PrivateRoute><Profile /></PrivateRoute>
          } />
          <Route exact path="/mySubmissions" element={
            <PrivateRoute><MySubmissions /></PrivateRoute>
          } />
          <Route exact path="/submissions" element={
            <PrivateRoute><AllSubmissions /></PrivateRoute>
          } />
          <Route exact path="/leaderBoard" element={ 
            <PrivateRoute><LeaderBoard /> </PrivateRoute>
          } />          
          <Route exact path="/problemOfTheDay" element={ 
            <PrivateRoute><ProblemOfTheDay /></PrivateRoute>
          } />
          <Route exact path="/problemset/all" element={ 
            <PrivateRoute><Problems /></PrivateRoute>
          } />
          <Route exact path="/problem" element={ 
            <PrivateRoute><ProblemOfTheDay /></PrivateRoute>
          } />
          <Route exact path="/problem/:problemId" element={ 
            <PrivateRoute><Problem /></PrivateRoute>          
          } />
          <Route exact path="/problem/:problemId/:sessionId" element={ 
            <PrivateRoute><Problem /></PrivateRoute>          
          } />
          <Route exact path="/submission/:submissionId" element={ 
            <PrivateRoute><ProblemSubmission /></PrivateRoute>
          } />
          <Route exact path="/problemSubmissions/:problemId" element={ 
            <PrivateRoute><ProblemSubmissions /></PrivateRoute>          
          } />
          <Route exact path="/editor" element={
            <PrivateRoute><ProblemOfTheDay /></PrivateRoute>
          } />
          <Route exact path="/post/:postId" element={
            <PrivateRoute><UserPost /></PrivateRoute>
          } />
          <Route exact path="profile/:profileId" element={
            <PrivateRoute><PublicProfile /></PrivateRoute>
          } />
          <Route exact path="feed" element={
            <PrivateRoute> <FeedNew /> </PrivateRoute>
          } />
          <Route exact path="/notifications" element={
            <PrivateRoute><Notifications /></PrivateRoute>
          } />
          <Route exact path="search" element={
            <PrivateRoute><Search /></PrivateRoute>
          } />
          <Route exact path="createProblem" element={
            <PrivateRoute><EditorPage/></PrivateRoute>
          } />            
        </Routes>
      </Box>
    </StyledAppContent>
  );
}

export default AppRoutes;
