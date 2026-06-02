const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');
const { jobValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', getAllJobs);

// Recruiter routes (MUST be before /:id to avoid route conflicts)
router.get('/recruiter/my-jobs', protect, authorize('recruiter'), getMyJobs);
router.post('/', protect, authorize('recruiter'), jobValidation, validate, createJob);
router.put('/:id', protect, authorize('recruiter'), updateJob);
router.delete('/:id', protect, authorize('recruiter'), deleteJob);

// Public route (MUST be last)
router.get('/:id', getJobById);

module.exports = router;
