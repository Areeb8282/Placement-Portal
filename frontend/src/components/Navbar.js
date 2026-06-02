import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut, FiUser, FiBriefcase, FiBook, FiFileText } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return user.role === 'student' ? '/student/dashboard' : '/recruiter/dashboard';
  };

  return (
    <nav className="navbar glass">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <span className="logo-gradient">Placement Portal</span>
          </Link>

          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            {!isAuthenticated ? (
              <>
                <Link to="/jobs" onClick={() => setIsOpen(false)}>
                  <FiBriefcase /> Jobs
                </Link>
                <Link to="/tests" onClick={() => setIsOpen(false)}>
                  <FiBook /> Tests
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="btn btn-primary">Get Started</button>
                </Link>
              </>
            ) : user?.role === 'student' ? (
              <>
                <Link to="/jobs" onClick={() => setIsOpen(false)}>
                  <FiBriefcase /> Jobs
                </Link>
                <Link to="/tests" onClick={() => setIsOpen(false)}>
                  <FiBook /> Tests
                </Link>
                <Link to="/student/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/student/profile" onClick={() => setIsOpen(false)}>
                  <FiUser /> Profile
                </Link>
                <Link to="/test-history" onClick={() => setIsOpen(false)}>
                  Progress
                </Link>
                <Link to="/saved-jobs" onClick={() => setIsOpen(false)}>
                  Saved
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : user?.role === 'recruiter' ? (
              <>
                <Link to="/recruiter/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/recruiter/applications" onClick={() => setIsOpen(false)}>
                  <FiFileText /> Applications
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : null}
          </div>

          <div className="nav-actions">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            
            <button 
              className="mobile-toggle" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
