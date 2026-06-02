import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  console.log('PrivateRoute - User:', user);
  console.log('PrivateRoute - Required role:', role);
  console.log('PrivateRoute - User role:', user?.role);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    console.log('PrivateRoute - No user, redirecting to login');
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    console.log('PrivateRoute - Role mismatch, redirecting to home');
    return <Navigate to="/" />;
  }

  console.log('PrivateRoute - Access granted');
  return children;
};

export default PrivateRoute;
