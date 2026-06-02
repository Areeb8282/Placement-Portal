const mongoose = require('mongoose');

const recruiterProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    trim: true,
    default: ''
  },
  fullName: {
    type: String,
    trim: true,
    default: ''
  },
  designation: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  companyWebsite: {
    type: String,
    trim: true
  },
  companyDescription: {
    type: String
  },
  companyLogo: {
    filename: String,
    path: String
  },
  industry: {
    type: String,
    trim: true
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RecruiterProfile', recruiterProfileSchema);
