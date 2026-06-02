const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllStudents,
  getStudentById,
  bookmarkJob,
  removeBookmark,
  getBookmarkedJobs
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

// Student routes
router.get('/profile', protect, authorize('student'), getProfile);
router.put('/profile', protect, authorize('student'), updateProfile);
router.post('/bookmark/:jobId', protect, authorize('student'), bookmarkJob);
router.delete('/bookmark/:jobId', protect, authorize('student'), removeBookmark);
router.get('/bookmarks', protect, authorize('student'), getBookmarkedJobs);

// Recruiter routes
router.get('/', protect, authorize('recruiter', 'admin'), getAllStudents);
router.get('/:id', protect, authorize('recruiter', 'admin'), getStudentById);

module.exports = router;
