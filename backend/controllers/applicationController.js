const Application = require('../models/Application');
const Job = require('../models/Job');
const StudentProfile = require('../models/StudentProfile');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Student)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter, testScore } = req.body;
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if job is active
    if (job.status !== 'active') {
      return res.status(400).json({ message: 'Job is not accepting applications' });
    }
    
    // Check deadline
    if (new Date() > new Date(job.applicationDeadline)) {
      return res.status(400).json({ message: 'Application deadline has passed' });
    }
    
    // Get student profile
    const studentProfile = await StudentProfile.findOne({ user: req.user.id });
    if (!studentProfile) {
      return res.status(404).json({ message: 'Please complete your profile first' });
    }
    
    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      student: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Create application
    const application = await Application.create({
      job: jobId,
      student: req.user.id,
      studentProfile: studentProfile._id,
      coverLetter,
      resume: studentProfile.resume,
      testScore: testScore || null
    });
    
    console.log('✅ Application created:', {
      applicationId: application._id,
      jobId: jobId,
      studentId: req.user.id,
      status: application.status
    });
    
    // Increment applications count
    job.applicationsCount += 1;
    await job.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully',
      application 
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student's applications
// @route   GET /api/applications/my-applications
// @access  Private (Student)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id })
      .populate('job')
      .sort('-appliedAt');
    
    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter)
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check ownership
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const applications = await Application.find({ job: req.params.jobId })
      .populate('student', 'email')
      .populate('studentProfile')
      .sort('-appliedAt');
    
    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, recruiterNotes } = req.body;
    
    const application = await Application.findById(req.params.id)
      .populate('job');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check ownership
    if (application.job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    application.status = status;
    application.statusUpdatedAt = Date.now();
    
    if (recruiterNotes) {
      application.recruiterNotes = recruiterNotes;
    }
    
    if (status === 'reviewing' || status === 'shortlisted') {
      application.reviewedAt = Date.now();
    }
    
    await application.save();
    
    res.json({ 
      success: true, 
      message: 'Application status updated',
      application 
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate('student', 'email')
      .populate('studentProfile');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check authorization
    const isStudent = application.student._id.toString() === req.user.id;
    const isRecruiter = application.job.recruiter.toString() === req.user.id;
    
    if (!isStudent && !isRecruiter) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json({ success: true, application });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private (Student - own applications only)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check ownership
    if (application.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Only allow deletion if status is pending
    if (application.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Cannot delete application that has been reviewed' 
      });
    }
    
    await application.deleteOne();
    
    // Decrement applications count
    await Job.findByIdAndUpdate(application.job, {
      $inc: { applicationsCount: -1 }
    });
    
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
