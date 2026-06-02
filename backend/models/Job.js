const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: {
    type: String,
    required: true
  },
  responsibilities: {
    type: String
  },
  
  // Job Details
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'contract'],
    default: 'full-time'
  },
  workMode: {
    type: String,
    enum: ['on-site', 'remote', 'hybrid'],
    default: 'on-site'
  },
  experience: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    }
  },
  
  // Salary
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  
  // Location
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  
  // Skills Required
  skills: [{
    type: String,
    trim: true
  }],
  
  // Required Tests for this job
  requiredTests: [{
    type: String,
    enum: ['aptitude', 'technical', 'coding', 'core']
  }],
  
  // Education
  educationRequired: {
    type: String,
    enum: ['high-school', 'diploma', 'bachelors', 'masters', 'phd', 'any'],
    default: 'bachelors'
  },
  
  // Application Details
  openings: {
    type: Number,
    default: 1,
    min: 1
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  
  // Metadata
  views: {
    type: Number,
    default: 0
  },
  applicationsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search optimization
jobSchema.index({ title: 'text', company: 'text', description: 'text' });
jobSchema.index({ skills: 1 });
jobSchema.index({ status: 1, applicationDeadline: 1 });

module.exports = mongoose.model('Job', jobSchema);
