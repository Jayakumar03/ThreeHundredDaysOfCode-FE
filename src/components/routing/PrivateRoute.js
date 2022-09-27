import React from 'react';
import { Navigate } from "react-router-dom";
import { useSessionStateContext } from '../../lib/session-context/session-context';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSessionStateContext();  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;