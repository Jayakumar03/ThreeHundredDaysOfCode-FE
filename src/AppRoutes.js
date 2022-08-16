import React from "react";
import { Routes, Route } from "react-router-dom";

// Containers for routing.
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import Signup from './containers/Signup';
import ForgotPassword from './containers/ForgotPassword';
import LeaderBoard from './containers/LeaderBoard';
import CodeSubmitForm from './containers/CodeSubmitForm';
import Profile from './containers/Profile';
import ProblemOfDay from './containers/ProblemOfDay';
import Home from './containers/Home';
import PrivateRoute from './components/PrivateRoute';
import Challenge from './containers/Challenge';

// Components.
import LoginRoute from './components/LoginRoute';
import MySubmissions from "./containers/MySubmissions";

function AppRoutes(props) {
  return (
    <div className="app">
        <Routes>          
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/" element={
            <LoginRoute>
              <Home />
            </LoginRoute>
              } />
          <Route exact path="/login" element={
            <LoginRoute>
              <Login />
            </LoginRoute>
              } />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/problem" element={<ProblemOfDay />} />
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
          <Route exact path="/submission" element={
            <PrivateRoute>
              <CodeSubmitForm /> 
            </PrivateRoute>
        } />
          <Route exact path="/challenge" element={ <Challenge />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default AppRoutes;
