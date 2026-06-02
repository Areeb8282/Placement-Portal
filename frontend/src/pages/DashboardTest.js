import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardTest = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Dashboard Test Page</h1>
      
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Authentication Status</h2>
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
        
        {user ? (
          <>
            <h3>User Details:</h3>
            <pre style={{ background: '#fff', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(user, null, 2)}
            </pre>
            
            <h3>Role Check:</h3>
            <p><strong>User Role:</strong> {user.role}</p>
            <p><strong>Is Student:</strong> {user.role === 'student' ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Is Recruiter:</strong> {user.role === 'recruiter' ? '✅ Yes' : '❌ No'}</p>
            
            <h3>Correct Dashboard Link:</h3>
            {user.role === 'student' && (
              <Link to="/student/dashboard" style={{ display: 'block', marginTop: '10px', padding: '10px', background: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px', textAlign: 'center' }}>
                Go to Student Dashboard
              </Link>
            )}
            {user.role === 'recruiter' && (
              <Link to="/recruiter/dashboard" style={{ display: 'block', marginTop: '10px', padding: '10px', background: '#2196F3', color: 'white', textDecoration: 'none', borderRadius: '4px', textAlign: 'center' }}>
                Go to Recruiter Dashboard
              </Link>
            )}
          </>
        ) : (
          <p>No user logged in. <Link to="/login">Login here</Link></p>
        )}
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Quick Links:</h3>
        <Link to="/" style={{ display: 'block', margin: '10px 0' }}>Home</Link>
        <Link to="/login" style={{ display: 'block', margin: '10px 0' }}>Login</Link>
        <Link to="/register" style={{ display: 'block', margin: '10px 0' }}>Register</Link>
      </div>
    </div>
  );
};

export default DashboardTest;
