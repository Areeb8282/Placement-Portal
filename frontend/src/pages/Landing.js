import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBriefcase, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import './Landing.css';

const Landing = () => {
  const features = [
    {
      icon: <FiBriefcase size={40} />,
      title: 'Find Jobs',
      description: 'Browse thousands of job opportunities from top companies'
    },
    {
      icon: <FiUsers size={40} />,
      title: 'Connect',
      description: 'Network with recruiters and industry professionals'
    },
    {
      icon: <FiTrendingUp size={40} />,
      title: 'Grow',
      description: 'Track your applications and career progress'
    },
    {
      icon: <FiAward size={40} />,
      title: 'Succeed',
      description: 'Land your dream job with our placement support'
    }
  ];

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Your Gateway to
              <span className="gradient-text"> Dream Career</span>
            </h1>
            <p className="hero-subtitle">
              Connect with top recruiters, explore opportunities, and kickstart your professional journey
            </p>
            <div className="hero-buttons">
              <Link to="/register">
                <button className="btn btn-primary btn-large">
                  Get Started <FiArrowRight />
                </button>
              </Link>
              <Link to="/jobs">
                <button className="btn btn-secondary btn-large">
                  Browse Jobs
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-card card-1">
              <FiBriefcase size={30} />
              <p>500+ Jobs</p>
            </div>
            <div className="floating-card card-2">
              <FiUsers size={30} />
              <p>200+ Companies</p>
            </div>
            <div className="floating-card card-3">
              <FiAward size={30} />
              <p>95% Success Rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card glass"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3>500+</h3>
              <p>Active Jobs</p>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3>200+</h3>
              <p>Companies</p>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>1000+</h3>
              <p>Students</p>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3>95%</h3>
              <p>Success Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of students who found their dream jobs through our platform</p>
            <Link to="/register">
              <button className="btn btn-primary btn-large">
                Sign Up Now <FiArrowRight />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
