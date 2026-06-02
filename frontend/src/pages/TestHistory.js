import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiClock, FiCheckCircle, FiTrendingUp, FiAward } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TestHistory.css';

const TestHistory = () => {
  const { API_URL } = useAuth();
  const [tests, setTests] = useState([]);
  const [stats, setStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [historyRes, statsRes, badgesRes] = await Promise.all([
        axios.get(`${API_URL}/tests/history`),
        axios.get(`${API_URL}/tests/stats`),
        axios.get(`${API_URL}/tests/badges`)
      ]);

      setTests(historyRes.data.tests || []);
      setStats(statsRes.data);
      setBadges(badgesRes.data.badges || []);
    } catch (error) {
      console.error('Error fetching test data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      aptitude: '#3b82f6',
      technical: '#10b981',
      coding: '#f59e0b',
      core: '#8b5cf6'
    };
    return colors[category] || '#6b7280';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Prepare chart data
  const chartData = tests.slice(0, 10).reverse().map((test, index) => ({
    name: `Test ${index + 1}`,
    score: test.score,
    date: formatDate(test.completedAt)
  }));

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="test-history-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="page-header">
            <h1>Test History & Progress</h1>
            <p>Track your performance and improvement over time</p>
          </div>

          {/* Test Scores Overview */}
          {stats && (
            <div className="scores-grid">
              {Object.entries(stats.testScores).map(([category, scores]) => (
                <motion.div
                  key={category}
                  className="score-card glass"
                  whileHover={{ y: -5 }}
                >
                  <div className="score-header">
                    <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <div
                      className="score-badge"
                      style={{ background: getCategoryColor(category) }}
                    >
                      {scores.bestScore}%
                    </div>
                  </div>
                  <div className="score-details">
                    <div className="score-item">
                      <span>Best Score</span>
                      <strong>{scores.bestScore}%</strong>
                    </div>
                    <div className="score-item">
                      <span>Last Score</span>
                      <strong>{scores.lastScore}%</strong>
                    </div>
                    <div className="score-item">
                      <span>Attempts</span>
                      <strong>{scores.attempts}</strong>
                    </div>
                  </div>
                  {scores.bestScore > scores.lastScore && (
                    <div className="improvement-badge">
                      <FiTrendingUp /> Improved by {scores.bestScore - scores.lastScore}%
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Progress Chart */}
          {tests.length > 0 && (
            <div className="chart-section glass">
              <h2>Performance Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--primary)', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Badges Section */}
          {badges.length > 0 && (
            <div className="badges-section glass">
              <h2><FiAward /> Your Badges</h2>
              <div className="badges-grid">
                {badges.map((badge) => (
                  <motion.div
                    key={badge._id}
                    className="badge-card"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="badge-icon">{badge.icon}</div>
                    <h4>{badge.title}</h4>
                    <p>{badge.description}</p>
                    <span className="badge-date">{formatDate(badge.earnedAt)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gap Suggestions */}
          {stats && stats.skillGaps && stats.skillGaps.length > 0 && (
            <div className="skill-gaps-section glass">
              <h2>Skill Gap Analysis</h2>
              <div className="skill-gaps-list">
                {stats.skillGaps.map((gap, index) => (
                  <div key={index} className={`skill-gap-item priority-${gap.priority}`}>
                    <div className="gap-info">
                      <h4>{gap.category.charAt(0).toUpperCase() + gap.category.slice(1)}</h4>
                      <p>{gap.message}</p>
                    </div>
                    <button className="btn btn-sm btn-primary">{gap.action}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Test History Table */}
          <div className="history-section glass">
            <h2><FiClock /> Recent Tests</h2>
            {tests.length > 0 ? (
              <div className="history-table">
                <table>
                  <thead>
                    <tr>
                      <th>Test Name</th>
                      <th>Category</th>
                      <th>Score</th>
                      <th>Correct</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test) => (
                      <tr key={test._id}>
                        <td>{test.testName}</td>
                        <td>
                          <span
                            className="category-badge"
                            style={{ background: getCategoryColor(test.category) }}
                          >
                            {test.category}
                          </span>
                        </td>
                        <td className="score-cell">{test.score}%</td>
                        <td>{test.correctAnswers}/{test.totalQuestions}</td>
                        <td>{formatDate(test.completedAt)}</td>
                        <td>
                          {test.score >= 70 ? (
                            <span className="status-badge success">
                              <FiCheckCircle /> Passed
                            </span>
                          ) : (
                            <span className="status-badge warning">
                              Practice More
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">No tests taken yet. Start taking tests to track your progress!</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestHistory;
