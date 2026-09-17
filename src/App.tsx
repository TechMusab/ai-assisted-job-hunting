import React, { useState } from 'react'
import JobPreferencesForm from './components/JobPreferencesForm'
import { JobPreferences } from './types/jobPreferences'
import './App.css'

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<JobPreferences | null>(null)
  const [showForm, setShowForm] = useState(true)

  const handleFormSubmit = (submittedPreferences: JobPreferences) => {
    setPreferences(submittedPreferences)
    setShowForm(false)
  }

  const handleEditPreferences = () => {
    setShowForm(true)
  }

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
                <h3>Job Title</h3>
                <p>{preferences?.jobTitle}</p>
              </div>

              {preferences?.location && (
                <div className="summary-section">
                  <h3>Location</h3>
                  <p>{preferences.location}</p>
                </div>
              )}

              <div className="summary-section">
                <h3>Work Arrangement</h3>
                <p>{preferences?.workArrangement}</p>
              </div>

              {preferences?.minimumSalary !== undefined && (
                <div className="summary-section">
                  <h3>Minimum Salary</h3>
                  <p>${preferences.minimumSalary.toLocaleString()}</p>
                </div>
              )}

              <div className="summary-section">
                <h3>Experience Level</h3>
                <p>{preferences?.experienceLevel}</p>
              </div>
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
  )
}

export default App
