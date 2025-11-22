import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { authService } from '../services/authService'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const user = await authService.getCurrentUser()
        setUser(user)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Subscribe to auth changes
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe()
      }
    }
  }, [])

  const signup = async (email, password, name) => {
    setLoading(true)
    setError(null)
    const result = await authService.signup(email, password, name)
    setLoading(false)
    if (!result.success) setError(result.error)
    return result
  }

  const signin = async (email, password) => {
    setLoading(true)
    setError(null)
    const result = await authService.signin(email, password)
    setLoading(false)
    if (!result.success) {
      setError(result.error)
    } else {
      setUser(result.user)
    }
    return result
  }

  const signout = async () => {
    setLoading(true)
    const result = await authService.signout()
    setLoading(false)
    if (result.success) setUser(null)
    return result
  }

  return {
    user,
    loading,
    error,
    signin,
    signup,
    signout,
    isAuthenticated: !!user,
  }
}