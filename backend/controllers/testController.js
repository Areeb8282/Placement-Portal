const TestResult = require('../models/TestResult');
const StudentProfile = require('../models/StudentProfile');
const Badge = require('../models/Badge');

// Badge definitions
const BADGES = {
  first_test: {
    title: 'First Steps',
    description: 'Completed your first test',
    icon: '🎯'
  },
  high_scorer: {
    title: 'High Scorer',
    description: 'Scored above 70% in any test',
    icon: '⭐'
  },
  test_master: {
    title: 'Test Master',
    description: 'Completed all 4 test categories',
    icon: '🏆'
  },
  aptitude_expert: {
    title: 'Aptitude Expert',
    description: 'Scored above 80% in Aptitude',
    icon: '🧠'
  },
  technical_guru: {
    title: 'Technical Guru',
    description: 'Scored above 80% in Technical',
    icon: '💻'
  },
  coding_ninja: {
    title: 'Coding Ninja',
    description: 'Scored above 80% in Coding',
    icon: '⚡'
  }
};

// Award badge to user
const awardBadge = async (userId, badgeType) => {
  try {
    const badgeInfo = BADGES[badgeType];
    if (!badgeInfo) return;

    await Badge.findOneAndUpdate(
      { user: userId, badgeType },
      {
        user: userId,
        badgeType,
        title: badgeInfo.title,
        description: badgeInfo.description,
        icon: badgeInfo.icon
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error awarding badge:', error);
  }
};

// @desc    Submit test result
// @route   POST /api/tests/submit
// @access  Private
exports.submitTest = async (req, res) => {
  try {
    const { testId, testName, category, score, totalQuestions, correctAnswers, timeTaken, answers } = req.body;
    
    // Create test result
    const testResult = await TestResult.create({
      user: req.user.id,
      testId,
      testName,
      category,
      score,
      totalQuestions,
      correctAnswers,
      timeTaken,
      answers
    });

    // Update student profile test scores
    const profile = await StudentProfile.findOne({ user: req.user.id });
    if (profile) {
      const categoryScores = profile.testScores[category];
      
      // Update scores
      categoryScores.lastScore = score;
      categoryScores.bestScore = Math.max(categoryScores.bestScore, score);
      categoryScores.attempts += 1;
      
      await profile.save();
      
      // Award badges
      const totalTests = await TestResult.countDocuments({ user: req.user.id });
      
      if (totalTests === 1) {
        await awardBadge(req.user.id, 'first_test');
      }
      
      if (score >= 70) {
        await awardBadge(req.user.id, 'high_scorer');
      }
      
      if (score >= 80) {
        if (category === 'aptitude') await awardBadge(req.user.id, 'aptitude_expert');
        if (category === 'technical') await awardBadge(req.user.id, 'technical_guru');
        if (category === 'coding') await awardBadge(req.user.id, 'coding_ninja');
      }
      
      // Check if completed all categories
      const categories = await TestResult.distinct('category', { user: req.user.id });
      if (categories.length === 4) {
        await awardBadge(req.user.id, 'test_master');
      }
    }

    // Generate feedback
    const feedback = generateFeedback(score, category);

    res.status(201).json({
      success: true,
      testResult,
      feedback
    });
  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({ message: 'Failed to submit test result' });
  }
};

// @desc    Get test history
// @route   GET /api/tests/history
// @access  Private
exports.getTestHistory = async (req, res) => {
  try {
    const tests = await TestResult.find({ user: req.user.id })
      .sort({ completedAt: -1 });

    res.json({
      success: true,
      tests
    });
  } catch (error) {
    console.error('Get test history error:', error);
    res.status(500).json({ message: 'Failed to fetch test history' });
  }
};

// @desc    Get test statistics
// @route   GET /api/tests/stats
// @access  Private
exports.getTestStats = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id });
    const badges = await Badge.find({ user: req.user.id });
    
    // Get skill gaps
    const skillGaps = generateSkillGaps(profile?.testScores);

    res.json({
      success: true,
      testScores: profile?.testScores || {},
      badges,
      skillGaps,
      profileStrength: profile?.profileStrength || 0
    });
  } catch (error) {
    console.error('Get test stats error:', error);
    res.status(500).json({ message: 'Failed to fetch test statistics' });
  }
};

// @desc    Get user badges
// @route   GET /api/tests/badges
// @access  Private
exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find({ user: req.user.id }).sort({ earnedAt: -1 });

    res.json({
      success: true,
      badges
    });
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({ message: 'Failed to fetch badges' });
  }
};

// Generate feedback based on score
const generateFeedback = (score, category) => {
  const feedback = {
    score,
    category,
    strengths: [],
    improvements: [],
    suggestions: []
  };

  if (score >= 80) {
    feedback.strengths.push(`Excellent performance in ${category}!`);
    feedback.strengths.push('You have strong understanding of the concepts');
    feedback.suggestions.push('Keep practicing to maintain your skills');
    feedback.suggestions.push('Try advanced level questions');
  } else if (score >= 60) {
    feedback.strengths.push(`Good performance in ${category}`);
    feedback.improvements.push('Focus on areas where you made mistakes');
    feedback.suggestions.push('Review the concepts and practice more');
    feedback.suggestions.push('Take the test again to improve your score');
  } else if (score >= 40) {
    feedback.improvements.push(`Need more practice in ${category}`);
    feedback.improvements.push('Review fundamental concepts');
    feedback.suggestions.push('Study the topics thoroughly before retaking');
    feedback.suggestions.push('Practice similar questions daily');
  } else {
    feedback.improvements.push(`Requires significant improvement in ${category}`);
    feedback.improvements.push('Start with basics and build foundation');
    feedback.suggestions.push('Dedicate more time to study this category');
    feedback.suggestions.push('Seek help from mentors or online resources');
  }

  return feedback;
};

// Generate skill gap suggestions
const generateSkillGaps = (testScores) => {
  if (!testScores) return [];

  const gaps = [];
  const categories = ['aptitude', 'technical', 'coding', 'core'];

  categories.forEach(category => {
    const score = testScores[category];
    if (!score || score.attempts === 0) {
      gaps.push({
        category,
        message: `Take the ${category} test to assess your skills`,
        priority: 'high',
        action: 'Take Test'
      });
    } else if (score.bestScore < 50) {
      gaps.push({
        category,
        message: `Improve your ${category} skills - Current score: ${score.bestScore}%`,
        priority: 'high',
        action: 'Practice More'
      });
    } else if (score.bestScore < 70) {
      gaps.push({
        category,
        message: `Good progress in ${category} - Aim for 70%+`,
        priority: 'medium',
        action: 'Keep Practicing'
      });
    }
  });

  return gaps;
};


// @desc    Submit practice test for a specific job
// @route   POST /api/tests/practice
// @access  Private (Student)
exports.submitPracticeTest = async (req, res) => {
  try {
    const { jobId, jobTitle, score, totalQuestions, correctAnswers, wrongAnswers, timeSpent } = req.body;

    // Create practice test result
    const practiceResult = await TestResult.create({
      student: req.user.id,
      testType: 'practice',
      jobId,
      jobTitle,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      timeSpent
    });

    res.status(201).json({
      success: true,
      result: practiceResult,
      message: 'Practice test completed successfully'
    });
  } catch (error) {
    console.error('Submit practice test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
