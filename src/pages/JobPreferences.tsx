import React from 'react'
import JobPreferencesForm from '../components/JobPreferencesForm'
import type { JobPreferences } from '../types/jobPreferences'

const JobPreferences: React.FC = () => {
  const handleFormSubmit = (preferences: JobPreferences) => {
    console.log('Preferences submitted:', preferences)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Search Preferences</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <JobPreferencesForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  )
}

export default JobPreferences
