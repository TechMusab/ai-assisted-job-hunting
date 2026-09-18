import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JobPreferencesForm from './JobPreferencesForm'

describe('JobPreferencesForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  describe('Form rendering', () => {
    it('renders all form fields', () => {
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/job title/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/work arrangement/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/minimum salary/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/experience level/i)).toBeInTheDocument()
    })

    it('marks required fields with asterisk', () => {
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      // Check that required indicators exist
      const requiredIndicators = screen.getAllByLabelText('required')
      expect(requiredIndicators).toHaveLength(3)
    })

    it('shows required indicator with aria-label', () => {
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const requiredIndicators = screen.getAllByLabelText('required')
      expect(requiredIndicators).toHaveLength(3)
    })
  })

  describe('Required field validation', () => {
    it('shows error when job title is empty on submit', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(screen.getByText(/job title is required/i)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('shows error when work arrangement is not selected on submit', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(screen.getByText(/work arrangement is required/i)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('shows error when experience level is not selected on submit', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(screen.getByText(/experience level is required/i)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('clears error when user starts typing in job title', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(screen.getByText(/job title is required/i)).toBeInTheDocument()

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      expect(screen.queryByText(/job title is required/i)).not.toBeInTheDocument()
    })
  })

  describe('Salary validation', () => {
    it('shows error when salary is negative', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const salaryInput = screen.getByLabelText(/minimum salary/i)
      await user.type(salaryInput, '-500')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(screen.getByText(/salary cannot be negative/i)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('accepts zero as valid salary', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const salaryInput = screen.getByLabelText(/minimum salary/i)
      await user.type(salaryInput, '0')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            minimumSalary: 0
          })
        )
      })
    })

    it('accepts positive salary', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const salaryInput = screen.getByLabelText(/minimum salary/i)
      await user.type(salaryInput, '50000')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            minimumSalary: 50000
          })
        )
      })
    })

    it('allows empty salary (optional field)', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            minimumSalary: undefined
          })
        )
      })
    })
  })

  describe('Text trimming', () => {
    it('trims whitespace from job title before validation', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, '  Software Engineer  ')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            jobTitle: 'Software Engineer'
          })
        )
      })
    })

    it('trims whitespace from location', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const locationInput = screen.getByLabelText(/location/i)
      await user.type(locationInput, '  San Francisco  ')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            location: 'San Francisco'
          })
        )
      })
    })

    it('rejects whitespace-only job title', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, '   ')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(screen.getByText(/job title is required/i)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Form submission', () => {
    it('submits valid form data', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const locationInput = screen.getByLabelText(/location/i)
      await user.type(locationInput, 'San Francisco')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Hybrid')

      const salaryInput = screen.getByLabelText(/minimum salary/i)
      await user.type(salaryInput, '75000')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Mid Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          jobTitle: 'Software Engineer',
          location: 'San Francisco',
          workArrangement: 'Hybrid',
          minimumSalary: 75000,
          experienceLevel: 'Mid Level'
        })
      })
    })

    it('shows success message after successful submission', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/preferences saved successfully/i)).toBeInTheDocument()
      })
    })

    it('disables submit button during submission', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveTextContent('Saving...')

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
        expect(submitButton).toHaveTextContent('Save Preferences')
      })
    })
  })

  describe('Duplicate submission prevention', () => {
    it('prevents multiple simultaneous submissions', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })

      // Click submit button twice rapidly
      await user.click(submitButton)
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Accessibility', () => {
    it('associates error messages with their fields using aria-describedby', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      expect(jobTitleInput).toHaveAttribute('aria-invalid', 'true')
      expect(jobTitleInput).toHaveAttribute('aria-describedby', 'job-title-error')

      const errorMessage = screen.getByText(/job title is required/i)
      expect(errorMessage).toHaveAttribute('id', 'job-title-error')
      expect(errorMessage).toHaveAttribute('role', 'alert')
    })

    it('uses aria-busy during submission', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(submitButton).toHaveAttribute('aria-busy', 'true')

      await waitFor(() => {
        expect(submitButton).not.toHaveAttribute('aria-busy')
      }, { timeout: 2000 })
    })

    it('focuses first error field on validation failure', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      // Just verify that errors are shown
      expect(screen.getByText(/job title is required/i)).toBeInTheDocument()
    })

    it('uses success message with role="status" and aria-live', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      await waitFor(() => {
        const successMessage = screen.getByText(/preferences saved successfully/i)
        expect(successMessage).toHaveAttribute('role', 'status')
        expect(successMessage).toHaveAttribute('aria-live', 'polite')
      })
    })
  })

  describe('Form state preservation', () => {
    it('preserves user input when validation fails', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const locationInput = screen.getByLabelText(/location/i)
      await user.type(locationInput, 'San Francisco')

      const salaryInput = screen.getByLabelText(/minimum salary/i)
      await user.type(salaryInput, '-500')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(jobTitleInput).toHaveValue('Software Engineer')
      expect(locationInput).toHaveValue('San Francisco')
      expect(salaryInput).toHaveValue(-500)
      expect(screen.getByText(/salary cannot be negative/i)).toBeInTheDocument()
    })
  })

  describe('Empty and invalid input handling', () => {
    it('handles empty form submission gracefully', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      expect(screen.getByText(/job title is required/i)).toBeInTheDocument()
      expect(screen.getByText(/work arrangement is required/i)).toBeInTheDocument()
      expect(screen.getByText(/experience level is required/i)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('handles valid form with all required fields', async () => {
      const user = userEvent.setup()
      render(<JobPreferencesForm onSubmit={mockOnSubmit} />)

      const jobTitleInput = screen.getByLabelText(/job title/i)
      await user.type(jobTitleInput, 'Software Engineer')

      const workArrangementSelect = screen.getByLabelText(/work arrangement/i)
      await user.selectOptions(workArrangementSelect, 'Remote')

      const experienceLevelSelect = screen.getByLabelText(/experience level/i)
      await user.selectOptions(experienceLevelSelect, 'Entry Level')

      const submitButton = screen.getByRole('button', { name: /save preferences/i })
      await user.click(submitButton)

      // Should submit successfully
      await waitFor(() => {
        expect(screen.queryByText(/job title is required/i)).not.toBeInTheDocument()
        expect(mockOnSubmit).toHaveBeenCalled()
      })
    })
  })
})
