import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AuthLayout } from '../components/Auth/AuthLayout'
import { LoginForm } from '../components/Auth/LoginForm'
import { APP_ROUTES, AUTH_ROUTES } from '../utils/constants'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { signin, loading, error } = useAuth()
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (formData) => {
    setSubmitError(null)
    const result = await signin(formData.email, formData.password)
    
    if (result.success) {
      navigate(APP_ROUTES.DASHBOARD)
    } else {
      setSubmitError(result.error)
    }
  }

  return (
    <AuthLayout
      title="Money Flow"
      subtitle="Sign in to your account"
      footer={
        <div>
          Don't have an account?{' '}
          <Link to={AUTH_ROUTES.SIGNUP} className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      }
    >
      {(error || submitError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error || submitError}
        </div>
      )}
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </AuthLayout>
  )
}