import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Find Your Perfect Job with AI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover, analyze, and match with job opportunities using cutting-edge AI technology
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/search"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Start Job Search
          </Link>
          <Link
            to="/preferences"
            className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            Set Preferences
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">AI-Powered Search</h3>
          <p className="text-gray-600">
            Use natural language to find jobs that match your skills and preferences
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
          <p className="text-gray-600">
            Get AI-powered compatibility scores and gap analysis for every opportunity
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Career Assistant</h3>
          <p className="text-gray-600">
            Receive personalized guidance for your job search strategy and skill development
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
