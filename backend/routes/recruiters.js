const express = require('express');
const router = express.Router();
const RecruiterProfile = require('../models/RecruiterProfile');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get recruiter dashboard stats
// @route   GET /api/recruiters/stats
// @access  Private (Recruiter)
router.get('/stats', protect, authorize('recruiter'), async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id });
    const jobIds = jobs.map(job => job._id);
    
    const applications = await Application.find({ job: { $in: jobIds } });
    
    const stats = {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => j.status === 'active').length,
      closedJobs: jobs.filter(j => j.status === 'closed').length,
      totalApplications: applications.length,
      pendingApplications: applications.filter(a => a.status === 'pending').length,
      shortlistedApplications: applications.filter(a => a.status === 'shortlisted').length,
      rejectedApplications: applications.filter(a => a.status === 'rejected').length,
      totalViews: jobs.reduce((sum, job) => sum + job.views, 0)
    };
    
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Get recruiter stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all applications for recruiter's jobs
// @route   GET /api/recruiters/applications
// @access  Private (Recruiter)
router.get('/applications', protect, authorize('recruiter'), async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id });
    const jobIds = jobs.map(job => job._id);
    
    console.log('📋 Fetching applications for recruiter:', req.user.id);
    console.log('📋 Recruiter has', jobs.length, 'jobs');
    console.log('📋 Job IDs:', jobIds);
    
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('student', 'email')
      .populate('studentProfile', 'fullName')
      .populate('job', 'title company')
      .sort('-createdAt');
    
    console.log('📋 Found', applications.length, 'applications');
    
    // Format the response to include student details
    const formattedApplications = applications.map(app => ({
      _id: app._id,
      student: {
        email: app.student?.email || 'No email',
        fullName: app.studentProfile?.fullName || 'Student'
      },
      job: app.job,
      coverLetter: app.coverLetter,
      resume: app.resume?.path || null,
      status: app.status,
      testScore: app.testScore || null,
      createdAt: app.createdAt,
      appliedAt: app.appliedAt
    }));
    
    res.json({ success: true, count: formattedApplications.length, applications: formattedApplications });
  } catch (error) {
    console.error('Get recruiter applications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get recruiter profile
// @route   GET /api/recruiters/profile
// @access  Private (Recruiter)
router.get('/profile', protect, authorize('recruiter'), async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Get recruiter profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update recruiter profile
// @route   PUT /api/recruiters/profile
// @access  Private (Recruiter)
router.put('/profile', protect, authorize('recruiter'), async (req, res) => {
  try {
    let profile = await RecruiterProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      profile = await RecruiterProfile.create({
        user: req.user.id,
        ...req.body
      });
    } else {
      profile = await RecruiterProfile.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Update recruiter profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
