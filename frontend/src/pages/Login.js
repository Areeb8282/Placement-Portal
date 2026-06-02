import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiLogIn, FiUser, FiBriefcase } from 'react-icons/fi';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData);
    
    console.log('Login result:', result);
    console.log('User role:', result.user?.role);
    
    if (result.success) {
      const dashboardPath = result.user.role === 'student' 
        ? '/student/dashboard' 
        : '/recruiter/dashboard';
      console.log('Navigating to:', dashboardPath);
      navigate(dashboardPath);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <motion.div 
          className="auth-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-card glass">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Login to continue your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>I am a</label>
                <div className="role-selector">
                  <label className={`role-option ${formData.role === 'student' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={handleChange}
                    />
                    <FiUser /> Student
                  </label>
                  <label className={`role-option ${formData.role === 'recruiter' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={formData.role === 'recruiter'}
                      onChange={handleChange}
                    />
                    <FiBriefcase /> Recruiter
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <FiMail /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FiLock /> Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <FiLogIn /> Login
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account? 
                <Link to="/register"> Sign up</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
