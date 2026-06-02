import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiCalendar, FiBookmark } from 'react-icons/fi';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_URL, user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchJobDetails = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs/${id}`);
      setJob(res.data.job);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Job not found');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  }, [API_URL, id, navigate]);

  const checkIfSaved = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/students/bookmarks`);
      const savedJobs = res.data.jobs || [];
      setIsSaved(savedJobs.some(job => job._id === id));
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  }, [API_URL, id]);

  useEffect(() => {
    fetchJobDetails();
    if (isAuthenticated && user?.role === 'student') {
      checkIfSaved();
    }
  }, [fetchJobDetails, checkIfSaved, isAuthenticated, user?.role]);

  const handleSaveJob = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to save jobs');
      navigate('/login');
      return;
    }

    if (user?.role !== 'student') {
      toast.error('Only students can save jobs');
      return;
    }

    setSaving(true);

    try {
      if (isSaved) {
        await axios.delete(`${API_URL}/students/bookmark/${id}`);
        setIsSaved(false);
        toast.success('Job removed from saved list');
      } else {
        await axios.post(`${API_URL}/students/bookmark/${id}`);
        setIsSaved(true);
        toast.success('Job saved successfully!');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save job';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    if (user?.role !== 'student') {
      toast.error('Only students can apply for jobs');
      return;
    }

    // Redirect to practice test first — application will be submitted after test completes
    toast.success('Please complete the job test to apply!');
    navigate(`/practice-test/${id}`, {
      state: { applyMode: true, coverLetter }
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="job-details-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="job-details-container">
            <div className="job-main glass">
              <div className="job-title-section">
                <div>
                  <h1>{job.title}</h1>
                  <p className="company">{job.company}</p>
                </div>
                <span className={`badge ${job.jobType}`}>{job.jobType}</span>
              </div>

              <div className="job-meta">
                <span><FiMapPin /> {job.location?.city || 'Remote'}</span>
                <span><FiBriefcase /> {job.workMode}</span>
                {job.salary?.min && (
                  <span>
                    <FiDollarSign /> {job.salary.min} - {job.salary.max} {job.salary.currency}
                  </span>
                )}
                <span><FiClock /> {job.experience?.min || 0} - {job.experience?.max || 2} years</span>
                <span><FiCalendar /> Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
              </div>

              <div className="job-section">
                <h2>Job Description</h2>
                <p>{job.description}</p>
              </div>

              <div className="job-section">
                <h2>Requirements</h2>
                <p>{job.requirements}</p>
              </div>

              {job.responsibilities && (
                <div className="job-section">
                  <h2>Responsibilities</h2>
                  <p>{job.responsibilities}</p>
                </div>
              )}

              <div className="job-section">
                <h2>Required Skills</h2>
                <div className="skills-list">
                  {job.skills?.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="job-stats">
                <span>{job.views} views</span>
                <span>{job.applicationsCount} applicants</span>
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {user?.role === 'student' && (
              <div className="apply-section glass">
                <div className="action-buttons">
                  <button 
                    onClick={handleSaveJob}
                    className={`btn btn-save ${isSaved ? 'saved' : ''}`}
                    disabled={saving}
                    title={isSaved ? 'Remove from saved' : 'Save job'}
                  >
                    <FiBookmark className={isSaved ? 'filled' : ''} />
                    {saving ? 'Saving...' : isSaved ? 'Saved' : 'Save Job'}
                  </button>
                  
                  <Link 
                    to={`/practice-test/${id}`}
                    className="btn btn-practice"
                    title="Practice test for this job"
                  >
                    <FiClock />
                    Practice Test
                  </Link>
                </div>

                <h2>Apply for this Job</h2>
                <p className="apply-note">📋 You'll need to complete a short job-specific test before your application is submitted. Your score will be shared with the recruiter.</p>
                <form onSubmit={handleApply}>
                  <div className="form-group">
                    <label>Cover Letter (Optional)</label>
                    <textarea
                      rows="6"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-full"
                    disabled={applying}
                  >
                    {applying ? 'Redirecting...' : '🧪 Take Test & Apply'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
