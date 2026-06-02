const Job = require('../models/Job');
const RecruiterProfile = require('../models/RecruiterProfile');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getAllJobs = async (req, res) => {
  try {
    const { 
      search, 
      jobType, 
      workMode, 
      location, 
      skills,
      minSalary,
      maxSalary,
      page = 1,
      limit = 10
    } = req.query;
    
    let query = { status: 'active' };
    
    console.log('📋 ========================================');
    console.log('📋 GET ALL JOBS REQUEST');
    console.log('📋 Time:', new Date().toLocaleString());
    console.log('📋 Query params:', req.query);
    console.log('📋 Base query:', query);
    console.log('📋 ========================================');
    
    // Search in title, company, description
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by job type
    if (jobType) {
      query.jobType = jobType;
    }
    
    // Filter by work mode
    if (workMode) {
      query.workMode = workMode;
    }
    
    // Filter by location
    if (location) {
      query['location.city'] = new RegExp(location, 'i');
    }
    
    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(',');
      query.skills = { $in: skillsArray };
    }
    
    // Filter by salary
    if (minSalary) {
      query['salary.min'] = { $gte: parseInt(minSalary) };
    }
    if (maxSalary) {
      query['salary.max'] = { $lte: parseInt(maxSalary) };
    }
    
    console.log('📋 Final query:', JSON.stringify(query, null, 2));
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const jobs = await Job.find(query)
      .populate('recruiter', 'email')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Job.countDocuments(query);
    
    console.log('📋 ========================================');
    console.log('📋 RESULTS:');
    console.log('📋 Found', jobs.length, 'jobs out of', total, 'total');
    if (jobs.length > 0) {
      console.log('📋 Job IDs:', jobs.map(j => j._id));
      console.log('📋 Job titles:', jobs.map(j => j.title));
      console.log('📋 Job statuses:', jobs.map(j => j.status));
      console.log('📋 First job details:', {
        id: jobs[0]._id,
        title: jobs[0].title,
        company: jobs[0].company,
        status: jobs[0].status,
        createdAt: jobs[0].createdAt
      });
    } else {
      console.log('⚠️  No jobs found!');
      // Check if there are ANY jobs in database
      const allJobs = await Job.find({});
      console.log('⚠️  Total jobs in database (all statuses):', allJobs.length);
      if (allJobs.length > 0) {
        console.log('⚠️  All job statuses:', allJobs.map(j => ({ title: j.title, status: j.status })));
      }
    }
    console.log('📋 ========================================');
    
    res.json({
      success: true,
      count: jobs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      jobs
    });
  } catch (error) {
    console.error('❌ Get all jobs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('recruiter', 'email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Increment views
    job.views += 1;
    await job.save();
    
    res.json({ success: true, job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Recruiter)
exports.createJob = async (req, res) => {
  try {
    console.log('📝 Creating new job for recruiter:', req.user.id);
    console.log('📝 Job data:', req.body);
    
    // Get recruiter profile for company name
    const recruiterProfile = await RecruiterProfile.findOne({ user: req.user.id });
    
    const jobData = {
      ...req.body,
      recruiter: req.user.id,
      company: recruiterProfile?.companyName || req.body.company
    };
    
    console.log('📝 Final job data to save:', jobData);
    
    const job = await Job.create(jobData);
    
    console.log('✅ Job created successfully with ID:', job._id);
    console.log('✅ Job saved to database:', job);
    
    // Verify job was saved
    const savedJob = await Job.findById(job._id);
    if (savedJob) {
      console.log('✅ Verified: Job exists in database');
    } else {
      console.log('⚠️  Warning: Job not found after creation!');
    }
    
    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error('❌ Create job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter - own jobs only)
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check ownership
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }
    
    job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({ success: true, job });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter - own jobs only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check ownership
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }
    
    await job.deleteOne();
    
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get recruiter's jobs
// @route   GET /api/jobs/recruiter/my-jobs
// @access  Private (Recruiter)
exports.getMyJobs = async (req, res) => {
  try {
    console.log('📋 Fetching jobs for recruiter:', req.user.id);
    
    const jobs = await Job.find({ recruiter: req.user.id })
      .sort('-createdAt');
    
    console.log('📋 Found', jobs.length, 'jobs for this recruiter');
    
    if (jobs.length > 0) {
      console.log('📋 Job IDs:', jobs.map(j => j._id));
      console.log('📋 Job titles:', jobs.map(j => j.title));
    }
    
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    console.error('❌ Get my jobs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
