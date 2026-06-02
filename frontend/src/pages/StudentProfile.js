import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import './StudentProfile.css';

const StudentProfile = () => {
  const { API_URL } = useAuth();
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    linkedIn: '',
    github: '',
    skills: [],
    education: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/students/profile`);
      setProfile(res.data.profile || profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, { name: '', level: 'intermediate' }]
    });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...profile.skills];
    newSkills[index][field] = value;
    setProfile({ ...profile, skills: newSkills });
  };

  const removeSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { degree: '', institution: '', startYear: '', endYear: '', cgpa: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...profile.education];
    newEducation[index][field] = value;
    setProfile({ ...profile, education: newEducation });
  };

  const removeEducation = (index) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index)
    });
  };

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [...profile.projects, { title: '', description: '', technologies: [], link: '' }]
    });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...profile.projects];
    newProjects[index][field] = value;
    setProfile({ ...profile, projects: newProjects });
  };

  const removeProject = (index) => {
    setProfile({
      ...profile,
      projects: profile.projects.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await axios.put(`${API_URL}/students/profile`, profile);
      if (res.data.success) {
        toast.success('Profile updated successfully!');
        setProfile(res.data.profile);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const message = error.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-header">
            <h1>My Profile</h1>
            <div className="completion-badge">
              {profile.profileCompletion || 0}% Complete
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            {/* Basic Info */}
            <div className="form-section glass">
              <h2>Basic Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn Profile</label>
                  <div className="input-with-link">
                    <input
                      type="url"
                      name="linkedIn"
                      value={profile.linkedIn || ''}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    {profile.linkedIn && (
                      <a 
                        href={profile.linkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-icon"
                        title="Open LinkedIn Profile"
                      >
                        🔗
                      </a>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>GitHub Profile</label>
                  <div className="input-with-link">
                    <input
                      type="url"
                      name="github"
                      value={profile.github || ''}
                      onChange={handleChange}
                      placeholder="https://github.com/yourusername"
                    />
                    {profile.github && (
                      <a 
                        href={profile.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-icon"
                        title="Open GitHub Profile"
                      >
                        🔗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="form-section glass">
              <div className="section-header">
                <h2>Skills</h2>
                <button type="button" onClick={addSkill} className="btn btn-secondary">
                  <FiPlus /> Add Skill
                </button>
              </div>
              {profile.skills.map((skill, index) => (
                <div key={index} className="array-item">
                  <div className="form-grid">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <select
                        value={skill.level}
                        onChange={(e) => updateSkill(index, 'level', e.target.value)}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeSkill(index)} className="btn-remove">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="form-section glass">
              <div className="section-header">
                <h2>Education</h2>
                <button type="button" onClick={addEducation} className="btn btn-secondary">
                  <FiPlus /> Add Education
                </button>
              </div>
              {profile.education.map((edu, index) => (
                <div key={index} className="array-item">
                  <div className="form-grid">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        placeholder="Start Year"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        placeholder="End Year"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="CGPA"
                        value={edu.cgpa}
                        onChange={(e) => updateEducation(index, 'cgpa', e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="button" onClick={() => removeEducation(index)} className="btn-remove">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="form-section glass">
              <div className="section-header">
                <h2>Projects</h2>
                <button type="button" onClick={addProject} className="btn btn-secondary">
                  <FiPlus /> Add Project
                </button>
              </div>
              {profile.projects.map((project, index) => (
                <div key={index} className="array-item">
                  <div className="form-grid">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="url"
                        placeholder="Project Link"
                        value={project.link}
                        onChange={(e) => updateProject(index, 'link', e.target.value)}
                      />
                    </div>
                    <div className="form-group full-width">
                      <textarea
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        rows="3"
                      />
                    </div>
                  </div>
                  <button type="button" onClick={() => removeProject(index)} className="btn-remove">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary btn-large" disabled={saving}>
              {saving ? 'Saving...' : <><FiSave /> Save Profile</>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentProfile;
