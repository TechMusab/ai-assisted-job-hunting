# AI-Assisted Job Hunting — Development Guidelines

## Project Overview

AI-Assisted Job Hunting is an AI-powered frontend application designed to help job seekers discover, understand, match, and manage job opportunities.

The primary focus of this project is **Frontend AI Engineering**.

The application should combine modern frontend engineering practices with useful AI-powered user experiences.

## Primary Goals

* Build a modern and responsive frontend.
* Integrate AI into meaningful user workflows.
* Create clear and intuitive AI interactions.
* Make AI outputs understandable and actionable.
* Handle AI loading, streaming, errors, and empty states gracefully.
* Maintain accessibility and usability.
* Keep the codebase maintainable and scalable.

## Tech Stack

* React
* TypeScript
* Node.js
* AI/LLM APIs
* Git
* Claude Code for AI-assisted development

Additional technologies will be documented as they are introduced.

## Frontend Conventions

* Use TypeScript throughout the frontend.
* Prefer functional React components.
* Build small, reusable components.
* Keep components focused on a single responsibility.
* Separate UI, application logic, and API/AI integration where practical.
* Use descriptive names.
* Avoid unnecessary duplication.
* Reuse existing components and patterns before creating new ones.
* Prioritize responsive design and accessibility.
* Provide appropriate loading, error, empty, and success states.

## Form and Validation Rules

* Implement comprehensive form validation with clear error messages.
* Trim text inputs before validation and submission.
* Preserve user input when validation fails.
* Prevent duplicate form submissions during async operations.
* Show loading states during form submission.
* Display success states after successful operations.
* Use ARIA attributes for accessibility (`aria-invalid`, `aria-describedby`, `aria-label`).
* Associate error messages with their corresponding form fields.
* Implement focus management for validation errors.
* Handle edge cases like empty forms, partial completion, and invalid input.

## Testing Requirements

* Write comprehensive tests for all components and features.
* Test validation logic thoroughly, including edge cases.
* Test accessibility features (ARIA attributes, keyboard navigation).
* Test form submission, loading states, and success/error states.
* Test user interactions and state changes.
* Aim for high test coverage before considering features complete.
* Use testing libraries appropriate for the tech stack (Vitest, React Testing Library).
* Test user workflows, not just individual functions.

## Accessibility Standards

* Implement accessibility from the start, not as an afterthought.
* All interactive elements must have accessible labels.
* Use semantic HTML elements appropriately.
* Provide keyboard navigation support for all interactive elements.
* Use ARIA attributes to communicate state and role information.
* Ensure color is not the only way to convey information.
* Test accessibility with screen readers and keyboard navigation.
* Follow WCAG guidelines for accessibility compliance.

## AI Integration Guidelines

* AI should solve a real user problem.
* Do not add AI features only for demonstration.
* Clearly distinguish AI-generated content from user-provided content.
* Prefer structured AI responses when appropriate.
* Handle slow, failed, or incomplete AI responses gracefully.
* Never expose API keys or secrets in frontend code.
* Validate AI-generated data before using it.
* Do not blindly accept AI-generated code.

## Git Conventions

Use Conventional Commits.

Examples:

* `feat: add AI job analyzer`
* `feat: add job matching interface`
* `fix: handle failed AI response`
* `docs: update project README`
* `refactor: extract reusable job card`

## AI-Assisted Development

AI assistants may be used throughout development.

When using AI-generated code:

1. Understand what the generated code does.
2. Review it for correctness and security.
3. Test the implementation.
4. Follow the existing project architecture.
5. Avoid unnecessary complexity.

## Current Project Status

The project is currently in the initial setup phase.
