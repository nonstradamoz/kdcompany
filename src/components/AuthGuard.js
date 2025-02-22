import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard; 