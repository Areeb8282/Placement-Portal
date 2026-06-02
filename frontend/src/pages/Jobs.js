import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiSearch, FiMapPin, FiBriefcase, FiClock, FiDollarSign, FiRefreshCw } from 'react-icons/fi';
import './Jobs.css';

const Jobs = () => {
  const { API_URL } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    workMode: ''
  });

  const fetchJobs = useCallback(async (showToast = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.workMode) params.append('workMode', filters.workMode);

      console.log('🔍 Fetching jobs from:', `${API_URL}/jobs?${params.toString()}`);
      console.log('🔍 Current time:', new Date().toLocaleString());
      
      const res = await axios.get(`${API_URL}/jobs?${params.toString()}`);
      
      console.log('✅ Jobs response received:', res.data);
      console.log('✅ Total jobs:', res.data.total);
      console.log('✅ Jobs count:', res.data.count);
      console.log('✅ Jobs array length:', res.data.jobs?.length);
      
      if (res.data.jobs && res.data.jobs.length > 0) {
        console.log('✅ First job:', res.data.jobs[0]);
        console.log('✅ Job titles:', res.data.jobs.map(j => j.title));
      }
      
      setJobs(res.data.jobs || []);
      
      if (showToast) {
        toast.success(`Loaded ${res.data.jobs?.length || 0} jobs`);
      }
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      console.error('❌ Error details:', error.response?.data);
      toast.error('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [API_URL, filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchJobs(true);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="jobs-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="jobs-header">
            <div>
              <h1>Find Your Dream Job</h1>
              <p>Explore opportunities from top companies</p>
            </div>
            <button 
              onClick={handleRefresh} 
              className="btn btn-secondary refresh-btn"
              disabled={loading}
            >
              <FiRefreshCw className={loading ? 'spinning' : ''} /> 
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Search and Filters */}
          <div className="search-section glass">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input">
                <FiSearch />
                <input
                  type="text"
                  name="search"
                  placeholder="Search jobs, companies..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>

            <div className="filters">
              <select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
                <option value="">All Job Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>

              <select name="workMode" value={filters.workMode} onChange={handleFilterChange}>
                <option value="">All Work Modes</option>
                <option value="on-site">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/jobs/${job._id}`} className="job-card glass">
                      <div className="job-header">
                        <h3>{job.title}</h3>
                        <span className={`badge ${job.jobType}`}>{job.jobType}</span>
                      </div>
                      
                      <p className="company-name">{job.company}</p>
                      
                      <div className="job-details">
                        <span>
                          <FiMapPin /> {job.location?.city || 'Remote'}
                        </span>
                        <span>
                          <FiBriefcase /> {job.workMode}
                        </span>
                        {job.salary?.min && (
                          <span>
                            <FiDollarSign /> {job.salary.min} - {job.salary.max} {job.salary.currency}
                          </span>
                        )}
                      </div>

                      <div className="job-skills">
                        {job.skills?.slice(0, 3).map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                        {job.skills?.length > 3 && (
                          <span className="skill-tag">+{job.skills.length - 3} more</span>
                        )}
                      </div>

                      <div className="job-footer">
                        <span className="posted-date">
                          <FiClock /> {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <span className="applicants">{job.applicationsCount} applicants</span>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="no-jobs glass">
                  <h3>No Jobs Found</h3>
                  <p>No jobs are currently available. Try adjusting your filters or check back later.</p>
                  <button onClick={handleRefresh} className="btn btn-primary">
                    <FiRefreshCw /> Refresh Jobs
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Jobs;
