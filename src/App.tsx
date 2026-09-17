import React, { useState } from 'react';
import JobPreferencesForm from './components/JobPreferencesForm';
import { JobPreferences } from './types/jobPreferences';
import './App.css';

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<JobPreferences | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = (submittedPreferences: JobPreferences) => {
    setPreferences(submittedPreferences);
    setShowForm(false);
    console.log('Job preferences saved:', submittedPreferences);
  };

  const handleEditPreferences = () => {
    setShowForm(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI-Assisted Job Hunting</h1>
        <p>Find your perfect job with AI-powered search and matching</p>
      </header>

      <main className="app-main">
        {showForm ? (
          <div className="form-container">
            <JobPreferencesForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <div className="preferences-summary">
            <h2>Your Job Search Preferences</h2>
            <div className="summary-content">
              <div className="summary-section">
                <h3>Job Titles</h3>
                <div className="summary-tags">
                  {preferences?.jobTitles.map(title => (
                    <span key={title} className="summary-tag">{title}</span>
                  ))}
                </div>
              </div>

              <div className="summary-section">
                <h3>Locations</h3>
                <div className="summary-tags">
                  {preferences?.locations.map(location => (
                    <span key={location} className="summary-tag">{location}</span>
                  ))}
                </div>
              </div>

              <div className="summary-section">
                <h3>Remote Preference</h3>
                <p>{preferences?.remoteOption.charAt(0).toUpperCase() + preferences?.remoteOption.slice(1)}</p>
              </div>

              <div className="summary-section">
                <h3>Salary Range</h3>
                <p>
                  {preferences?.salaryRange.currency} {preferences?.salaryRange.min} - {preferences?.salaryRange.max} {preferences?.salaryRange.period}
                </p>
              </div>

              <div className="summary-section">
                <h3>Job Types</h3>
                <div className="summary-tags">
                  {preferences?.jobTypes.map(type => (
                    <span key={type} className="summary-tag">
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="summary-section">
                <h3>Experience Level</h3>
                <p>{preferences?.experienceLevel.charAt(0).toUpperCase() + preferences?.experienceLevel.slice(1)} Level</p>
              </div>

              {preferences?.industries.length > 0 && (
                <div className="summary-section">
                  <h3>Industries</h3>
                  <div className="summary-tags">
                    {preferences.industries.map(industry => (
                      <span key={industry} className="summary-tag">{industry}</span>
                    ))}
                  </div>
                </div>
              )}

              {preferences?.skills.length > 0 && (
                <div className="summary-section">
                  <h3>Skills</h3>
                  <div className="summary-tags">
                    {preferences.skills.map(skill => (
                      <span key={skill} className="summary-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="summary-section">
                <h3>Company Size</h3>
                <p>{preferences?.companySize === 'any' ? 'Any' : `${preferences?.companySize} employees`}</p>
              </div>

              {preferences?.keywords && (
                <div className="summary-section">
                  <h3>Additional Keywords</h3>
                  <p>{preferences.keywords}</p>
                </div>
              )}
            </div>

            <div className="summary-actions">
              <button onClick={handleEditPreferences} className="edit-button">
                Edit Preferences
              </button>
              <button className="search-button">
                Search Jobs
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
