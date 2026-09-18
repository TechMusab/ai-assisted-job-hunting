import React, { useState, useRef } from 'react'
import {
  JobPreferences,
  WorkArrangement,
  ExperienceLevel,
  FormErrors
} from '../types/jobPreferences'

interface JobPreferencesFormProps {
  onSubmit: (preferences: JobPreferences) => void
}

const JobPreferencesForm: React.FC<JobPreferencesFormProps> = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState<JobPreferences>({
    jobTitle: '',
    location: '',
    workArrangement: '' as WorkArrangement,
    minimumSalary: undefined,
    experienceLevel: '' as ExperienceLevel
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const jobTitleRef = useRef<HTMLInputElement>(null)
  const workArrangementRef = useRef<HTMLSelectElement>(null)
  const experienceLevelRef = useRef<HTMLSelectElement>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate job title (required)
    if (!preferences.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required'
    }

    // Validate work arrangement (required)
    if (!preferences.workArrangement || preferences.workArrangement.trim() === '') {
      newErrors.workArrangement = 'Work arrangement is required'
    }

    // Validate experience level (required)
    if (!preferences.experienceLevel || preferences.experienceLevel.trim() === '') {
      newErrors.experienceLevel = 'Experience level is required'
    }

    // Validate minimum salary (optional, but must be non-negative if provided)
    if (preferences.minimumSalary !== undefined && preferences.minimumSalary < 0) {
      newErrors.minimumSalary = 'Salary cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) {
      return
    }

    // Trim text inputs before validation
    const trimmedPreferences: JobPreferences = {
      ...preferences,
      jobTitle: preferences.jobTitle.trim(),
      location: preferences.location?.trim()
    }

    setPreferences(trimmedPreferences)

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate async submission
      await new Promise(resolve => setTimeout(resolve, 500))

      setIsSuccess(true)
      onSubmit(trimmedPreferences)
      setIsSubmitting(false)

      // Reset success state after a delay
      setTimeout(() => setIsSuccess(false), 3000)
    } else {
      // Focus on first error field
      if (errors.jobTitle && jobTitleRef.current) {
        jobTitleRef.current.focus()
      } else if (errors.workArrangement && workArrangementRef.current) {
        workArrangementRef.current.focus()
      } else if (errors.experienceLevel && experienceLevelRef.current) {
        experienceLevelRef.current.focus()
      }
    }
  }

  const handleChange = (
    field: keyof JobPreferences,
    value: string | number | undefined
  ) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="job-preferences-form" noValidate>
      <div className="form-section">
        <h2>Job Search Preferences</h2>
        <p className="form-description">
          Configure your job search criteria to find the best opportunities
        </p>
      </div>

      {/* Job Title - Required */}
      <div className="form-group">
        <label htmlFor="job-title">
          Job Title <span className="required" aria-label="required">*</span>
        </label>
        <input
          ref={jobTitleRef}
          id="job-title"
          type="text"
          value={preferences.jobTitle}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
          aria-invalid={!!errors.jobTitle ? 'true' : 'false'}
          aria-describedby={errors.jobTitle ? 'job-title-error' : undefined}
          placeholder="e.g., Software Engineer, Product Manager"
          disabled={isSubmitting}
        />
        {errors.jobTitle && (
          <span id="job-title-error" className="error" role="alert">
            {errors.jobTitle}
          </span>
        )}
      </div>

      {/* Location - Optional */}
      <div className="form-group">
        <label htmlFor="location">Location (Optional)</label>
        <input
          id="location"
          type="text"
          value={preferences.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., San Francisco, New York"
          disabled={isSubmitting}
        />
      </div>

      {/* Work Arrangement - Required */}
      <div className="form-group">
        <label htmlFor="work-arrangement">
          Work Arrangement <span className="required" aria-label="required">*</span>
        </label>
        <select
          ref={workArrangementRef}
          id="work-arrangement"
          value={preferences.workArrangement}
          onChange={(e) => handleChange('workArrangement', e.target.value as WorkArrangement)}
          aria-invalid={!!errors.workArrangement ? 'true' : 'false'}
          aria-describedby={errors.workArrangement ? 'work-arrangement-error' : undefined}
          disabled={isSubmitting}
        >
          <option value="">Select work arrangement</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>
        {errors.workArrangement && (
          <span id="work-arrangement-error" className="error" role="alert">
            {errors.workArrangement}
          </span>
        )}
      </div>

      {/* Minimum Salary - Optional */}
      <div className="form-group">
        <label htmlFor="minimum-salary">Minimum Salary (Optional)</label>
        <input
          id="minimum-salary"
          type="number"
          value={preferences.minimumSalary !== undefined ? preferences.minimumSalary : ''}
          onChange={(e) => {
            const value = e.target.value
            handleChange('minimumSalary', value === '' ? undefined : Number(value))
          }}
          aria-invalid={!!errors.minimumSalary ? 'true' : 'false'}
          aria-describedby={errors.minimumSalary ? 'minimum-salary-error' : undefined}
          placeholder="e.g., 50000"
          min="0"
          step="1"
          disabled={isSubmitting}
        />
        {errors.minimumSalary && (
          <span id="minimum-salary-error" className="error" role="alert">
            {errors.minimumSalary}
          </span>
        )}
      </div>

      {/* Experience Level - Required */}
      <div className="form-group">
        <label htmlFor="experience-level">
          Experience Level <span className="required" aria-label="required">*</span>
        </label>
        <select
          ref={experienceLevelRef}
          id="experience-level"
          value={preferences.experienceLevel}
          onChange={(e) => handleChange('experienceLevel', e.target.value as ExperienceLevel)}
          aria-invalid={!!errors.experienceLevel ? 'true' : 'false'}
          aria-describedby={errors.experienceLevel ? 'experience-level-error' : undefined}
          disabled={isSubmitting}
        >
          <option value="">Select experience level</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Junior">Junior</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior">Senior</option>
        </select>
        {errors.experienceLevel && (
          <span id="experience-level-error" className="error" role="alert">
            {errors.experienceLevel}
          </span>
        )}
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div className="success-message" role="status" aria-live="polite">
          Preferences saved successfully!
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          aria-busy={isSubmitting ? 'true' : undefined}
        >
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </form>
  )
}

export default JobPreferencesForm
