import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AuthLayout } from '../components/Auth/AuthLayout'
import { SignupForm } from '../components/Auth/SignupForm'
import { APP_ROUTES, AUTH_ROUTES } from '../utils/constants'

export const SignupPage = () => {
  const navigate = useNavigate()
  const { signup, loading, error } = useAuth()
  const [submitError, setSubmitError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleSubmit = async (formData) => {
    setSubmitError(null)
    setSuccessMessage(null)
    
    const result = await signup(formData.email, formData.password, formData.name)
    
    if (result.success) {
      setSuccessMessage('Account created! Please check your email to confirm your account.')
      setTimeout(() => {
        navigate(AUTH_ROUTES.LOGIN)
      }, 3000)
    } else {
      setSubmitError(result.error)
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Money Flow"
      footer={
        <div>
          Already have an account?{' '}
          <Link to={AUTH_ROUTES.LOGIN} className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </div>
      }
    >
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
          {successMessage}
        </div>
      )}
      {(error || submitError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error || submitError}
        </div>
      )}
      <SignupForm onSubmit={handleSubmit} loading={loading} />
    </AuthLayout>
  )
}