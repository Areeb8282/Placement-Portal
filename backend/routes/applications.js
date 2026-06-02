const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  getApplicationById,
  deleteApplication
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

// Student routes
router.post('/', protect, authorize('student'), applyForJob);
router.get('/my-applications', protect, authorize('student'), getMyApplications);
router.delete('/:id', protect, authorize('student'), deleteApplication);

// Recruiter routes
router.get('/job/:jobId', protect, authorize('recruiter'), getJobApplications);
router.put('/:id/status', protect, authorize('recruiter'), updateApplicationStatus);

// Common routes
router.get('/:id', protect, getApplicationById);

module.exports = router;
