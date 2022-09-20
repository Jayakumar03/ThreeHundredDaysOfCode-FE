import React from 'react';
import { Navigate } from "react-router-dom";
import { useSessionStateContext } from '../lib/session-context/session-context';

function LoginRoute({ children }) {
  const { isAuthenticated } = useSessionStateContext();
  return isAuthenticated ? <Navigate to="/home" />: children;
}

export default LoginRoute;