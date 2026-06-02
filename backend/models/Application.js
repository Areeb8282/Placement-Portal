const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true
  },
  
  // Application Details
  coverLetter: {
    type: String
  },
  resume: {
    filename: String,
    path: String
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'accepted'],
    default: 'pending'
  },
  
  // Timeline
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  statusUpdatedAt: {
    type: Date
  },
  
  // Test Score (from job-specific practice test taken before applying)
  testScore: {
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    totalQuestions: Number,
    correctAnswers: Number,
    timeTaken: Number, // in seconds
    testTakenAt: Date
  },

  // Recruiter Notes
  recruiterNotes: {
    type: String
  },
  
  // Interview Details
  interview: {
    scheduled: {
      type: Boolean,
      default: false
    },
    date: Date,
    time: String,
    mode: {
      type: String,
      enum: ['online', 'offline']
    },
    location: String,
    meetingLink: String
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate applications
applicationSchema.index({ job: 1, student: 1 }, { unique: true });

// Index for queries
applicationSchema.index({ student: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });

module.exports = mongoose.model('Application', applicationSchema);
