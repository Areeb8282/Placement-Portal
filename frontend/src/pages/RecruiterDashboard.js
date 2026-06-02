import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiBriefcase, FiUsers, FiFileText, FiPlus, FiEdit, FiTrash2, FiTrendingUp } from 'react-icons/fi';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const { API_URL, user } = useAuth();
  
  // Debug: Log user info
  console.log('RecruiterDashboard - Rendering for user:', user);
  console.log('RecruiterDashboard - User role:', user?.role);
  
  const [stats, setStats] = useState({ totalJobs: 0, activeJobs: 0, totalApplications: 0 });
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    jobType: 'full-time',
    workMode: 'on-site',
    location: { city: '', state: '' },
    salary: { min: '', max: '', currency: 'INR' },
    skills: '',
    applicationDeadline: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      console.log('Fetching dashboard data with token:', token ? 'Token exists' : 'No token');
      
      const [statsRes, jobsRes] = await Promise.all([
        axios.get(`${API_URL}/recruiters/stats`, config),
        axios.get(`${API_URL}/jobs/recruiter/my-jobs`, config)
      ]);
      
      console.log('Stats response:', statsRes.data);
      console.log('Jobs response:', jobsRes.data);
      
      setStats(statsRes.data.stats || { totalJobs: 0, activeJobs: 0, totalApplications: 0 });
      setJobs(jobsRes.data.jobs || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.error('Error response:', error.response?.data);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleJobFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setJobForm({ ...jobForm, [parent]: { ...jobForm[parent], [child]: value } });
    } else {
      setJobForm({ ...jobForm, [name]: value });
    }
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    const jobData = {
      ...jobForm,
      skills: jobForm.skills.split(',').map(s => s.trim()).filter(s => s)
    };

    try {
      if (editingJob) {
        await axios.put(`${API_URL}/jobs/${editingJob._id}`, jobData, config);
        toast.success('Job updated successfully!');
      } else {
        await axios.post(`${API_URL}/jobs`, jobData, config);
        toast.success('Job posted successfully!');
      }
      
      setShowJobForm(false);
      setEditingJob(null);
      resetJobForm();
      fetchDashboardData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save job');
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setJobForm({
      ...job,
      skills: job.skills.join(', ')
    });
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      await axios.delete(`${API_URL}/jobs/${jobId}`, config);
      toast.success('Job deleted successfully!');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const resetJobForm = () => {
    setJobForm({
      title: '',
      company: '',
      description: '',
      requirements: '',
      jobType: 'full-time',
      workMode: 'on-site',
      location: { city: '', state: '' },
      salary: { min: '', max: '', currency: 'INR' },
      skills: '',
      applicationDeadline: ''
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
    <div className="recruiter-dashboard">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Welcome Message */}
          {user?.fullName && (
            <motion.div 
              className="welcome-message glass"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>Welcome, {user.fullName.split(' ')[0]}! 👋</h2>
              <p>Manage your job postings and find the best talent</p>
            </motion.div>
          )}

          <div className="dashboard-header">
            <div>
              <h1>Recruiter Dashboard</h1>
              <p>Manage your job postings and applications</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setShowJobForm(true);
                setEditingJob(null);
                resetJobForm();
              }}
            >
              <FiPlus /> Post New Job
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card glass">
              <div className="stat-icon" style={{ background: 'var(--gradient-primary)' }}>
                <FiBriefcase size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalJobs}</h3>
                <p>Total Jobs</p>
              </div>
            </div>
            <div className="stat-card glass">
              <div className="stat-icon" style={{ background: 'var(--gradient-success)' }}>
                <FiBriefcase size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.activeJobs}</h3>
                <p>Active Jobs</p>
              </div>
            </div>
            <div className="stat-card glass">
              <div className="stat-icon" style={{ background: 'var(--gradient-secondary)' }}>
                <FiFileText size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalApplications}</h3>
                <p>Total Applications</p>
              </div>
            </div>
            <div className="stat-card glass">
              <div className="stat-icon" style={{ background: 'var(--gradient-warning)' }}>
                <FiUsers size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.pendingApplications || 0}</h3>
                <p>Pending Review</p>
              </div>
            </div>
            <div className="stat-card glass">
              <div className="stat-icon" style={{ background: 'var(--gradient-info)' }}>
                <FiUsers size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.shortlistedApplications || 0}</h3>
                <p>Shortlisted</p>
              </div>
            </div>
            <div className="stat-card glass">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <FiTrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalViews || 0}</h3>
                <p>Total Views</p>
              </div>
            </div>
          </div>

          {/* Job Form Modal */}
          {showJobForm && (
            <div className="modal-overlay" onClick={() => setShowJobForm(false)}>
              <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
                <h2>{editingJob ? 'Edit Job' : 'Post New Job'}</h2>
                <form onSubmit={handleSubmitJob} className="job-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Job Title *</label>
                      <input type="text" name="title" value={jobForm.title} onChange={handleJobFormChange} required />
                    </div>
                    <div className="form-group">
                      <label>Company *</label>
                      <input type="text" name="company" value={jobForm.company} onChange={handleJobFormChange} required />
                    </div>
                    <div className="form-group">
                      <label>Job Type *</label>
                      <select name="jobType" value={jobForm.jobType} onChange={handleJobFormChange}>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Work Mode *</label>
                      <select name="workMode" value={jobForm.workMode} onChange={handleJobFormChange}>
                        <option value="on-site">On-site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" name="location.city" value={jobForm.location.city} onChange={handleJobFormChange} />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input type="text" name="location.state" value={jobForm.location.state} onChange={handleJobFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Min Salary</label>
                      <input type="number" name="salary.min" value={jobForm.salary.min} onChange={handleJobFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Max Salary</label>
                      <input type="number" name="salary.max" value={jobForm.salary.max} onChange={handleJobFormChange} />
                    </div>
                    <div className="form-group full-width">
                      <label>Skills (comma separated)</label>
                      <input type="text" name="skills" value={jobForm.skills} onChange={handleJobFormChange} placeholder="React, Node.js, MongoDB" />
                    </div>
                    <div className="form-group full-width">
                      <label>Description *</label>
                      <textarea name="description" value={jobForm.description} onChange={handleJobFormChange} rows="4" required />
                    </div>
                    <div className="form-group full-width">
                      <label>Requirements *</label>
                      <textarea name="requirements" value={jobForm.requirements} onChange={handleJobFormChange} rows="4" required />
                    </div>
                    <div className="form-group">
                      <label>Application Deadline *</label>
                      <input type="date" name="applicationDeadline" value={jobForm.applicationDeadline} onChange={handleJobFormChange} required />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowJobForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingJob ? 'Update' : 'Post'} Job</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Jobs List */}
          <div className="jobs-section">
            <h2>My Job Postings</h2>
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job._id} className="job-card glass">
                  <div className="job-card-header">
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.company}</p>
                    </div>
                    <span className={`badge ${job.status}`}>{job.status}</span>
                  </div>
                  <div className="job-card-stats">
                    <span>{job.applicationsCount} Applications</span>
                    <span>{job.views} Views</span>
                  </div>
                  <div className="job-card-actions">
                    <Link to={`/jobs/${job._id}`} className="btn btn-secondary">View</Link>
                    <button onClick={() => handleEditJob(job)} className="btn btn-secondary"><FiEdit /></button>
                    <button onClick={() => handleDeleteJob(job._id)} className="btn btn-secondary"><FiTrash2 /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
