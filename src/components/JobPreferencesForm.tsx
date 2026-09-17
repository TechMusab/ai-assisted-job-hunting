import React, { useState } from 'react';
import {
  JobPreferences,
  RemoteOption,
  JobType,
  ExperienceLevel,
  CompanySize,
  SalaryPeriod,
  FormErrors
} from '../types/jobPreferences';

interface JobPreferencesFormProps {
  onSubmit: (preferences: JobPreferences) => void;
  initialPreferences?: Partial<JobPreferences>;
}

const JobPreferencesForm: React.FC<JobPreferencesFormProps> = ({
  onSubmit,
  initialPreferences
}) => {
  const [preferences, setPreferences] = useState<JobPreferences>({
    jobTitles: initialPreferences?.jobTitles || [],
    locations: initialPreferences?.locations || [],
    remoteOption: initialPreferences?.remoteOption || 'any',
    salaryRange: initialPreferences?.salaryRange || {
      min: 0,
      max: 0,
      currency: 'USD',
      period: 'yearly'
    },
    jobTypes: initialPreferences?.jobTypes || [],
    experienceLevel: initialPreferences?.experienceLevel || 'mid',
    industries: initialPreferences?.industries || [],
    skills: initialPreferences?.skills || [],
    companySize: initialPreferences?.companySize || 'any',
    keywords: initialPreferences?.keywords || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [jobTitleInput, setJobTitleInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (preferences.jobTitles.length === 0) {
      newErrors.jobTitles = 'Please add at least one job title';
    }

    if (preferences.locations.length === 0) {
      newErrors.locations = 'Please add at least one location';
    }

    if (preferences.salaryRange.min < 0) {
      newErrors.salaryRange = { ...newErrors.salaryRange, min: 'Minimum salary cannot be negative' };
    }

    if (preferences.salaryRange.max < 0) {
      newErrors.salaryRange = { ...newErrors.salaryRange, max: 'Maximum salary cannot be negative' };
    }

    if (preferences.salaryRange.min > preferences.salaryRange.max && preferences.salaryRange.max > 0) {
      newErrors.salaryRange = {
        ...newErrors.salaryRange,
        max: 'Maximum salary must be greater than minimum'
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(preferences);
    }
  };

  const addJobTitle = () => {
    if (jobTitleInput.trim() && !preferences.jobTitles.includes(jobTitleInput.trim())) {
      setPreferences({
        ...preferences,
        jobTitles: [...preferences.jobTitles, jobTitleInput.trim()]
      });
      setJobTitleInput('');
      setErrors({ ...errors, jobTitles: undefined });
    }
  };

  const removeJobTitle = (title: string) => {
    setPreferences({
      ...preferences,
      jobTitles: preferences.jobTitles.filter(t => t !== title)
    });
  };

  const addLocation = () => {
    if (locationInput.trim() && !preferences.locations.includes(locationInput.trim())) {
      setPreferences({
        ...preferences,
        locations: [...preferences.locations, locationInput.trim()]
      });
      setLocationInput('');
      setErrors({ ...errors, locations: undefined });
    }
  };

  const removeLocation = (location: string) => {
    setPreferences({
      ...preferences,
      locations: preferences.locations.filter(l => l !== location)
    });
  };

  const addIndustry = () => {
    if (industryInput.trim() && !preferences.industries.includes(industryInput.trim())) {
      setPreferences({
        ...preferences,
        industries: [...preferences.industries, industryInput.trim()]
      });
      setIndustryInput('');
    }
  };

  const removeIndustry = (industry: string) => {
    setPreferences({
      ...preferences,
      industries: preferences.industries.filter(i => i !== industry)
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !preferences.skills.includes(skillInput.trim())) {
      setPreferences({
        ...preferences,
        skills: [...preferences.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setPreferences({
      ...preferences,
      skills: preferences.skills.filter(s => s !== skill)
    });
  };

  const toggleJobType = (type: JobType) => {
    setPreferences({
      ...preferences,
      jobTypes: preferences.jobTypes.includes(type)
        ? preferences.jobTypes.filter(t => t !== type)
        : [...preferences.jobTypes, type]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="job-preferences-form">
      <div className="form-section">
        <h2>Job Search Preferences</h2>
        <p className="form-description">Configure your job search criteria to find the best opportunities</p>
      </div>

      {/* Job Titles */}
      <div className="form-group">
        <label htmlFor="job-titles">Job Titles *</label>
        <div className="input-with-button">
          <input
            id="job-titles"
            type="text"
            value={jobTitleInput}
            onChange={(e) => setJobTitleInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addJobTitle())}
            placeholder="e.g., Software Engineer, Product Manager"
          />
          <button type="button" onClick={addJobTitle}>Add</button>
        </div>
        {errors.jobTitles && <span className="error">{errors.jobTitles}</span>}
        <div className="tags-container">
          {preferences.jobTitles.map(title => (
            <span key={title} className="tag">
              {title}
              <button type="button" onClick={() => removeJobTitle(title)}>&times;</button>
            </span>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="form-group">
        <label htmlFor="locations">Locations *</label>
        <div className="input-with-button">
          <input
            id="locations"
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
            placeholder="e.g., San Francisco, New York, Remote"
          />
          <button type="button" onClick={addLocation}>Add</button>
        </div>
        {errors.locations && <span className="error">{errors.locations}</span>}
        <div className="tags-container">
          {preferences.locations.map(location => (
            <span key={location} className="tag">
              {location}
              <button type="button" onClick={() => removeLocation(location)}>&times;</button>
            </span>
          ))}
        </div>
      </div>

      {/* Remote Option */}
      <div className="form-group">
        <label htmlFor="remote-option">Remote Preference</label>
        <select
          id="remote-option"
          value={preferences.remoteOption}
          onChange={(e) => setPreferences({ ...preferences, remoteOption: e.target.value as RemoteOption })}
        >
          <option value="any">Any</option>
          <option value="remote">Remote Only</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">On-site</option>
        </select>
      </div>

      {/* Salary Range */}
      <div className="form-group">
        <label>Salary Range</label>
        <div className="salary-range">
          <div className="salary-input">
            <label htmlFor="salary-min">Min</label>
            <input
              id="salary-min"
              type="number"
              value={preferences.salaryRange.min || ''}
              onChange={(e) => setPreferences({
                ...preferences,
                salaryRange: { ...preferences.salaryRange, min: parseInt(e.target.value) || 0 }
              })}
              placeholder="0"
            />
            {errors.salaryRange?.min && <span className="error">{errors.salaryRange.min}</span>}
          </div>
          <div className="salary-input">
            <label htmlFor="salary-max">Max</label>
            <input
              id="salary-max"
              type="number"
              value={preferences.salaryRange.max || ''}
              onChange={(e) => setPreferences({
                ...preferences,
                salaryRange: { ...preferences.salaryRange, max: parseInt(e.target.value) || 0 }
              })}
              placeholder="0"
            />
            {errors.salaryRange?.max && <span className="error">{errors.salaryRange.max}</span>}
          </div>
          <div className="salary-input">
            <label htmlFor="salary-currency">Currency</label>
            <select
              id="salary-currency"
              value={preferences.salaryRange.currency}
              onChange={(e) => setPreferences({
                ...preferences,
                salaryRange: { ...preferences.salaryRange, currency: e.target.value }
              })}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
          <div className="salary-input">
            <label htmlFor="salary-period">Period</label>
            <select
              id="salary-period"
              value={preferences.salaryRange.period}
              onChange={(e) => setPreferences({
                ...preferences,
                salaryRange: { ...preferences.salaryRange, period: e.target.value as SalaryPeriod }
              })}
            >
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Types */}
      <div className="form-group">
        <label>Job Types</label>
        <div className="checkbox-group">
          {(['full-time', 'part-time', 'contract', 'internship', 'freelance'] as JobType[]).map(type => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={preferences.jobTypes.includes(type)}
                onChange={() => toggleJobType(type)}
              />
              <span>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="form-group">
        <label htmlFor="experience-level">Experience Level</label>
        <select
          id="experience-level"
          value={preferences.experienceLevel}
          onChange={(e) => setPreferences({ ...preferences, experienceLevel: e.target.value as ExperienceLevel })}
        >
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
          <option value="lead">Lead</option>
          <option value="executive">Executive</option>
        </select>
      </div>

      {/* Industries */}
      <div className="form-group">
        <label htmlFor="industries">Industries</label>
        <div className="input-with-button">
          <input
            id="industries"
            type="text"
            value={industryInput}
            onChange={(e) => setIndustryInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIndustry())}
            placeholder="e.g., Technology, Healthcare, Finance"
          />
          <button type="button" onClick={addIndustry}>Add</button>
        </div>
        <div className="tags-container">
          {preferences.industries.map(industry => (
            <span key={industry} className="tag">
              {industry}
              <button type="button" onClick={() => removeIndustry(industry)}>&times;</button>
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="form-group">
        <label htmlFor="skills">Skills</label>
        <div className="input-with-button">
          <input
            id="skills"
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder="e.g., React, Python, Project Management"
          />
          <button type="button" onClick={addSkill}>Add</button>
        </div>
        <div className="tags-container">
          {preferences.skills.map(skill => (
            <span key={skill} className="tag">
              {skill}
              <button type="button" onClick={() => removeSkill(skill)}>&times;</button>
            </span>
          ))}
        </div>
      </div>

      {/* Company Size */}
      <div className="form-group">
        <label htmlFor="company-size">Company Size</label>
        <select
          id="company-size"
          value={preferences.companySize}
          onChange={(e) => setPreferences({ ...preferences, companySize: e.target.value as CompanySize })}
        >
          <option value="any">Any</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501-1000">501-1000 employees</option>
          <option value="1000+">1000+ employees</option>
        </select>
      </div>

      {/* Keywords */}
      <div className="form-group">
        <label htmlFor="keywords">Additional Keywords</label>
        <textarea
          id="keywords"
          value={preferences.keywords}
          onChange={(e) => setPreferences({ ...preferences, keywords: e.target.value })}
          placeholder="Enter any additional keywords or phrases that describe your ideal job..."
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">Save Preferences</button>
      </div>
    </form>
  );
};

export default JobPreferencesForm;
