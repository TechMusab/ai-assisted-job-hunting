import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Job Search' },
    { path: '/preferences', label: 'Preferences' },
    { path: '/matching', label: 'Job Matching' },
    { path: '/resume', label: 'Resume' },
    { path: '/assistant', label: 'Career Assistant' },
    { path: '/health', label: 'Health Check' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-primary-600">
                AI-Assisted Job Hunting
              </h1>
            </Link>
            
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 AI-Assisted Job Hunting. Frontend AI Engineering Capstone.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
