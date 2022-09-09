// React.
import React from "react";
import { Routes, Route } from "react-router-dom";

// Containers for routing.
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import Signup from './containers/Signup';
import ForgotPassword from './containers/ForgotPassword';
import LeaderBoard from './containers/LeaderBoard';
import ProblemOfTheDay from './containers/ProblemOfTheDay';
import Profile from './containers/Profile';
import PrivateRoute from './components/PrivateRoute';
import FAQ from './containers/FAQ';
import Editor from './containers/Editor';
import Problems from './containers/Problems';
import Problem from './containers/Problem';
import LandingPage from './containers/LandingPage';
import Blog from './containers/Blog';
import FeedNew from "./containers/FeedNew";
import UserPost from './containers/UserPost';
import Home from './containers/Home';

// Components.
import LoginRoute from './components/LoginRoute';
import MySubmissions from "./containers/MySubmissions";
import Notifications from "./containers/Notifications";


function AppRoutes(props) {
  return (
    <div className="app">
        <Routes>          
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/" element={
            <LoginRoute>
              <LandingPage />
            </LoginRoute>
              } />
          <Route exact path="/login" element={
            <LoginRoute>
              <Login />
            </LoginRoute>
              } />          
          <Route exact path="/profile" element={
            <PrivateRoute>
              <Profile />
          </PrivateRoute>
          } />
          <Route exact path="/mySubmissions" element={
            <PrivateRoute>
             <MySubmissions /> 
            </PrivateRoute>
          } />
          <Route exact path="/leaderboard" element={
            <PrivateRoute>
             <LeaderBoard /> 
            </PrivateRoute>
          } />
          <Route exact path="/problem" element={
            <PrivateRoute>
              <ProblemOfTheDay />
            </PrivateRoute>
        } />
          <Route exact path="/problemOfTheDay" element={
            <PrivateRoute>
              <ProblemOfTheDay /> 
            </PrivateRoute>
        } />
          <Route exact path="/editor" element={
            <PrivateRoute>
              <Editor /> 
            </PrivateRoute>
        } />
          <Route exact path="/problemset/all" element={ 
              <PrivateRoute>
                <Problems />
              </PrivateRoute>
          } />
          <Route exact path="/problem/:problemId" element={ 
          <PrivateRoute>
            <Problem />
          </PrivateRoute>          
          } />
          <Route exact path="/post/:postId" element={ 
          <PrivateRoute>
            <UserPost />
          </PrivateRoute>          
          } />
          <Route exact path="/feed" element={ 
            <PrivateRoute>
              <FeedNew />
            </PrivateRoute>          
          } />
          <Route exact path="/home" element={ 
            <PrivateRoute>
              <Home />
            </PrivateRoute>          
          } />
          <Route exact path="/notifications" element={ <Notifications />} />
          <Route exact path="/blog" element={ <Blog />} />          
          <Route exact path="/faq" element={ <FAQ />} />
          <Route exact path="/challenge" element={ <FAQ />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default AppRoutes;
