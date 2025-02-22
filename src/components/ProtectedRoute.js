// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//   const userRole = localStorage.getItem('userRole');

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;