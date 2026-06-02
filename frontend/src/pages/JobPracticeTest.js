import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './JobPracticeTest.css';

const JobPracticeTest = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { API_URL, user } = useAuth();
  
  // applyMode = came from "Take Test & Apply" button
  const applyMode = location.state?.applyMode || false;
  const coverLetter = location.state?.coverLetter || '';

  const [job, setJob] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submittingApplication, setSubmittingApplication] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    fetchJobAndGenerateQuestions();
  }, [jobId]);

  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && testStarted) {
      handleSubmitTest();
    }
  }, [timeLeft, testStarted, testCompleted]);

  const fetchJobAndGenerateQuestions = async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs/${jobId}`);
      const jobData = res.data.job;
      setJob(jobData);
      
      // Generate questions based on job skills
      const generatedQuestions = generateJobSpecificQuestions(jobData);
      setQuestions(generatedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job details');
      navigate('/jobs');
    }
  };

  const generateJobSpecificQuestions = (jobData) => {
    const skills = jobData.skills || [];
    const jobTitle = jobData.title.toLowerCase();
    const jobType = jobData.jobType;
    const questions = [];

    // Add job title specific questions first (highest priority)
    questions.push(...getJobTitleQuestions(jobTitle));

    // Add skill-based questions
    skills.forEach(skill => {
      questions.push(...getSkillQuestions(skill));
    });

    // Add job-type specific questions
    questions.push(...getJobTypeQuestions(jobType));

    // Add general aptitude questions
    questions.push(...getGeneralQuestions());

    // Shuffle and limit to 20 questions
    return shuffleArray(questions).slice(0, 20);
  };

  const getJobTitleQuestions = (jobTitle) => {
    const jobQuestions = {
      'software engineer': [
        { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
        { question: 'Which design pattern ensures a class has only one instance?', options: ['Factory', 'Singleton', 'Observer', 'Strategy'], correct: 1 },
        { question: 'What does SOLID stand for in software engineering?', options: ['Software Object Linking', 'Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion', 'System Optimization', 'None'], correct: 1 },
        { question: 'What is the purpose of version control?', options: ['Track changes', 'Compile code', 'Debug', 'Test'], correct: 0 },
      ],
      'data scientist': [
        { question: 'What is the purpose of cross-validation in machine learning?', options: ['Data cleaning', 'Model evaluation', 'Feature selection', 'Data visualization'], correct: 1 },
        { question: 'Which algorithm is used for classification?', options: ['Linear Regression', 'K-Means', 'Decision Tree', 'PCA'], correct: 2 },
        { question: 'What does pandas library do in Python?', options: ['Web scraping', 'Data manipulation', 'Image processing', 'Game development'], correct: 1 },
        { question: 'What is overfitting in machine learning?', options: ['Model performs well on training but poor on test data', 'Model performs poorly on all data', 'Model is too simple', 'None'], correct: 0 },
      ],
      'frontend developer': [
        { question: 'What is the virtual DOM in React?', options: ['A database', 'A lightweight copy of the actual DOM', 'A CSS framework', 'A testing tool'], correct: 1 },
        { question: 'Which CSS property is used for flexbox?', options: ['display: flex', 'flex: box', 'layout: flex', 'box: flex'], correct: 0 },
        { question: 'What is responsive design?', options: ['Fast loading', 'Adapts to different screen sizes', 'Good colors', 'Animations'], correct: 1 },
        { question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'None'], correct: 1 },
      ],
      'backend developer': [
        { question: 'What is REST API?', options: ['A database', 'Representational State Transfer API', 'A programming language', 'A framework'], correct: 1 },
        { question: 'Which HTTP method is used to update data?', options: ['GET', 'POST', 'PUT', 'DELETE'], correct: 2 },
        { question: 'What is middleware in Express.js?', options: ['Database', 'Functions that execute during request-response cycle', 'Frontend library', 'Testing tool'], correct: 1 },
        { question: 'What is the purpose of indexing in databases?', options: ['Backup data', 'Improve query performance', 'Delete data', 'Encrypt data'], correct: 1 },
      ],
      'devops engineer': [
        { question: 'What is Docker used for?', options: ['Containerization', 'Database management', 'Frontend development', 'Testing'], correct: 0 },
        { question: 'What does CI/CD stand for?', options: ['Code Integration/Code Deployment', 'Continuous Integration/Continuous Deployment', 'Computer Integration', 'None'], correct: 1 },
        { question: 'What is Kubernetes?', options: ['Programming language', 'Container orchestration platform', 'Database', 'IDE'], correct: 1 },
        { question: 'What is the purpose of Jenkins?', options: ['Code editor', 'Automation server for CI/CD', 'Database', 'Version control'], correct: 1 },
      ],
      'mobile developer': [
        { question: 'What is React Native?', options: ['Web framework', 'Mobile app framework', 'Database', 'Testing tool'], correct: 1 },
        { question: 'Which language is used for iOS development?', options: ['Java', 'Swift', 'Python', 'Ruby'], correct: 1 },
        { question: 'What is Android Studio?', options: ['Text editor', 'IDE for Android development', 'Database tool', 'Web browser'], correct: 1 },
        { question: 'What is the purpose of AsyncStorage in React Native?', options: ['Styling', 'Local data storage', 'Navigation', 'API calls'], correct: 1 },
      ],
      'ui/ux designer': [
        { question: 'What is a wireframe?', options: ['Final design', 'Low-fidelity sketch of interface', 'Color palette', 'Font style'], correct: 1 },
        { question: 'What does UX stand for?', options: ['User Experience', 'User Extension', 'Universal Experience', 'None'], correct: 0 },
        { question: 'What is Figma used for?', options: ['Coding', 'UI/UX design', 'Database design', 'Testing'], correct: 1 },
        { question: 'What is the purpose of user personas?', options: ['Decoration', 'Represent target users', 'Testing', 'Coding'], correct: 1 },
      ],
      'product manager': [
        { question: 'What is a product roadmap?', options: ['Code structure', 'Strategic plan for product development', 'Design mockup', 'Test plan'], correct: 1 },
        { question: 'What does MVP stand for?', options: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value Product', 'None'], correct: 1 },
        { question: 'What is Agile methodology?', options: ['Database design', 'Iterative development approach', 'Testing method', 'Design pattern'], correct: 1 },
        { question: 'What is a user story?', options: ['Biography', 'Description of feature from user perspective', 'Test case', 'Bug report'], correct: 1 },
      ],
      'qa engineer': [
        { question: 'What is regression testing?', options: ['Testing new features', 'Re-testing after changes', 'Performance testing', 'Security testing'], correct: 1 },
        { question: 'What is Selenium used for?', options: ['Database testing', 'Automated web testing', 'Mobile testing', 'API testing'], correct: 1 },
        { question: 'What is the difference between verification and validation?', options: ['No difference', 'Verification checks if product is built right, validation checks if right product is built', 'Same thing', 'None'], correct: 1 },
        { question: 'What is a test case?', options: ['Bug report', 'Set of conditions to verify functionality', 'Code review', 'Design document'], correct: 1 },
      ],
      'content writer': [
        { question: 'What is SEO?', options: ['Social media', 'Search Engine Optimization', 'Software Engineering', 'None'], correct: 1 },
        { question: 'What is a call-to-action (CTA)?', options: ['Phone number', 'Prompt to take specific action', 'Email address', 'Website link'], correct: 1 },
        { question: 'What is copywriting?', options: ['Copying text', 'Writing persuasive marketing content', 'Proofreading', 'Translation'], correct: 1 },
        { question: 'What is content strategy?', options: ['Random posting', 'Planning and managing content', 'Design', 'Coding'], correct: 1 },
      ],
      'graphic designer': [
        { question: 'What is Adobe Photoshop used for?', options: ['Video editing', 'Image editing and manipulation', 'Web development', 'Database design'], correct: 1 },
        { question: 'What does CMYK stand for?', options: ['Color Model Yellow Key', 'Cyan Magenta Yellow Black', 'Computer Model', 'None'], correct: 1 },
        { question: 'What is vector graphics?', options: ['Pixel-based images', 'Mathematical path-based images', 'Videos', 'Animations'], correct: 1 },
        { question: 'What is the golden ratio in design?', options: ['1:1', '1:1.618', '2:1', '3:1'], correct: 1 },
      ],
    };

    // Find matching questions based on job title keywords
    for (const [key, questions] of Object.entries(jobQuestions)) {
      if (jobTitle.includes(key) || key.includes(jobTitle.split(' ')[0])) {
        return questions;
      }
    }

    return [];
  };

  const getSkillQuestions = (skill) => {
    const skillQuestions = {
      'React': [
        { question: 'What is the purpose of useEffect hook in React?', options: ['To manage state', 'To handle side effects', 'To create components', 'To style components'], correct: 1 },
        { question: 'What is JSX in React?', options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database'], correct: 1 },
        { question: 'What is the virtual DOM?', options: ['Real DOM', 'Lightweight copy of actual DOM', 'Database', 'API'], correct: 1 },
        { question: 'What is useState used for?', options: ['Side effects', 'State management', 'Routing', 'Styling'], correct: 1 },
        { question: 'What is React Router?', options: ['State management', 'Navigation library', 'Testing tool', 'Database'], correct: 1 },
      ],
      'Node.js': [
        { question: 'What is Node.js primarily used for?', options: ['Frontend development', 'Server-side JavaScript', 'Database management', 'Mobile apps'], correct: 1 },
        { question: 'Which module is used to create a web server in Node.js?', options: ['fs', 'http', 'path', 'url'], correct: 1 },
        { question: 'What is npm?', options: ['Node Package Manager', 'New Programming Method', 'Network Protocol', 'None'], correct: 0 },
        { question: 'What is Express.js?', options: ['Database', 'Web framework for Node.js', 'Frontend library', 'Testing tool'], correct: 1 },
        { question: 'What is middleware in Node.js?', options: ['Database', 'Function that processes requests', 'Frontend component', 'None'], correct: 1 },
      ],
      'Python': [
        { question: 'Which of the following is used to define a function in Python?', options: ['function', 'def', 'func', 'define'], correct: 1 },
        { question: 'What is the output of print(type([]))?', options: ['<class \'array\'>', '<class \'list\'>', '<class \'tuple\'>', '<class \'dict\'>'], correct: 1 },
        { question: 'What is pip in Python?', options: ['Package installer', 'IDE', 'Framework', 'Database'], correct: 0 },
        { question: 'What is Django?', options: ['Database', 'Web framework', 'Testing tool', 'IDE'], correct: 1 },
        { question: 'What are Python decorators?', options: ['Comments', 'Functions that modify other functions', 'Variables', 'Classes'], correct: 1 },
      ],
      'Java': [
        { question: 'Which keyword is used to inherit a class in Java?', options: ['inherits', 'extends', 'implements', 'super'], correct: 1 },
        { question: 'What is the size of int in Java?', options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on system'], correct: 1 },
        { question: 'What is JVM?', options: ['Java Virtual Machine', 'Java Variable Method', 'Java Version Manager', 'None'], correct: 0 },
        { question: 'What is polymorphism?', options: ['One form', 'Many forms', 'No form', 'Two forms'], correct: 1 },
        { question: 'What is the difference between == and equals()?', options: ['No difference', '== compares references, equals() compares values', 'Same thing', 'None'], correct: 1 },
      ],
      'JavaScript': [
        { question: 'What does "===" operator do in JavaScript?', options: ['Assigns value', 'Compares value only', 'Compares value and type', 'None'], correct: 2 },
        { question: 'Which method is used to add an element at the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: 0 },
        { question: 'What is a closure in JavaScript?', options: ['Loop', 'Function with access to outer scope', 'Object', 'Array'], correct: 1 },
        { question: 'What is async/await?', options: ['Loop', 'Way to handle asynchronous operations', 'Variable type', 'None'], correct: 1 },
        { question: 'What is the DOM?', options: ['Database', 'Document Object Model', 'Data Object Method', 'None'], correct: 1 },
      ],
      'SQL': [
        { question: 'Which SQL statement is used to extract data from a database?', options: ['GET', 'SELECT', 'EXTRACT', 'OPEN'], correct: 1 },
        { question: 'Which SQL keyword is used to sort the result-set?', options: ['SORT', 'ORDER BY', 'SORT BY', 'ORDER'], correct: 1 },
        { question: 'What is a primary key?', options: ['First column', 'Unique identifier for records', 'Last column', 'None'], correct: 1 },
        { question: 'What is a JOIN in SQL?', options: ['Combine rows from tables', 'Delete data', 'Update data', 'Create table'], correct: 0 },
        { question: 'What does CRUD stand for?', options: ['Create Read Update Delete', 'Copy Read Update Delete', 'Create Remove Update Delete', 'None'], correct: 0 },
      ],
      'AWS': [
        { question: 'What is AWS?', options: ['Database', 'Cloud computing platform', 'Programming language', 'IDE'], correct: 1 },
        { question: 'What is EC2?', options: ['Database service', 'Virtual server service', 'Storage service', 'None'], correct: 1 },
        { question: 'What is S3 used for?', options: ['Computing', 'Object storage', 'Database', 'Networking'], correct: 1 },
        { question: 'What is Lambda?', options: ['Database', 'Serverless computing', 'Storage', 'Network'], correct: 1 },
      ],
      'Docker': [
        { question: 'What is Docker?', options: ['Database', 'Containerization platform', 'IDE', 'Framework'], correct: 1 },
        { question: 'What is a Docker image?', options: ['Photo', 'Template for containers', 'Database', 'None'], correct: 1 },
        { question: 'What is Docker Compose?', options: ['Music tool', 'Tool for multi-container applications', 'Database', 'IDE'], correct: 1 },
        { question: 'What is a Dockerfile?', options: ['Text file with instructions to build image', 'Database file', 'Config file', 'None'], correct: 0 },
      ],
      'Kubernetes': [
        { question: 'What is Kubernetes?', options: ['Database', 'Container orchestration platform', 'IDE', 'Framework'], correct: 1 },
        { question: 'What is a Pod in Kubernetes?', options: ['Database', 'Smallest deployable unit', 'Network', 'Storage'], correct: 1 },
        { question: 'What is kubectl?', options: ['Database tool', 'Command-line tool for Kubernetes', 'IDE', 'Framework'], correct: 1 },
        { question: 'What is a Kubernetes cluster?', options: ['Single server', 'Set of nodes running containerized applications', 'Database', 'None'], correct: 1 },
      ],
      'MongoDB': [
        { question: 'What type of database is MongoDB?', options: ['Relational', 'NoSQL document database', 'Graph database', 'Key-value store'], correct: 1 },
        { question: 'What is a collection in MongoDB?', options: ['Table equivalent', 'Database', 'Server', 'None'], correct: 0 },
        { question: 'What is a document in MongoDB?', options: ['File', 'Record in JSON-like format', 'Table', 'Database'], correct: 1 },
        { question: 'What is Mongoose?', options: ['Database', 'ODM for MongoDB', 'Framework', 'IDE'], correct: 1 },
      ],
      'Git': [
        { question: 'What is Git?', options: ['Database', 'Version control system', 'IDE', 'Framework'], correct: 1 },
        { question: 'What is a commit in Git?', options: ['Delete', 'Snapshot of changes', 'Branch', 'Merge'], correct: 1 },
        { question: 'What is a branch in Git?', options: ['Tree part', 'Independent line of development', 'Commit', 'Tag'], correct: 1 },
        { question: 'What does git pull do?', options: ['Push changes', 'Fetch and merge changes', 'Delete branch', 'Create branch'], correct: 1 },
      ],
    };

    return skillQuestions[skill] || [];
  };

  const getJobTypeQuestions = (jobType) => {
    const typeQuestions = {
      'full-time': [
        { question: 'What is the typical work schedule for a full-time position?', options: ['20 hours/week', '30 hours/week', '40 hours/week', '50 hours/week'], correct: 2 },
        { question: 'What are typical full-time employee benefits?', options: ['No benefits', 'Health insurance, paid leave, retirement plans', 'Only salary', 'None'], correct: 1 },
      ],
      'part-time': [
        { question: 'What is a part-time work schedule?', options: ['Less than 40 hours/week', 'More than 40 hours/week', 'Exactly 40 hours/week', 'No fixed hours'], correct: 0 },
        { question: 'Do part-time employees typically get full benefits?', options: ['Yes, always', 'No, usually limited or no benefits', 'Sometimes', 'Only health insurance'], correct: 1 },
      ],
      'internship': [
        { question: 'What is the primary goal of an internship?', options: ['Earn money', 'Gain experience and learn', 'Get degree', 'Travel'], correct: 1 },
        { question: 'How long do internships typically last?', options: ['1 week', '2-6 months', '2 years', '5 years'], correct: 1 },
      ],
      'contract': [
        { question: 'What is a contract position?', options: ['Permanent job', 'Temporary job for specific period', 'Part-time job', 'Internship'], correct: 1 },
        { question: 'Who typically pays contract workers?', options: ['Government', 'Contracting agency or directly by company', 'No one', 'University'], correct: 1 },
      ]
    };

    return typeQuestions[jobType] || [];
  };

  const getGeneralQuestions = () => {
    return [
      { question: 'What does API stand for?', options: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Integration', 'None'], correct: 0 },
      { question: 'Which of the following is a version control system?', options: ['Git', 'Docker', 'Jenkins', 'Kubernetes'], correct: 0 },
      { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
      { question: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Tree'], correct: 1 },
      { question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'HyperText Transmission Protocol', 'None'], correct: 0 },
      { question: 'What is an algorithm?', options: ['Programming language', 'Step-by-step procedure to solve a problem', 'Database', 'Framework'], correct: 1 },
      { question: 'What is debugging?', options: ['Writing code', 'Finding and fixing errors', 'Testing', 'Deploying'], correct: 1 },
      { question: 'What is a framework?', options: ['Programming language', 'Platform for developing applications', 'Database', 'IDE'], correct: 1 },
      { question: 'What is cloud computing?', options: ['Local storage', 'Delivery of computing services over internet', 'Hardware', 'Software'], correct: 1 },
      { question: 'What is agile methodology?', options: ['Database design', 'Iterative software development approach', 'Testing method', 'Programming language'], correct: 1 },
    ];
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = async () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setTestCompleted(true);

    // Save practice test result
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/tests/practice`,
        {
          jobId: jobId,
          jobTitle: job.title,
          score: finalScore,
          totalQuestions: questions.length,
          correctAnswers: correctCount,
          wrongAnswers: questions.length - correctCount,
          timeSpent: 1800 - timeLeft
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Practice test completed!');
    } catch (error) {
      console.error('Error saving practice test:', error);
    }

    // If in applyMode, auto-submit the application with test score
    if (applyMode) {
      setSubmittingApplication(true);
      try {
        await axios.post(`${API_URL}/applications`, {
          jobId,
          coverLetter,
          testScore: {
            score: finalScore,
            totalQuestions: questions.length,
            correctAnswers: correctCount,
            timeTaken: 1800 - timeLeft,
            testTakenAt: new Date()
          }
        });
        setApplicationSubmitted(true);
        toast.success('Application submitted with your test score!');
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to submit application';
        toast.error(message);
      } finally {
        setSubmittingApplication(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="test-page">
        <div className="container">
          <motion.div
            className="test-instructions glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>
              {applyMode ? '📋 Job Application Test' : 'Practice Test'}: {job?.title}
            </h1>
            <p className="job-company">{job?.company}</p>

            {applyMode && (
              <div className="apply-mode-notice">
                <span>🎯</span>
                <div>
                  <strong>Applying for this job</strong>
                  <p>You must complete this test to submit your application. Your score will be visible to the recruiter to help them evaluate your profile.</p>
                </div>
              </div>
            )}
            
            <div className="instructions">
              <h2>Test Instructions</h2>
              <ul>
                <li>This test is customized for the job you selected</li>
                <li>Total Questions: {questions.length}</li>
                <li>Time Limit: 30 minutes</li>
                <li>Questions are based on: {job?.skills?.join(', ')}</li>
                <li>You can navigate between questions</li>
                {applyMode && <li>✅ Your application will be submitted automatically after the test</li>}
                {applyMode && <li>📊 Your test score will be shared with the recruiter</li>}
              </ul>
            </div>

            <div className="test-actions">
              <button onClick={() => navigate(-1)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleStartTest} className="btn btn-primary">
                {applyMode ? '🚀 Start Test & Apply' : 'Start Practice Test'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="test-page">
        <div className="container">
          <motion.div
            className="test-result glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={`score-circle ${score >= 70 ? 'pass' : 'fail'}`}>
              <h1>{score}%</h1>
              <p>Your Score</p>
            </div>

            <h2>{score >= 70 ? 'Great Job!' : 'Keep Practicing!'}</h2>
            <p>You scored {score}% in the {applyMode ? 'application test' : 'practice test'} for {job?.title}</p>

            {applyMode && (
              <div className={`application-status-box ${applicationSubmitted ? 'success' : submittingApplication ? 'pending' : 'error'}`}>
                {submittingApplication && <p>⏳ Submitting your application...</p>}
                {applicationSubmitted && <p>✅ Application submitted! The recruiter can now see your score of <strong>{score}%</strong>.</p>}
                {!submittingApplication && !applicationSubmitted && <p>⚠️ Application could not be submitted. You may have already applied or your profile is incomplete.</p>}
              </div>
            )}

            <div className="result-stats">
              <div className="stat">
                <FiCheckCircle />
                <span>Correct: {Object.keys(answers).filter(k => Number(answers[k]) === questions[Number(k)]?.correct).length}</span>
              </div>
              <div className="stat">
                <FiXCircle />
                <span>Wrong: {questions.length - Object.keys(answers).filter(k => Number(answers[k]) === questions[Number(k)]?.correct).length}</span>
              </div>
              <div className="stat">
                <FiClock />
                <span>Time: {formatTime(1800 - timeLeft)}</span>
              </div>
            </div>

            <div className="result-actions">
              {applicationSubmitted ? (
                <button onClick={() => navigate('/student/applications')} className="btn btn-primary">
                  View My Applications
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/jobs')} className="btn btn-secondary">
                    Browse More Jobs
                  </button>
                  <button onClick={() => window.location.reload()} className="btn btn-primary">
                    Practice Again
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="test-page">
      <div className="container">
        <div className="test-header glass">
          <div className="test-info">
            <h2>Practice Test: {job?.title}</h2>
            <p>Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <div className="test-timer">
            <FiClock />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          className="question-card glass"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3>Q{currentQuestion + 1}. {currentQ.question}</h3>

          <div className="options">
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`option ${answers[currentQuestion] === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(index)}
              >
                <span className="option-label">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </div>
            ))}
          </div>

          <div className="question-navigation">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn btn-secondary"
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button onClick={handleSubmitTest} className="btn btn-primary">
                Submit Test
              </button>
            ) : (
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </motion.div>

        <div className="question-grid glass">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`question-number ${index === currentQuestion ? 'active' : ''} ${answers[index] !== undefined ? 'answered' : ''}`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobPracticeTest;
