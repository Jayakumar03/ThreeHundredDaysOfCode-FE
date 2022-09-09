import React from 'react';
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function LoginRoute({ children }) {
  const cookies = new Cookies();
  const value = cookies.get('isLoggedIn', { path: '/' });
  const isAuthenticated = value === "true";
  return isAuthenticated ? <Navigate to="/home" />: children;
}

export default LoginRoute;