const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  submitTest,
  getTestHistory,
  getTestStats,
  getBadges,
  submitPracticeTest
} = require('../controllers/testController');

// All routes are protected
router.use(protect);

// Test routes
router.post('/submit', submitTest);
router.post('/practice', submitPracticeTest);
router.get('/history', getTestHistory);
router.get('/stats', getTestStats);
router.get('/badges', getBadges);

module.exports = router;
