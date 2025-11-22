import { supabase } from './supabaseClient'

export const authService = {
  // Sign up with email and password
  async signup(email, password, name) {
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signupError) throw signupError

      // Send confirmation email
      console.log('Signup successful. Confirmation email sent to:', email)

      return {
        success: true,
        user: data.user,
        message: 'Signup successful! Check your email for confirmation link.',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  // Sign in with email and password
  async signin(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return {
        success: true,
        user: data.user,
        session: data.session,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  // Sign out
  async signout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error

      return data.user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Get session
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error

      return data.session
    } catch (error) {
      console.error('Error getting session:', error)
      return null
    }
  },

  // Subscribe to auth changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },
}