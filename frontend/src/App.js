import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentProfile from './pages/StudentProfile';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';
import Tests from './pages/Tests';
import TakeTest from './pages/TakeTest';
import TestHistory from './pages/TestHistory';
import SavedJobs from './pages/SavedJobs';
import NotFound from './pages/NotFound';
import DashboardTest from './pages/DashboardTest';
import ClearCache from './pages/ClearCache';
import RecruiterApplications from './pages/RecruiterApplications';
import JobPracticeTest from './pages/JobPracticeTest';

// Components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }
              }}
            />
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/clear-cache" element={<ClearCache />} />
              <Route path="/dashboard-test" element={<DashboardTest />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route 
                path="/practice-test/:jobId" 
                element={
                  <PrivateRoute role="student">
                    <JobPracticeTest />
                  </PrivateRoute>
                } 
              />
              <Route path="/tests" element={<Tests />} />
              <Route path="/test/:testId" element={<TakeTest />} />
              <Route 
                path="/test-history" 
                element={
                  <PrivateRoute role="student">
                    <TestHistory />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/saved-jobs" 
                element={
                  <PrivateRoute role="student">
                    <SavedJobs />
                  </PrivateRoute>
                } 
              />
              
              {/* Student Routes */}
              <Route 
                path="/student/dashboard" 
                element={
                  <PrivateRoute role="student">
                    <StudentDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/student/profile" 
                element={
                  <PrivateRoute role="student">
                    <StudentProfile />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/student/applications" 
                element={
                  <PrivateRoute role="student">
                    <Applications />
                  </PrivateRoute>
                } 
              />
              
              {/* Recruiter Routes */}
              <Route 
                path="/recruiter/dashboard" 
                element={
                  <PrivateRoute role="recruiter">
                    <RecruiterDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/recruiter/applications" 
                element={
                  <PrivateRoute role="recruiter">
                    <RecruiterApplications />
                  </PrivateRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
