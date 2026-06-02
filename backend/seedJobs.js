const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Job = require('./models/Job');
const User = require('./models/User');
const RecruiterProfile = require('./models/RecruiterProfile');

// Sample jobs data
const sampleJobs = [
  {
    title: 'Full Stack Developer',
    company: 'Tech Innovations Pvt Ltd',
    description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
    requirements: '3+ years experience in MERN stack, strong problem-solving skills, good communication',
    responsibilities: 'Develop and maintain web applications, collaborate with cross-functional teams, write clean code',
    jobType: 'full-time',
    workMode: 'hybrid',
    experience: { min: 2, max: 5 },
    salary: { min: 600000, max: 1000000, currency: 'INR', period: 'yearly' },
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    educationRequired: 'bachelors',
    openings: 3,
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: 'active'
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Solutions Inc',
    description: 'Join our team as a Frontend Developer and create amazing user experiences. Work with the latest technologies and frameworks.',
    requirements: 'Strong knowledge of React, HTML, CSS, JavaScript. Experience with responsive design.',
    responsibilities: 'Build responsive web applications, optimize performance, collaborate with designers',
    jobType: 'full-time',
    workMode: 'remote',
    experience: { min: 1, max: 3 },
    salary: { min: 400000, max: 700000, currency: 'INR', period: 'yearly' },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux'],
    educationRequired: 'bachelors',
    openings: 2,
    applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    title: 'Backend Developer',
    company: 'Cloud Systems Ltd',
    description: 'We need a skilled Backend Developer to design and implement server-side logic and APIs.',
    requirements: 'Experience with Node.js, Express, databases. Knowledge of RESTful APIs and microservices.',
    responsibilities: 'Design and develop APIs, optimize database queries, ensure security',
    jobType: 'full-time',
    workMode: 'on-site',
    experience: { min: 2, max: 4 },
    salary: { min: 500000, max: 900000, currency: 'INR', period: 'yearly' },
    location: { city: 'Pune', state: 'Maharashtra', country: 'India' },
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS'],
    educationRequired: 'bachelors',
    openings: 2,
    applicationDeadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    title: 'Software Development Intern',
    company: 'StartUp Hub',
    description: 'Great opportunity for students to learn and grow. Work on real projects and gain hands-on experience.',
    requirements: 'Basic knowledge of programming, eagerness to learn, good communication skills',
    responsibilities: 'Assist in development tasks, write code, participate in code reviews',
    jobType: 'internship',
    workMode: 'hybrid',
    experience: { min: 0, max: 1 },
    salary: { min: 15000, max: 25000, currency: 'INR', period: 'monthly' },
    location: { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    skills: ['JavaScript', 'Python', 'Git', 'HTML', 'CSS'],
    educationRequired: 'bachelors',
    openings: 5,
    applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    title: 'Data Analyst',
    company: 'Analytics Pro',
    description: 'Analyze data and provide insights to drive business decisions. Work with large datasets and visualization tools.',
    requirements: 'Strong analytical skills, experience with SQL, Python, data visualization tools',
    responsibilities: 'Analyze data, create reports, present findings to stakeholders',
    jobType: 'full-time',
    workMode: 'remote',
    experience: { min: 1, max: 3 },
    salary: { min: 450000, max: 750000, currency: 'INR', period: 'yearly' },
    location: { city: 'Delhi', state: 'Delhi', country: 'India' },
    skills: ['Python', 'SQL', 'Excel', 'Tableau', 'Power BI'],
    educationRequired: 'bachelors',
    openings: 2,
    applicationDeadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    title: 'UI/UX Designer',
    company: 'Creative Minds Studio',
    description: 'Design beautiful and intuitive user interfaces. Work closely with developers to bring designs to life.',
    requirements: 'Experience with Figma, Adobe XD, strong portfolio, understanding of user-centered design',
    responsibilities: 'Create wireframes and prototypes, conduct user research, collaborate with development team',
    jobType: 'full-time',
    workMode: 'hybrid',
    experience: { min: 2, max: 4 },
    salary: { min: 500000, max: 800000, currency: 'INR', period: 'yearly' },
    location: { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    educationRequired: 'bachelors',
    openings: 1,
    applicationDeadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    title: 'DevOps Engineer',
    company: 'Infrastructure Solutions',
    description: 'Manage and optimize our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability.',
    requirements: 'Experience with AWS/Azure, Docker, Kubernetes, CI/CD tools',
    responsibilities: 'Manage cloud infrastructure, implement automation, monitor system performance',
    jobType: 'full-time',
    workMode: 'on-site',
    experience: { min: 3, max: 6 },
    salary: { min: 800000, max: 1400000, currency: 'INR', period: 'yearly' },
    location: { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux'],
    educationRequired: 'bachelors',
    openings: 2,
    applicationDeadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    title: 'Mobile App Developer',
    company: 'Mobile First Technologies',
    description: 'Develop cross-platform mobile applications using React Native. Create smooth and responsive mobile experiences.',
    requirements: 'Experience with React Native, JavaScript, mobile app development best practices',
    responsibilities: 'Develop mobile applications, optimize performance, integrate APIs',
    jobType: 'full-time',
    workMode: 'remote',
    experience: { min: 2, max: 4 },
    salary: { min: 600000, max: 1000000, currency: 'INR', period: 'yearly' },
    location: { city: 'Noida', state: 'Uttar Pradesh', country: 'India' },
    skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'],
    educationRequired: 'bachelors',
    openings: 3,
    applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    status: 'active'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find or create a recruiter user
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

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('🗑️  Cleared existing jobs');

    // Add recruiter ID to all jobs
    const jobsWithRecruiter = sampleJobs.map(job => ({
      ...job,
      recruiter: recruiter._id
    }));

    // Insert sample jobs
    const insertedJobs = await Job.insertMany(jobsWithRecruiter);
    console.log(`✅ Added ${insertedJobs.length} sample jobs`);

    console.log('\n📊 Sample Jobs Summary:');
    insertedJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company} (${job.jobType})`);
    });

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Sample Recruiter Credentials:');
    console.log('Email: recruiter@example.com');
    console.log('Password: recruiter123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
