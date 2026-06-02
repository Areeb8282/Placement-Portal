const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testId: {
    type: String
  },
  testName: {
    type: String
  },
  category: {
    type: String,
    enum: ['aptitude', 'technical', 'coding', 'core', 'practice']
  },
  // For practice tests
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  jobTitle: {
    type: String
  },
  testType: {
    type: String,
    enum: ['regular', 'practice'],
    default: 'regular'
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  wrongAnswers: {
    type: Number
  },
  timeTaken: {
    type: Number // in seconds
  },
  timeSpent: {
    type: Number // in seconds
  },
  answers: [{
    questionId: Number,
    selectedAnswer: Number,
    isCorrect: Boolean
  }],
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
testResultSchema.index({ user: 1, category: 1 });
testResultSchema.index({ user: 1, completedAt: -1 });

module.exports = mongoose.model('TestResult', testResultSchema);
