import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiClock, FiCheckCircle, FiAlertCircle, FiAward } from 'react-icons/fi';
import './TakeTest.css';
import { quantitativeQuestions } from '../data/quantitativeQuestions';

const TakeTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());

  // Map testId to test details
  const testDetails = {
    'quantitative-aptitude': { name: 'Quantitative Aptitude', category: 'aptitude' },
    'logical-reasoning': { name: 'Logical Reasoning', category: 'aptitude' },
    'verbal-ability': { name: 'Verbal Ability', category: 'aptitude' },
    'technical-aptitude': { name: 'Technical Aptitude', category: 'technical' },
    'programming-fundamentals': { name: 'Programming Fundamentals', category: 'technical' },
    'data-structures': { name: 'Data Structures', category: 'coding' },
    'algorithms': { name: 'Algorithms', category: 'coding' },
    'dbms': { name: 'Database Management', category: 'core' },
    'os': { name: 'Operating Systems', category: 'core' },
    'networks': { name: 'Computer Networks', category: 'core' }
  };

  const currentTest = testDetails[testId] || { name: 'Test', category: 'aptitude' };

  // Sample questions - in production, fetch based on testId
  const questions = quantitativeQuestions.slice(0, 60);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, showResult]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    // Calculate score
    let correct = 0;
    const answersArray = [];
    
    questions.forEach(q => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) correct++;
      
      answersArray.push({
        questionId: q.id,
        selectedAnswer: answers[q.id] !== undefined ? answers[q.id] : -1,
        isCorrect
      });
    });

    const scorePercentage = ((correct / questions.length) * 100).toFixed(2);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    setScore(correct);

    // Submit to backend
    try {
      const response = await axios.post(`${API_URL}/tests/submit`, {
        testId,
        testName: currentTest.name,
        category: currentTest.category,
        score: parseFloat(scorePercentage),
        totalQuestions: questions.length,
        correctAnswers: correct,
        timeTaken,
        answers: answersArray
      });

      if (response.data.success) {
        setFeedback(response.data.feedback);
        toast.success('Test submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error('Failed to submit test, but showing results');
    }

    setShowResult(true);
    setSubmitting(false);
  };

  if (showResult) {
    const percentage = ((score / questions.length) * 100).toFixed(2);
    return (
      <div className="test-result">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="result-card glass"
          >
            <div className="result-icon">
              {percentage >= 60 ? (
                <FiCheckCircle size={80} color="#10b981" />
              ) : (
                <FiAlertCircle size={80} color="#ef4444" />
              )}
            </div>
            <h1>{percentage >= 60 ? 'Congratulations!' : 'Keep Practicing!'}</h1>
            <div className="score-display">
              <h2>{score} / {questions.length}</h2>
              <p>{percentage}%</p>
            </div>
            <div className="result-stats">
              <div className="stat">
                <span>Correct</span>
                <strong>{score}</strong>
              </div>
              <div className="stat">
                <span>Wrong</span>
                <strong>{questions.length - score - Object.keys(answers).length + score}</strong>
              </div>
              <div className="stat">
                <span>Unattempted</span>
                <strong>{questions.length - Object.keys(answers).length}</strong>
              </div>
            </div>

            {/* Feedback Section */}
            {feedback && (
              <div className="feedback-section">
                <h3><FiAward /> Test Feedback</h3>
                
                {feedback.strengths && feedback.strengths.length > 0 && (
                  <div className="feedback-box strengths">
                    <h4>✅ Strengths</h4>
                    <ul>
                      {feedback.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.improvements && feedback.improvements.length > 0 && (
                  <div className="feedback-box improvements">
                    <h4>📈 Areas for Improvement</h4>
                    <ul>
                      {feedback.improvements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.suggestions && feedback.suggestions.length > 0 && (
                  <div className="feedback-box suggestions">
                    <h4>💡 Suggestions</h4>
                    <ul>
                      {feedback.suggestions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="result-actions">
              <button className="btn btn-primary" onClick={() => navigate('/tests')}>
                Back to Tests
              </button>
              <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                Retake Test
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="take-test-page">
      <div className="test-header glass">
        <div className="container">
          <div className="test-info">
            <h2>Quantitative Aptitude Test</h2>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="test-progress-bar">
            <div
              className="test-progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className={`test-timer ${timeLeft < 300 ? 'time-warning' : ''}`}>
            <FiClock />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="test-content">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="question-card glass"
          >
            <div className="question-number">Question {currentQuestion + 1}</div>
            <h3 className="question-text">{question.question}</h3>
            
            <div className="options">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${answers[question.id] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(question.id, index)}
                >
                  <div className="option-radio">
                    {answers[question.id] === index && <div className="radio-dot"></div>}
                  </div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="test-navigation">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            
            {currentQuestion < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Test
              </button>
            )}
          </div>

          <div className="question-palette glass">
            <h4>Question Palette</h4>
            <div className="palette-grid">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className={`palette-item ${index === currentQuestion ? 'current' : ''} ${answers[q.id] !== undefined ? 'answered' : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="palette-legend">
              <div><span className="legend-answered"></span> Answered</div>
              <div><span className="legend-current"></span> Current</div>
              <div><span className="legend-unanswered"></span> Unanswered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
