import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { LoadingSpinner } from './components/Common/LoadingSpinner'

// Pages
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Routes
import { AUTH_ROUTES, APP_ROUTES } from './utils/constants'

// Protected Route Component
const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={AUTH_ROUTES.LOGIN} />
  }

  return children
}

export default function App() {
  const { user, loading } = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true)
    }
  }, [loading])

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path={AUTH_ROUTES.LOGIN}
          element={user ? <Navigate to={APP_ROUTES.DASHBOARD} /> : <LoginPage />}
        />
        <Route
          path={AUTH_ROUTES.SIGNUP}
          element={user ? <Navigate to={APP_ROUTES.DASHBOARD} /> : <SignupPage />}
        />

        {/* Protected Routes */}
        <Route
          path={APP_ROUTES.DASHBOARD}
          element={
            <ProtectedRoute user={user} loading={loading}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/" element={<Navigate to={APP_ROUTES.DASHBOARD} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}