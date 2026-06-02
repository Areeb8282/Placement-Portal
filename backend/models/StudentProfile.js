const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  
  // Education
  education: [{
    degree: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    fieldOfStudy: String,
    startYear: Number,
    endYear: Number,
    cgpa: Number,
    percentage: Number
  }],
  
  // Skills
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate'
    }
  }],
  
  // Projects
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    technologies: [String],
    link: String,
    startDate: Date,
    endDate: Date
  }],
  
  // Experience
  experience: [{
    company: String,
    position: String,
    description: String,
    startDate: Date,
    endDate: Date,
    current: Boolean
  }],
  
  // Social Links
  linkedIn: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  
  // Resume
  resume: {
    filename: String,
    path: String,
    uploadedAt: Date
  },
  
  // Profile completion
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Bookmarked jobs
  bookmarkedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  
  // Test Scores
  testScores: {
    aptitude: {
      bestScore: { type: Number, default: 0 },
      lastScore: { type: Number, default: 0 },
      attempts: { type: Number, default: 0 }
    },
    technical: {
      bestScore: { type: Number, default: 0 },
      lastScore: { type: Number, default: 0 },
      attempts: { type: Number, default: 0 }
    },
    coding: {
      bestScore: { type: Number, default: 0 },
      lastScore: { type: Number, default: 0 },
      attempts: { type: Number, default: 0 }
    },
    core: {
      bestScore: { type: Number, default: 0 },
      lastScore: { type: Number, default: 0 },
      attempts: { type: Number, default: 0 }
    }
  },
  
  // Profile Strength
  profileStrength: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Calculate profile completion percentage
studentProfileSchema.methods.calculateProfileCompletion = function() {
  let completion = 0;
  const weights = {
    fullName: 10,
    phone: 5,
    education: 20,
    skills: 15,
    projects: 15,
    experience: 10,
    resume: 15,
    linkedIn: 5,
    github: 5
  };
  
  if (this.fullName) completion += weights.fullName;
  if (this.phone) completion += weights.phone;
  if (this.education && this.education.length > 0) completion += weights.education;
  if (this.skills && this.skills.length > 0) completion += weights.skills;
  if (this.projects && this.projects.length > 0) completion += weights.projects;
  if (this.experience && this.experience.length > 0) completion += weights.experience;
  if (this.resume && this.resume.filename) completion += weights.resume;
  if (this.linkedIn) completion += weights.linkedIn;
  if (this.github) completion += weights.github;
  
  this.profileCompletion = completion;
  return completion;
};

// Calculate profile strength (includes tests)
studentProfileSchema.methods.calculateProfileStrength = function() {
  let strength = 0;
  const weights = {
    fullName: 5,
    phone: 3,
    education: 10,
    skills: 10,
    projects: 10,
    experience: 8,
    resume: 15,
    linkedIn: 5,
    github: 5,
    testsAttempted: 15,
    testScores: 14
  };
  
  if (this.fullName) strength += weights.fullName;
  if (this.phone) strength += weights.phone;
  if (this.education && this.education.length > 0) strength += weights.education;
  if (this.skills && this.skills.length >= 3) strength += weights.skills;
  if (this.projects && this.projects.length > 0) strength += weights.projects;
  if (this.experience && this.experience.length > 0) strength += weights.experience;
  if (this.resume && this.resume.filename) strength += weights.resume;
  if (this.linkedIn) strength += weights.linkedIn;
  if (this.github) strength += weights.github;
  
  // Tests attempted
  const totalAttempts = (this.testScores?.aptitude?.attempts || 0) +
                       (this.testScores?.technical?.attempts || 0) +
                       (this.testScores?.coding?.attempts || 0) +
                       (this.testScores?.core?.attempts || 0);
  if (totalAttempts >= 2) strength += weights.testsAttempted;
  
  // Test scores (average of best scores)
  const scores = [
    this.testScores?.aptitude?.bestScore || 0,
    this.testScores?.technical?.bestScore || 0,
    this.testScores?.coding?.bestScore || 0,
    this.testScores?.core?.bestScore || 0
  ];
  const avgScore = scores.reduce((a, b) => a + b, 0) / 4;
  if (avgScore >= 50) strength += weights.testScores;
  
  this.profileStrength = Math.min(strength, 100);
  return this.profileStrength;
};

// Update profile completion before saving
studentProfileSchema.pre('save', function(next) {
  this.calculateProfileCompletion();
  this.calculateProfileStrength();
  next();
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
