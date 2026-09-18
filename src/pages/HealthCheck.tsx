import React, { useState, useEffect } from 'react'

interface HealthStatus {
  status: 'loading' | 'success' | 'error'
  message: string
  timestamp?: string
  data?: any
}

const HealthCheck: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    status: 'loading',
    message: 'Checking system health...'
  })

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Fetch from a public API to test connectivity
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        setHealthStatus({
          status: 'success',
          message: 'System is healthy - Data fetch successful',
          timestamp: new Date().toISOString(),
          data: {
            api: 'JSONPlaceholder',
            endpoint: '/posts/1',
            response: data
          }
        })
      } catch (error) {
        setHealthStatus({
          status: 'error',
          message: `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: new Date().toISOString()
        })
      }
    }

    checkHealth()
  }, [])

  const statusColors = {
    loading: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">System Health Check</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
        <div className={`p-4 rounded-lg border ${statusColors[healthStatus.status]}`}>
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {healthStatus.status === 'loading' && '⏳'}
              {healthStatus.status === 'success' && '✅'}
              {healthStatus.status === 'error' && '❌'}
            </div>
            <div>
              <h3 className="font-semibold capitalize">{healthStatus.status}</h3>
              <p className="text-sm">{healthStatus.message}</p>
            </div>
          </div>
        </div>

        {healthStatus.timestamp && (
          <div className="text-sm text-gray-500">
            <p>Last checked: {new Date(healthStatus.timestamp).toLocaleString()}</p>
          </div>
        )}

        {healthStatus.data && (
          <div className="bg-gray-50 p-4 rounded border">
            <h4 className="font-semibold mb-2">Fetched Data Sample:</h4>
            <pre className="text-xs overflow-auto bg-white p-3 rounded border">
              {JSON.stringify(healthStatus.data, null, 2)}
            </pre>
          </div>
        )}

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Recheck Health
        </button>
      </div>
    </div>
  )
}

export default HealthCheck
