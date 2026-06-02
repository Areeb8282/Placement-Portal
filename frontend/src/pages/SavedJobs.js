import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiBookmark, FiMapPin, FiBriefcase, FiDollarSign, FiTrash2 } from 'react-icons/fi';
import './SavedJobs.css';

const SavedJobs = () => {
  const { API_URL } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/students/bookmarks`);
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      toast.error('Failed to fetch saved jobs');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const handleRemoveBookmark = async (jobId) => {
    try {
      await axios.delete(`${API_URL}/students/bookmark/${jobId}`);
      setJobs(jobs.filter(job => job._id !== jobId));
      toast.success('Job removed from saved list');
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast.error('Failed to remove bookmark');
    }
  };

  const formatSalary = (salary) => {
    if (!salary || !salary.min) return 'Not disclosed';
    const min = (salary.min / 100000).toFixed(1);
    const max = salary.max ? (salary.max / 100000).toFixed(1) : null;
    return max ? `₹${min} - ${max} LPA` : `₹${min} LPA`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="saved-jobs-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="page-header">
            <div>
              <h1><FiBookmark /> Saved Jobs</h1>
              <p>Jobs you've bookmarked for later</p>
            </div>
            <div className="saved-count">
              {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Saved
            </div>
          </div>

          {jobs.length > 0 ? (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  className="job-card glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="job-header">
                    <div>
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveBookmark(job._id)}
                      title="Remove from saved"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="job-details">
                    <div className="detail-item">
                      <FiMapPin />
                      <span>
                        {job.workMode === 'remote' 
                          ? 'Remote' 
                          : `${job.location?.city || 'Location'}, ${job.location?.state || ''}`
                        }
                      </span>
                    </div>
                    <div className="detail-item">
                      <FiBriefcase />
                      <span className="job-type">{job.jobType}</span>
                    </div>
                    <div className="detail-item">
                      <FiDollarSign />
                      <span>{formatSalary(job.salary)}</span>
                    </div>
                  </div>

                  {job.skills && job.skills.length > 0 && (
                    <div className="skills-tags">
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="skill-tag more">+{job.skills.length - 4}</span>
                      )}
                    </div>
                  )}

                  {job.requiredTests && job.requiredTests.length > 0 && (
                    <div className="required-tests">
                      <strong>Recommended Tests:</strong>
                      <div className="test-tags">
                        {job.requiredTests.map((test, index) => (
                          <span key={index} className="test-tag">{test}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="job-footer">
                    <span className="deadline">
                      Deadline: {formatDate(job.applicationDeadline)}
                    </span>
                    <Link to={`/jobs/${job._id}`} className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-state glass">
              <FiBookmark size={80} />
              <h2>No Saved Jobs Yet</h2>
              <p>Start bookmarking jobs you're interested in to see them here</p>
              <Link to="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SavedJobs;
