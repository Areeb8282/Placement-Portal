const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job');
const User = require('./models/User');
const RecruiterProfile = require('./models/RecruiterProfile');

const moreJobs = [
  {
    title: 'React Developer',
    company: 'WebCraft Technologies',
    description: 'Build modern, responsive web applications using React.js and related technologies.',
    requirements: '2+ years React experience, hooks, Redux, REST APIs',
    responsibilities: 'Develop UI components, integrate APIs, optimize performance',
    jobType: 'full-time', workMode: 'remote',
    experience: { min: 1, max: 3 },
    salary: { min: 500000, max: 900000, currency: 'INR', period: 'yearly' },
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    skills: ['React', 'JavaScript', 'Redux', 'HTML', 'CSS'],
    educationRequired: 'bachelors', openings: 3,
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Python Developer',
    company: 'DataTech Solutions',
    description: 'Develop backend services and data pipelines using Python and Django/Flask.',
    requirements: 'Strong Python skills, Django or Flask, REST APIs, SQL',
    responsibilities: 'Build APIs, write scripts, manage databases',
    jobType: 'full-time', workMode: 'hybrid',
    experience: { min: 1, max: 4 },
    salary: { min: 550000, max: 950000, currency: 'INR', period: 'yearly' },
    location: { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    skills: ['Python', 'Django', 'Flask', 'SQL', 'REST API'],
    educationRequired: 'bachelors', openings: 2,
    applicationDeadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Java Backend Developer',
    company: 'Enterprise Systems Ltd',
    description: 'Design and develop enterprise-grade backend systems using Java and Spring Boot.',
    requirements: 'Java, Spring Boot, Microservices, Hibernate, MySQL',
    responsibilities: 'Build microservices, write unit tests, optimize queries',
    jobType: 'full-time', workMode: 'on-site',
    experience: { min: 2, max: 5 },
    salary: { min: 700000, max: 1200000, currency: 'INR', period: 'yearly' },
    location: { city: 'Pune', state: 'Maharashtra', country: 'India' },
    skills: ['Java', 'Spring Boot', 'Microservices', 'MySQL', 'Hibernate'],
    educationRequired: 'bachelors', openings: 4,
    applicationDeadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Machine Learning Engineer',
    company: 'AI Ventures India',
    description: 'Build and deploy machine learning models for real-world applications.',
    requirements: 'Python, TensorFlow/PyTorch, ML algorithms, data preprocessing',
    responsibilities: 'Train models, deploy to production, monitor performance',
    jobType: 'full-time', workMode: 'hybrid',
    experience: { min: 2, max: 5 },
    salary: { min: 900000, max: 1600000, currency: 'INR', period: 'yearly' },
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL'],
    educationRequired: 'masters', openings: 2,
    applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Cloud Engineer',
    company: 'CloudBase Technologies',
    description: 'Design and manage cloud infrastructure on AWS and Azure platforms.',
    requirements: 'AWS/Azure certifications, Terraform, Docker, Kubernetes',
    responsibilities: 'Provision cloud resources, automate deployments, monitor costs',
    jobType: 'full-time', workMode: 'remote',
    experience: { min: 2, max: 5 },
    salary: { min: 800000, max: 1400000, currency: 'INR', period: 'yearly' },
    location: { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    skills: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes'],
    educationRequired: 'bachelors', openings: 2,
    applicationDeadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Android Developer',
    company: 'MobileApps Studio',
    description: 'Develop high-quality Android applications for millions of users.',
    requirements: 'Kotlin/Java, Android SDK, REST APIs, MVVM architecture',
    responsibilities: 'Build Android apps, integrate APIs, publish to Play Store',
    jobType: 'full-time', workMode: 'hybrid',
    experience: { min: 1, max: 4 },
    salary: { min: 600000, max: 1000000, currency: 'INR', period: 'yearly' },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    skills: ['Kotlin', 'Java', 'Android SDK', 'REST API', 'Firebase'],
    educationRequired: 'bachelors', openings: 3,
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'iOS Developer',
    company: 'Apple Solutions Pvt Ltd',
    description: 'Create elegant iOS applications using Swift and SwiftUI.',
    requirements: 'Swift, SwiftUI, Xcode, REST APIs, App Store deployment',
    responsibilities: 'Develop iOS apps, write clean Swift code, submit to App Store',
    jobType: 'full-time', workMode: 'on-site',
    experience: { min: 2, max: 4 },
    salary: { min: 700000, max: 1200000, currency: 'INR', period: 'yearly' },
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    skills: ['Swift', 'SwiftUI', 'Xcode', 'Core Data', 'REST API'],
    educationRequired: 'bachelors', openings: 2,
    applicationDeadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Cybersecurity Analyst',
    company: 'SecureNet India',
    description: 'Protect company systems and data from cyber threats and vulnerabilities.',
    requirements: 'Network security, penetration testing, SIEM tools, CEH/CISSP preferred',
    responsibilities: 'Monitor threats, conduct audits, implement security policies',
    jobType: 'full-time', workMode: 'on-site',
    experience: { min: 2, max: 5 },
    salary: { min: 700000, max: 1300000, currency: 'INR', period: 'yearly' },
    location: { city: 'Delhi', state: 'Delhi', country: 'India' },
    skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Linux', 'Python'],
    educationRequired: 'bachelors', openings: 2,
    applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'QA Engineer',
    company: 'Quality First Technologies',
    description: 'Ensure software quality through manual and automated testing.',
    requirements: 'Selenium, TestNG, JIRA, API testing, Agile methodology',
    responsibilities: 'Write test cases, automate tests, report bugs, regression testing',
    jobType: 'full-time', workMode: 'hybrid',
    experience: { min: 1, max: 3 },
    salary: { min: 400000, max: 700000, currency: 'INR', period: 'yearly' },
    location: { city: 'Noida', state: 'Uttar Pradesh', country: 'India' },
    skills: ['Selenium', 'TestNG', 'JIRA', 'API Testing', 'Java'],
    educationRequired: 'bachelors', openings: 4,
    applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Product Manager',
    company: 'ProductLab India',
    description: 'Lead product development from ideation to launch. Work with cross-functional teams.',
    requirements: '3+ years PM experience, Agile, roadmap planning, stakeholder management',
    responsibilities: 'Define product vision, prioritize features, coordinate with engineering',
    jobType: 'full-time', workMode: 'hybrid',
    experience: { min: 3, max: 7 },
    salary: { min: 1200000, max: 2000000, currency: 'INR', period: 'yearly' },
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    skills: ['Product Management', 'Agile', 'JIRA', 'Analytics', 'Roadmapping'],
    educationRequired: 'masters', openings: 1,
    applicationDeadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Data Engineer',
    company: 'BigData Corp',
    description: 'Build and maintain data pipelines and warehouses for analytics teams.',
    requirements: 'Apache Spark, Kafka, Hadoop, SQL, Python, ETL pipelines',
    responsibilities: 'Design data pipelines, optimize queries, maintain data warehouse',
    jobType: 'full-time', workMode: 'remote',
    experience: { min: 2, max: 5 },
    salary: { min: 800000, max: 1400000, currency: 'INR', period: 'yearly' },
    location: { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    skills: ['Apache Spark', 'Kafka', 'Python', 'SQL', 'AWS'],
    educationRequired: 'bachelors', openings: 3,
    applicationDeadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Blockchain Developer',
    company: 'CryptoTech Solutions',
    description: 'Develop smart contracts and decentralized applications on Ethereum and Solana.',
    requirements: 'Solidity, Web3.js, Ethereum, smart contracts, DeFi knowledge',
    responsibilities: 'Write smart contracts, build DApps, audit code for security',
    jobType: 'full-time', workMode: 'remote',
    experience: { min: 1, max: 4 },
    salary: { min: 900000, max: 1800000, currency: 'INR', period: 'yearly' },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'JavaScript', 'Node.js'],
    educationRequired: 'bachelors', openings: 2,
    applicationDeadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Technical Content Writer',
    company: 'TechWrite Media',
    description: 'Write technical blogs, documentation, and tutorials for developer audiences.',
    requirements: 'Strong writing skills, programming knowledge, SEO basics, Markdown',
    responsibilities: 'Write articles, create tutorials, maintain documentation',
    jobType: 'part-time', workMode: 'remote',
    experience: { min: 0, max: 2 },
    salary: { min: 200000, max: 400000, currency: 'INR', period: 'yearly' },
    location: { city: 'Remote', state: 'Any', country: 'India' },
    skills: ['Technical Writing', 'Markdown', 'SEO', 'Git', 'JavaScript'],
    educationRequired: 'bachelors', openings: 5,
    applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Software Engineer Intern',
    company: 'NextGen Startups',
    description: 'Hands-on internship for final year students. Work on live projects with mentorship.',
    requirements: 'Any programming language, basic DSA, eagerness to learn',
    responsibilities: 'Assist in development, write code, attend daily standups',
    jobType: 'internship', workMode: 'hybrid',
    experience: { min: 0, max: 1 },
    salary: { min: 15000, max: 30000, currency: 'INR', period: 'monthly' },
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    skills: ['JavaScript', 'Python', 'Git', 'Problem Solving'],
    educationRequired: 'bachelors', openings: 10,
    applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), status: 'active'
  },
  {
    title: 'Graphic Designer',
    company: 'Creative Studio Pro',
    description: 'Create stunning visual designs for digital and print media.',
    requirements: 'Adobe Photoshop, Illustrator, InDesign, strong portfolio',
    responsibilities: 'Design marketing materials, social media graphics, brand assets',
    jobType: 'full-time', workMode: 'on-site',
    experience: { min: 1, max: 3 },
    salary: { min: 300000, max: 600000, currency: 'INR', period: 'yearly' },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Canva'],
    educationRequired: 'bachelors', openings: 2,
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), status: 'active'
  }
];

const seedMoreJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    let recruiter = await User.findOne({ role: 'recruiter' });

    if (!recruiter) {
      console.log('Creating sample recruiter...');
      recruiter = await User.create({
        email: 'recruiter@example.com',
        password: 'recruiter123',
        role: 'recruiter'
      });
      await RecruiterProfile.create({
        user: recruiter._id,
        companyName: 'Sample Company',
        fullName: 'John Recruiter',
        designation: 'HR Manager',
        phone: '+91-9876543210',
        industry: 'Information Technology',
        companySize: '51-200',
        verified: true
      });
      console.log('✅ Sample recruiter created');
    }

    const jobsWithRecruiter = moreJobs.map(job => ({
      ...job,
      recruiter: recruiter._id
    }));

    const inserted = await Job.insertMany(jobsWithRecruiter);
    console.log(`✅ Added ${inserted.length} more jobs successfully!`);

    inserted.forEach((job, i) => {
      console.log(`${i + 1}. ${job.title} at ${job.company}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedMoreJobs();
