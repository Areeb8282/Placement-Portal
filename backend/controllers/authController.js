const jwt = require('jsonwebtoken');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const RecruiterProfile = require('../models/RecruiterProfile');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { email, password, role, fullName, companyName } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // If email exists but with a different role, give a clear message
      if (userExists.role !== (role || 'student')) {
        return res.status(400).json({
          message: `This email is already registered as a ${userExists.role}. Please login as a ${userExists.role}.`
        });
      }
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create user
    const user = await User.create({
      email,
      password,
      role: role || 'student'
    });
    
    // Create profile based on role
    if (user.role === 'student') {
      await StudentProfile.create({
        user: user._id,
        fullName: fullName || ''
      });
    } else if (user.role === 'recruiter') {
      await RecruiterProfile.create({
        user: user._id,
        fullName: fullName || '',
        companyName: companyName || ''
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: fullName || ''
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check role mismatch if role is provided in request
    if (role && user.role !== role) {
      return res.status(403).json({
        message: `This email is registered as a ${user.role}, not a ${role}. Please select the correct role.`
      });
    }
    
    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }
    
    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    // Get profile to fetch full name
    let fullName = '';
    if (user.role === 'student') {
      const profile = await StudentProfile.findOne({ user: user._id });
      fullName = profile?.fullName || '';
    } else if (user.role === 'recruiter') {
      const profile = await RecruiterProfile.findOne({ user: user._id });
      fullName = profile?.fullName || '';
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    let profile = null;
    let fullName = '';
    
    if (user.role === 'student') {
      profile = await StudentProfile.findOne({ user: user._id });
      fullName = profile?.fullName || '';
    } else if (user.role === 'recruiter') {
      profile = await RecruiterProfile.findOne({ user: user._id });
      fullName = profile?.fullName || '';
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName,
        profile
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
