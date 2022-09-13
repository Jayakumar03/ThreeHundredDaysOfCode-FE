import React from 'react';
import { Navigate } from "react-router-dom";
import { checkAuth } from '../utils/ClassUtils';

function PrivateRoute({ children }) {
  const isAuthenticated = checkAuth()
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;