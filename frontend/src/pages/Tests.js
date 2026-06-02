import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiCpu, FiCode, FiTrendingUp, FiBook, FiClock, FiAward } from 'react-icons/fi';
import './Tests.css';

const Tests = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const testCategories = [
    {
      id: 'aptitude',
      name: 'Aptitude Test',
      icon: <FiCpu />,
      description: 'Quantitative, Logical & Verbal Reasoning',
      tests: [
        { name: 'Quantitative Aptitude', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Logical Reasoning', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Verbal Ability', duration: '30 min', questions: 60, difficulty: 'Easy' },
        { name: 'Data Interpretation', duration: '30 min', questions: 60, difficulty: 'Hard' },
      ]
    },
    {
      id: 'technical',
      name: 'Technical Test',
      icon: <FiCode />,
      description: 'Programming & Technical Skills',
      tests: [
        { name: 'C Programming', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Java Fundamentals', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Python Basics', duration: '30 min', questions: 60, difficulty: 'Easy' },
        { name: 'Data Structures', duration: '30 min', questions: 60, difficulty: 'Hard' },
        { name: 'Algorithms', duration: '30 min', questions: 60, difficulty: 'Hard' },
        { name: 'DBMS', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Operating Systems', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Computer Networks', duration: '30 min', questions: 60, difficulty: 'Medium' },
      ]
    },
    {
      id: 'coding',
      name: 'Coding Challenges',
      icon: <FiTrendingUp />,
      description: 'Problem Solving & Coding',
      tests: [
        { name: 'Easy Coding Problems', duration: '30 min', questions: 60, difficulty: 'Easy' },
        { name: 'Medium Coding Problems', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Hard Coding Problems', duration: '30 min', questions: 60, difficulty: 'Hard' },
        { name: 'Array & Strings', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Trees & Graphs', duration: '30 min', questions: 60, difficulty: 'Hard' },
      ]
    },
    {
      id: 'core',
      name: 'Core Subjects',
      icon: <FiBook />,
      description: 'Computer Science Fundamentals',
      tests: [
        { name: 'OOP Concepts', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Software Engineering', duration: '30 min', questions: 60, difficulty: 'Medium' },
        { name: 'Web Technologies', duration: '30 min', questions: 60, difficulty: 'Easy' },
        { name: 'Cloud Computing', duration: '30 min', questions: 60, difficulty: 'Medium' },
      ]
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? testCategories 
    : testCategories.filter(cat => cat.id === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'primary';
    }
  };

  const handleStartTest = (categoryId, testIndex) => {
    if (!isAuthenticated) {
      toast.error('Please login to take the test');
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'student') {
      toast.error('Only students can take tests');
      return;
    }
    
    navigate(`/test/${categoryId}-${testIndex}`);
  };

  return (
    <div className="tests-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="tests-header">
            <h1>Placement Preparation Tests</h1>
            <p>Practice and prepare for your dream company</p>
          </div>

          {/* Category Filter */}
          <div className="category-filter glass">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All Tests
            </button>
            {testCategories.map(category => (
              <button
                key={category.id}
                className={selectedCategory === category.id ? 'active' : ''}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Test Categories */}
          {filteredCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="test-category"
            >
              <div className="category-header glass">
                <div className="category-info">
                  <div className="category-icon">{category.icon}</div>
                  <div>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>
                <span className="test-count">{category.tests.length} Tests</span>
              </div>

              <div className="tests-grid">
                {category.tests.map((test, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="test-card glass"
                  >
                    <div className="test-header">
                      <h3>{test.name}</h3>
                      <span className={`difficulty-badge ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty}
                      </span>
                    </div>

                    <div className="test-details">
                      <div className="test-stat">
                        <FiClock />
                        <span>{test.duration}</span>
                      </div>
                      <div className="test-stat">
                        <FiBook />
                        <span>{test.questions} Questions</span>
                      </div>
                      <div className="test-stat">
                        <FiAward />
                        <span>Certificate</span>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary start-test-btn"
                      onClick={() => handleStartTest(category.id, index)}
                    >
                      Start Test
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Stats Section */}
          <div className="stats-section glass">
            <h2>Your Progress</h2>
            <div className="stats-grid">
              <div className="stat-card clickable" onClick={() => navigate('/student/applications')}>
                <div className="stat-icon">
                  <FiBook />
                </div>
                <div className="stat-info">
                  <h3>0</h3>
                  <p>Tests Completed</p>
                </div>
              </div>
              <div className="stat-card clickable" onClick={() => navigate('/student/profile')}>
                <div className="stat-icon">
                  <FiAward />
                </div>
                <div className="stat-info">
                  <h3>0</h3>
                  <p>Certificates Earned</p>
                </div>
              </div>
              <div className="stat-card clickable" onClick={() => navigate('/student/dashboard')}>
                <div className="stat-icon">
                  <FiTrendingUp />
                </div>
                <div className="stat-info">
                  <h3>0%</h3>
                  <p>Average Score</p>
                </div>
              </div>
              <div className="stat-card clickable" onClick={() => navigate('/tests')}>
                <div className="stat-icon">
                  <FiClock />
                </div>
                <div className="stat-info">
                  <h3>0h</h3>
                  <p>Time Spent</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tests;
