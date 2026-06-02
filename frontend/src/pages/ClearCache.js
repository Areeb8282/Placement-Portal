import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClearCache = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear everything
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    console.log('✅ All cache cleared!');
    
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🧹</h1>
        <h2 style={{ marginBottom: '20px' }}>Clearing Cache...</h2>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Removing all stored data
        </p>
        <p style={{ fontSize: '14px', marginTop: '20px', opacity: 0.7 }}>
          Redirecting to login page...
        </p>
        <div style={{
          marginTop: '30px',
          width: '200px',
          height: '4px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'white',
            animation: 'loading 2s ease-in-out'
          }}></div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ClearCache;
