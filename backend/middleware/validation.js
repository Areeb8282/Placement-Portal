const { body, validationResult } = require('express-validator');

// Validation middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array() 
    });
  }
  next();
};

// Registration validation rules
exports.registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['student', 'recruiter'])
    .withMessage('Role must be either student or recruiter')
];

// Login validation rules
exports.loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Job validation rules
exports.jobValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Job title is required'),
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company name is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Job description is required'),
  body('applicationDeadline')
    .isISO8601()
    .withMessage('Valid application deadline is required')
];
