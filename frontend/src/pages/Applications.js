import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiBriefcase, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';
import './Applications.css';

const Applications = () => {
  const { API_URL } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/applications/my-applications`);
      setApplications(res.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock color="#f59e0b" />;
      case 'reviewing':
        return <FiAlertCircle color="#3b82f6" />;
      case 'shortlisted':
        return <FiCheckCircle color="#10b981" />;
      case 'accepted':
        return <FiCheckCircle color="#10b981" />;
      case 'rejected':
        return <FiXCircle color="#ef4444" />;
      default:
        return <FiClock />;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="applications-header">
            <h1>My Applications</h1>
            <p>Track your job applications</p>
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
          <div className="applications-list">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application, index) => (
                <motion.div
                  key={application._id}
                  className="application-card glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="application-header">
                    <div className="job-info">
                      <FiBriefcase size={24} />
                      <div>
                        {application.job ? (
                          <>
                            <Link to={`/jobs/${application.job._id}`}>
                              <h3>{application.job.title}</h3>
                            </Link>
                            <p>{application.job.company}</p>
                          </>
                        ) : (
                          <>
                            <h3>Job Not Available</h3>
                            <p>This job may have been removed</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={getStatusClass(application.status)}>
                      {getStatusIcon(application.status)}
                      <span>{application.status}</span>
                    </div>
                  </div>

                  <div className="application-details">
                    <div className="detail-item">
                      <span className="label">Applied On:</span>
                      <span>{new Date(application.appliedAt || application.createdAt).toLocaleDateString()}</span>
                    </div>
                    {application.reviewedAt && (
                      <div className="detail-item">
                        <span className="label">Reviewed On:</span>
                        <span>{new Date(application.reviewedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                    {application.recruiterNotes && (
                      <div className="detail-item full-width">
                        <span className="label">Recruiter Notes:</span>
                        <p className="notes">{application.recruiterNotes}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-applications glass">
                <FiBriefcase size={48} />
                <h3>No applications found</h3>
                <p>Start applying to jobs to see them here</p>
                <Link to="/jobs">
                  <button className="btn btn-primary">Browse Jobs</button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Applications;
