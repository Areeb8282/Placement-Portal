const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badgeType: {
    type: String,
    enum: [
      'first_test',
      'high_scorer',
      'test_master',
      'aptitude_expert',
      'technical_guru',
      'coding_ninja',
      'profile_complete',
      'job_hunter'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  earnedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent duplicate badges
badgeSchema.index({ user: 1, badgeType: 1 }, { unique: true });

module.exports = mongoose.model('Badge', badgeSchema);
