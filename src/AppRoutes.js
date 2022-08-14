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

// Components.
import LoginRoute from './components/LoginRoute';

function AppRoutes(props) {
  return (
    <div className="app">
        <Routes>          
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/" element={
            <LoginRoute>
              <Login />
            </LoginRoute>
              } />
          <Route exact path="/login" element={
            <LoginRoute>
              <Login />
            </LoginRoute>
              } />          
          <Route exact path="/problem" element={<ProblemOfDay />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/leaderboard" element={<LeaderBoard />} />
          <Route exact path="/submission" element={<CodeSubmitForm />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default AppRoutes;
