import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiFileText, FiUser, FiBriefcase, FiCalendar, FiCheck, FiX, FiEye, FiRefreshCw, FiAward } from 'react-icons/fi';
import './RecruiterApplications.css';

const RecruiterApplications = () => {
  const { API_URL } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching applications...');
      const res = await axios.get(`${API_URL}/recruiters/applications`);
      console.log('Applications received:', res.data);
      setApplications(res.data.applications || []);
      toast.success(`Loaded ${res.data.applications?.length || 0} applications`);
    } catch (error) {
      console.error('Error fetching applications:', error);
      if (error.response?.status === 500) {
        toast.error('Server error loading applications');
      } else {
        toast.error('Failed to load applications');
      }
      setApplications([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axios.put(`${API_URL}/applications/${applicationId}/status`, {
        status: newStatus
      });
      toast.success(`Application ${newStatus}!`);
      fetchApplications();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'var(--warning)';
      case 'shortlisted': return 'var(--info)';
      case 'rejected': return 'var(--danger)';
      case 'accepted': return 'var(--success)';
      default: return 'var(--text-secondary)';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="recruiter-applications">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="page-header">
            <div>
              <h1>Applications</h1>
              <p>Manage applications for your job postings</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={fetchApplications}
              disabled={loading}
            >
              <FiRefreshCw /> {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs glass">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({applications.length})
            </button>
            <button 
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending ({applications.filter(a => a.status === 'pending').length})
            </button>
            <button 
              className={filter === 'shortlisted' ? 'active' : ''}
              onClick={() => setFilter('shortlisted')}
            >
              Shortlisted ({applications.filter(a => a.status === 'shortlisted').length})
            </button>
            <button 
              className={filter === 'rejected' ? 'active' : ''}
              onClick={() => setFilter('rejected')}
            >
              Rejected ({applications.filter(a => a.status === 'rejected').length})
            </button>
          </div>

          {/* Applications List */}
          {filteredApplications.length === 0 ? (
            <div className="empty-state glass">
              <FiFileText size={64} />
              <h3>No applications found</h3>
              <p>Applications will appear here when students apply to your jobs</p>
            </div>
          ) : (
            <div className="applications-list">
              {filteredApplications.map(app => (
                <motion.div 
                  key={app._id} 
                  className="application-card glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="application-header">
                    <div className="applicant-info">
                      <div className="applicant-avatar">
                        <FiUser size={24} />
                      </div>
                      <div>
                        <h3>{app.student?.fullName || 'Student'}</h3>
                        <p>{app.student?.email || 'No email'}</p>
                      </div>
                    </div>
                    <span 
                      className="status-badge" 
                      style={{ background: getStatusColor(app.status) }}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="application-details">
                    <div className="detail-item">
                      <FiBriefcase />
                      <span>{app.job?.title || 'Job Title'}</span>
                    </div>
                    <div className="detail-item">
                      <FiCalendar />
                      <span>Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Test Score Section */}
                  {app.testScore?.score !== undefined ? (
                    <div className="test-score-section">
                      <div className="test-score-header">
                        <FiAward />
                        <span>Job Test Score</span>
                      </div>
                      <div className="test-score-content">
                        <div className={`score-badge ${app.testScore.score >= 70 ? 'high' : app.testScore.score >= 40 ? 'medium' : 'low'}`}>
                          {app.testScore.score}%
                        </div>
                        <div className="score-details">
                          <span>{app.testScore.correctAnswers} / {app.testScore.totalQuestions} correct</span>
                          {app.testScore.timeTaken && (
                            <span>
                              {Math.floor(app.testScore.timeTaken / 60)}m {app.testScore.timeTaken % 60}s
                            </span>
                          )}
                          <span className={`score-label ${app.testScore.score >= 70 ? 'high' : app.testScore.score >= 40 ? 'medium' : 'low'}`}>
                            {app.testScore.score >= 70 ? '✅ Strong Candidate' : app.testScore.score >= 40 ? '⚠️ Average' : '❌ Below Average'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="test-score-section no-score">
                      <FiAward />
                      <span>No test score available</span>
                    </div>
                  )}

                  {app.coverLetter && (
                    <div className="cover-letter">
                      <h4>Cover Letter:</h4>
                      <p>{app.coverLetter}</p>
                    </div>
                  )}

                  <div className="application-actions">
                    {app.resume && (
                      <a 
                        href={app.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        <FiEye /> View Resume
                      </a>
                    )}
                    {app.status === 'pending' && (
                      <>
                        <button 
                          className="btn btn-success"
                          onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                        >
                          <FiCheck /> Shortlist
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleStatusUpdate(app._id, 'rejected')}
                        >
                          <FiX /> Reject
                        </button>
                      </>
                    )}
                    {app.status === 'shortlisted' && (
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      >
                        <FiX /> Reject
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecruiterApplications;
