const StudentProfile = require('../models/StudentProfile');
const User = require('../models/User');

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private (Student)
exports.getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update student profile
// @route   PUT /api/students/profile
// @access  Private (Student)
exports.updateProfile = async (req, res) => {
  try {
    let profile = await StudentProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      profile = await StudentProfile.create({
        user: req.user.id,
        ...req.body
      });
    } else {
      profile = await StudentProfile.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.json({ success: true, profile });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all student profiles (for recruiters)
// @route   GET /api/students
// @access  Private (Recruiter)
exports.getAllStudents = async (req, res) => {
  try {
    const { skills, minCompletion } = req.query;
    
    let query = {};
    
    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(',');
      query['skills.name'] = { $in: skillsArray };
    }
    
    // Filter by profile completion
    if (minCompletion) {
      query.profileCompletion = { $gte: parseInt(minCompletion) };
    }
    
    const students = await StudentProfile.find(query)
      .populate('user', 'email')
      .select('-bookmarkedJobs')
      .sort('-profileCompletion');
    
    res.json({ success: true, count: students.length, students });
  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private (Recruiter)
exports.getStudentById = async (req, res) => {
  try {
    const student = await StudentProfile.findById(req.params.id)
      .populate('user', 'email');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ success: true, student });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Bookmark a job
// @route   POST /api/students/bookmark/:jobId
// @access  Private (Student)
exports.bookmarkJob = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const jobId = req.params.jobId;
    
    // Check if already bookmarked
    if (profile.bookmarkedJobs.includes(jobId)) {
      return res.status(400).json({ message: 'Job already bookmarked' });
    }
    
    profile.bookmarkedJobs.push(jobId);
    await profile.save();
    
    res.json({ success: true, message: 'Job bookmarked successfully' });
  } catch (error) {
    console.error('Bookmark job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove bookmark
// @route   DELETE /api/students/bookmark/:jobId
// @access  Private (Student)
exports.removeBookmark = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    profile.bookmarkedJobs = profile.bookmarkedJobs.filter(
      job => job.toString() !== req.params.jobId
    );
    
    await profile.save();
    
    res.json({ success: true, message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get bookmarked jobs
// @route   GET /api/students/bookmarks
// @access  Private (Student)
exports.getBookmarkedJobs = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id })
      .populate({
        path: 'bookmarkedJobs',
        populate: { path: 'recruiter', select: 'email' }
      });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json({ success: true, jobs: profile.bookmarkedJobs });
  } catch (error) {
    console.error('Get bookmarked jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
