import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiBriefcase, FiUserPlus } from 'react-icons/fi';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    fullName: '',
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  const [emailWarning, setEmailWarning] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Common misspellings of popular email domains
  const commonDomainFixes = {
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmali.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmail.cm': 'gmail.com',
    'gmail.con': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gnail.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'yahoo.co': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmal.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloo.com': 'outlook.com',
  };

  const checkEmailDomain = (email) => {
    if (!email.includes('@')) return;
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return;
    if (commonDomainFixes[domain]) {
      setEmailWarning(`Did you mean @${commonDomainFixes[domain]}?`);
    } else {
      setEmailWarning('');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      checkEmailDomain(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      navigate(formData.role === 'student' ? '/student/dashboard' : '/recruiter/dashboard');
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
              <h1>Create Account</h1>
              <p>Start your placement journey today</p>
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
                  <FiUser /> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {formData.role === 'recruiter' && (
                <div className="form-group">
                  <label>
                    <FiBriefcase /> Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>
              )}

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
                {emailWarning && (
                  <p className="email-warning">⚠️ {emailWarning}</p>
                )}
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
                  placeholder="Create a password"
                  minLength="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FiLock /> Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  minLength="6"
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
                    <FiUserPlus /> Create Account
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account? 
                <Link to="/login"> Login</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
