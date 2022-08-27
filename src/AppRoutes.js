// React.
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
import Home from './containers/Home';
import PrivateRoute from './components/PrivateRoute';
import FAQ from './containers/FAQ';
import Editor from './containers/Editor';
import Feed from './containers/Feed';
import Problems from './containers/Problems';

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
              <CodeSubmitForm /> 
            </PrivateRoute>
        } />
          <Route exact path="/submission" element={
            <PrivateRoute>
              <CodeSubmitForm /> 
            </PrivateRoute>
        } />
          <Route exact path="/editor" element={
            <PrivateRoute>
              <Editor /> 
            </PrivateRoute>
        } />
          <Route exact path="/feed" element={ 
            <PrivateRoute>
              <Feed />
            </PrivateRoute>          
          } />
          <Route exact path="/problemset/all" element={
            <PrivateRoute>
              <Problems /> 
            </PrivateRoute>
        } />
          <Route exact path="/problem/:problemId" element={
            <PrivateRoute>
              <Problems /> 
            </PrivateRoute>
        } />
          <Route exact path="/faq" element={ <FAQ />} />
          <Route exact path="/challenge" element={ <FAQ />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default AppRoutes;
