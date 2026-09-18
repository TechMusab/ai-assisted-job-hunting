import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import JobSearch from './pages/JobSearch'
import JobPreferences from './pages/JobPreferences'
import JobMatching from './pages/JobMatching'
import ResumeManagement from './pages/ResumeManagement'
import CareerAssistant from './pages/CareerAssistant'
import HealthCheck from './pages/HealthCheck'

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<JobSearch />} />
          <Route path="/preferences" element={<JobPreferences />} />
          <Route path="/matching" element={<JobMatching />} />
          <Route path="/resume" element={<ResumeManagement />} />
          <Route path="/assistant" element={<CareerAssistant />} />
          <Route path="/health" element={<HealthCheck />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
