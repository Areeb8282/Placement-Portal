import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiBriefcase, FiFileText, FiTrendingUp, FiAward, FiTarget, FiX, FiUser } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const StudentDashboard = () => {
  const { API_URL, user } = useAuth();
  
  // Debug: Log user info
  console.log('StudentDashboard - Rendering for user:', user);
  console.log('StudentDashboard - User role:', user?.role);
  
  const [stats, setStats] = useState({
    totalApplications: 0,
    pending: 0,
    shortlisted: 0,
    rejected: 0,
    profileCompletion: 0,
    profileStrength: 0
  });
  const [testStats, setTestStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileBanner, setShowProfileBanner] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [applicationsRes, jobsRes, profileRes, testStatsRes] = await Promise.all([
        axios.get(`${API_URL}/applications/my-applications`),
        axios.get(`${API_URL}/jobs?limit=5`),
        axios.get(`${API_URL}/students/profile`),
        axios.get(`${API_URL}/tests/stats`).catch(() => ({ data: { testScores: {}, badges: [], skillGaps: [] } }))
      ]);

      const applications = applicationsRes.data.applications || [];
      const profile = profileRes.data.profile;
      
      setStats({
        totalApplications: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        shortlisted: applications.filter(a => a.status === 'shortlisted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
        profileCompletion: profile?.profileCompletion || 0,
        profileStrength: profile?.profileStrength || 0
      });

      // Show banner if profile is not set up yet
      const completion = profile?.profileCompletion || 0;
      const dismissed = sessionStorage.getItem('profileBannerDismissed');
      if (completion < 20 && !dismissed) {
        setShowProfileBanner(true);
      }

      setTestStats(testStatsRes.data);
      setBadges(testStatsRes.data.badges || []);
      setRecentJobs(jobsRes.data.jobs || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleDismissBanner = () => {
    setShowProfileBanner(false);
    sessionStorage.setItem('profileBannerDismissed', 'true');
  };

  const chartData = [
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Shortlisted', value: stats.shortlisted, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Setup Suggestion Banner */}
          <AnimatePresence>
            {showProfileBanner && (
              <motion.div
                className="profile-suggestion-banner"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="banner-content">
                  <FiUser size={22} />
                  <div>
                    <strong>👋 Welcome! Set up your profile first.</strong>
                    <p>A complete profile helps recruiters find you and improves your chances of getting hired.</p>
                  </div>
                </div>
                <div className="banner-actions">
                  <Link to="/student/profile">
                    <button className="btn btn-primary btn-sm">Complete Profile</button>
                  </Link>
                  <button className="banner-dismiss" onClick={handleDismissBanner} title="Dismiss">
                    <FiX size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Message */}
          {user?.fullName && (
            <motion.div 
              className="welcome-message glass"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>Welcome, {user.fullName.split(' ')[0]}! 👋</h2>
              <p>Ready to take the next step in your career?</p>
            </motion.div>
          )}

          <div className="dashboard-header">
            <h1>Student Dashboard</h1>
            <p>Track your applications and progress</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <motion.div 
              className="stat-card glass"
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon" style={{ background: 'var(--gradient-primary)' }}>
                <FiFileText size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalApplications}</h3>
                <p>Total Applications</p>
              </div>
            </motion.div>

            <Link to="/student/profile" style={{ textDecoration: 'none' }}>
              <motion.div 
                className="stat-card glass"
                whileHover={{ y: -5 }}
              >
                <div className="stat-icon" style={{ background: 'var(--gradient-success)' }}>
                  <FiTrendingUp size={24} />
                </div>
                <div className="stat-content">
                  <h3>{stats.profileStrength}%</h3>
                  <p>Profile Strength</p>
                </div>
              </motion.div>
            </Link>

            <motion.div 
              className="stat-card glass"
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon" style={{ background: 'var(--gradient-secondary)' }}>
                <FiBriefcase size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.shortlisted}</h3>
                <p>Shortlisted</p>
              </div>
            </motion.div>

            <Link to="/test-history" style={{ textDecoration: 'none' }}>
              <motion.div 
                className="stat-card glass"
                whileHover={{ y: -5 }}
              >
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <FiAward size={24} />
                </div>
                <div className="stat-content">
                  <h3>{badges.length}</h3>
                  <p>Badges Earned</p>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Test Scores Section */}
          {testStats && testStats.testScores && Object.keys(testStats.testScores).length > 0 && (
            <div className="test-scores-section">
              <div className="section-header">
                <h2><FiTarget /> Your Test Scores</h2>
                <Link to="/test-history" className="view-all">View Details</Link>
              </div>
              <div className="test-scores-grid">
                {Object.entries(testStats.testScores).map(([category, scores]) => (
                  scores.attempts > 0 && (
                    <motion.div
                      key={category}
                      className="test-score-card glass"
                      whileHover={{ y: -5 }}
                    >
                      <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                      <div className="score-display">
                        <div className="score-circle">
                          <span className="score-value">{scores.bestScore}%</span>
                        </div>
                      </div>
                      <div className="score-details">
                        <span>Best: {scores.bestScore}%</span>
                        <span>Last: {scores.lastScore}%</span>
                        <span>Attempts: {scores.attempts}</span>
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Badges Section */}
          {badges.length > 0 && (
            <div className="badges-preview glass">
              <div className="section-header">
                <h2><FiAward /> Recent Badges</h2>
                <Link to="/test-history" className="view-all">View All</Link>
              </div>
              <div className="badges-list">
                {badges.slice(0, 4).map((badge) => (
                  <motion.div
                    key={badge._id}
                    className="badge-item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="badge-icon">{badge.icon}</span>
                    <div>
                      <h5>{badge.title}</h5>
                      <p>{badge.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps */}
          {testStats && testStats.skillGaps && testStats.skillGaps.length > 0 && (
            <div className="skill-gaps-preview glass">
              <h2>Recommended Actions</h2>
              <div className="skill-gaps-list">
                {testStats.skillGaps.slice(0, 3).map((gap, index) => (
                  <div key={index} className={`skill-gap-item priority-${gap.priority}`}>
                    <div>
                      <strong>{gap.category.charAt(0).toUpperCase() + gap.category.slice(1)}</strong>
                      <p>{gap.message}</p>
                    </div>
                    <Link to="/tests">
                      <button className="btn btn-sm btn-primary">{gap.action}</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Charts and Recent Jobs */}
          <div className="dashboard-content">
            <div className="chart-section glass">
              <h2>Application Status</h2>
              {stats.totalApplications > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="no-data">No applications yet. Start applying to jobs!</p>
              )}
            </div>

            <div className="recent-jobs glass">
              <div className="section-header">
                <h2>Recent Job Postings</h2>
                <Link to="/jobs" className="view-all">View All</Link>
              </div>
              <div className="jobs-list">
                {recentJobs.map(job => (
                  <Link to={`/jobs/${job._id}`} key={job._id} className="job-item">
                    <div>
                      <h4>{job.title}</h4>
                      <p>{job.company}</p>
                    </div>
                    <span className="job-type">{job.jobType}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/student/profile">
              <button className="btn btn-primary">
                Complete Profile
              </button>
            </Link>
            <Link to="/jobs">
              <button className="btn btn-secondary">
                Browse Jobs
              </button>
            </Link>
            <Link to="/student/applications">
              <button className="btn btn-secondary">
                View Applications
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
