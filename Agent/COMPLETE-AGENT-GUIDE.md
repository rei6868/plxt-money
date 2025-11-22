# 🚀 REACT APP SETUP - COMPLETE GUIDE FOR AGENT

## PART 1: PROJECT INITIALIZATION

### Step 1.1: Create New Repository (Fresh Start)

```bash
# Create project folder
mkdir money-flow-web
cd money-flow-web

# Initialize git
git init
git config user.name "Money Flow Dev"
git config user.email "dev@moneyflow.local"

# Create initial branch structure
git checkout -b develop
git checkout -b feature/auth-setup
```

### Step 1.2: Create Vite React Project

```bash
# Create Vite + React project
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Verify installation
npm run dev
# Should show: ➜  Local:   http://localhost:5173/
```

### Step 1.3: Install Core Dependencies

```bash
npm install \
  @supabase/supabase-js \
  react-router-dom \
  tailwindcss \
  postcss \
  autoprefixer \
  clsx \
  tailwind-merge \
  -S

npm install \
  @types/react \
  @types/react-dom \
  -D
```

### Step 1.4: Setup Tailwind CSS

```bash
# Initialize Tailwind
npx tailwindcss init -p

# Creates tailwind.config.js + postcss.config.js
```

---

## PART 2: ENVIRONMENT SETUP

### Step 2.1: Create .env.local

Create file: `.env.local`

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# Get these from:
# Supabase Dashboard → Settings → API
```

### Step 2.2: Create .env.local.example

Create file: `.env.local.example`

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

### Step 2.3: Update .gitignore

Add to `.gitignore`:

```
.env.local
.env.*.local
node_modules/
dist/
.DS_Store
*.log
```

---

## PART 3: TAILWIND CONFIGURATION

### Step 3.1: Update tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### Step 3.2: Update postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## PART 4: PROJECT STRUCTURE

### Step 4.1: Create Folder Structure

```bash
mkdir -p src/{components,pages,services,hooks,layouts,utils,styles}
mkdir -p src/components/{Auth,Dashboard,Navigation,Common}
```

### Step 4.2: Folder Structure:

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   └── AuthLayout.jsx
│   ├── Dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── Summary.jsx
│   │   └── RecentTransactions.jsx
│   ├── Navigation/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── Common/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Card.jsx
│       └── LoadingSpinner.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   └── NotFoundPage.jsx
├── services/
│   ├── supabaseClient.js
│   ├── authService.js
│   ├── transactionService.js
│   └── accountService.js
├── hooks/
│   ├── useAuth.js
│   └── useSupabase.js
├── layouts/
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx
├── utils/
│   ├── constants.js
│   ├── validation.js
│   └── formatting.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

---

## PART 5: CORE FILES SETUP

### Step 5.1: Create src/styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
  font-family: 'Inter', system-ui, sans-serif;
}

body {
  background-color: #f9fafb;
  color: #111827;
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors;
  }

  .btn-danger {
    @apply px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors;
  }

  .input-base {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg font-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  }

  .card {
    @apply bg-white rounded-lg shadow-sm border border-gray-100 p-6;
  }
}
```

### Step 5.2: Create src/utils/constants.js

```javascript
export const APP_NAME = 'Money Flow'
export const API_TIMEOUT = 30000

export const AUTH_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
}

export const APP_ROUTES = {
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  ACCOUNTS: '/accounts',
  DEBTS: '/debts',
  CASHBACK: '/cashback',
}

export const TRANSACTION_TYPES = {
  EXPENSE: 'EXPENSE',
  INCOME: 'INCOME',
  TRANSFER: 'TRANSFER',
  REFUND: 'REFUND',
  CASHBACK_EARNED: 'CASHBACK_EARNED',
  CASHBACK_GIVEN: 'CASHBACK_GIVEN',
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}
```

### Step 5.3: Create src/utils/validation.js

```javascript
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword
}

export const validateRequired = (value) => {
  return value && value.trim().length > 0
}
```

### Step 5.4: Create src/utils/formatting.js

```javascript
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
```

---

## PART 6: SUPABASE SERVICE

### Step 6.1: Create src/services/supabaseClient.js

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or ANON KEY in .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Step 6.2: Create src/services/authService.js

```javascript
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
```

### Step 6.3: Create src/services/transactionService.js

```javascript
import { supabase } from './supabaseClient'

export const transactionService = {
  // Get all transactions
  async getTransactions(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .limit(limit)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get transaction by ID
  async getTransactionById(id) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('transaction_id', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create transaction
  async createTransaction(transaction) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update transaction
  async updateTransaction(id, updates) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('transaction_id', id)
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Delete transaction
  async deleteTransaction(id) {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('transaction_id', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Subscribe to real-time transactions
  onTransactionsChange(callback) {
    return supabase
      .channel('transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        callback
      )
      .subscribe()
  },
}
```

### Step 6.4: Create src/services/accountService.js

```javascript
import { supabase } from './supabaseClient'

export const accountService = {
  // Get all accounts
  async getAccounts() {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('is_active', true)
        .order('account_name')

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get account by ID
  async getAccountById(id) {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('account_id', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get total balance across all accounts
  async getTotalBalance() {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('balance')
        .eq('is_active', true)

      if (error) throw error

      const total = data.reduce((sum, acc) => sum + acc.balance, 0)
      return { success: true, total }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Subscribe to account changes
  onAccountsChange(callback) {
    return supabase
      .channel('accounts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'accounts' },
        callback
      )
      .subscribe()
  },
}
```

---

## PART 7: HOOKS

### Step 7.1: Create src/hooks/useAuth.js

```javascript
import { useState, useEffect, useContext, createContext } from 'react'
import { supabase } from '../services/supabaseClient'
import { authService } from '../services/authService'

const AuthContext = createContext()

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
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
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
```

---

## PART 8: LAYOUT COMPONENTS

### Step 8.1: Create src/layouts/AuthLayout.jsx

```jsx
export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
```

### Step 8.2: Create src/layouts/MainLayout.jsx

```jsx
import { Navbar } from '../components/Navigation/Navbar'
import { Sidebar } from '../components/Navigation/Sidebar'

export const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

---

## PART 9: COMMON COMPONENTS

### Step 9.1: Create src/components/Common/Button.jsx

```jsx
import clsx from 'clsx'

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  className,
  children,
  ...props 
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={clsx(
        'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'opacity-75',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  )
}
```

### Step 9.2: Create src/components/Common/Input.jsx

```jsx
import clsx from 'clsx'

export const Input = ({ 
  label, 
  error, 
  className,
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-2 border rounded-lg font-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
```

### Step 9.3: Create src/components/Common/Card.jsx

```jsx
import clsx from 'clsx'

export const Card = ({ 
  className,
  children,
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-100 p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### Step 9.4: Create src/components/Common/LoadingSpinner.jsx

```jsx
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}
```

---

## PART 10: AUTH COMPONENTS

### Step 10.1: Create src/components/Auth/LoginForm.jsx

```jsx
import { useState } from 'react'
import { Input } from '../Common/Input'
import { Button } from '../Common/Button'
import { validateEmail, validateRequired } from '../../utils/validation'

export const LoginForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="your@email.com"
        disabled={loading}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
        disabled={loading}
      />
      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        Sign In
      </Button>
    </form>
  )
}
```

### Step 10.2: Create src/components/Auth/SignupForm.jsx

```jsx
import { useState } from 'react'
import { Input } from '../Common/Input'
import { Button } from '../Common/Button'
import { validateEmail, validatePassword, validatePasswordMatch, validateRequired } from '../../utils/validation'

export const SignupForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required'
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="John Doe"
        disabled={loading}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="your@email.com"
        disabled={loading}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
        disabled={loading}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="••••••••"
        disabled={loading}
      />
      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        Create Account
      </Button>
    </form>
  )
}
```

### Step 10.3: Create src/components/Auth/AuthLayout.jsx

```jsx
export const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-center text-gray-600 mb-8">{subtitle}</p>
          )}
          {children}
          {footer && (
            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

---

## PART 11: NAVIGATION COMPONENTS

### Step 11.1: Create src/components/Navigation/Navbar.jsx

```jsx
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../Common/Button'

export const Navbar = () => {
  const { user, signout } = useAuth()

  const handleSignout = async () => {
    await signout()
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Money Flow</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSignout}
        >
          Sign Out
        </Button>
      </div>
    </nav>
  )
}
```

### Step 11.2: Create src/components/Navigation/Sidebar.jsx

```jsx
import { Link, useLocation } from 'react-router-dom'
import { APP_ROUTES } from '../../utils/constants'
import clsx from 'clsx'

export const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { label: 'Dashboard', path: APP_ROUTES.DASHBOARD },
    { label: 'Transactions', path: APP_ROUTES.TRANSACTIONS },
    { label: 'Accounts', path: APP_ROUTES.ACCOUNTS },
    { label: 'Debts', path: APP_ROUTES.DEBTS },
    { label: 'Cashback', path: APP_ROUTES.CASHBACK },
  ]

  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Money Flow</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'block px-4 py-2 rounded-lg transition-colors',
              location.pathname === item.path
                ? 'bg-blue-600'
                : 'text-gray-300 hover:bg-gray-800'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

---

## PART 12: PAGES

### Step 12.1: Create src/pages/LoginPage.jsx

```jsx
import { useState } from 'react'
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
```

### Step 12.2: Create src/pages/SignupPage.jsx

```jsx
import { useState } from 'react'
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
```

### Step 12.3: Create src/pages/DashboardPage.jsx

```jsx
import { Card } from '../components/Common/Card'
import { MainLayout } from '../layouts/MainLayout'
import { useAuth } from '../hooks/useAuth'
import { formatCurrency } from '../utils/formatting'

export const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.email}!
          </h1>
          <p className="text-gray-600 mt-2">Here's your financial overview</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatCurrency(15234500)}
            </p>
          </Card>

          <Card>
            <h3 className="text-gray-600 text-sm font-medium">This Month Spending</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {formatCurrency(2450000)}
            </p>
          </Card>

          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Cashback Earned</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatCurrency(245000)}
            </p>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">Starbucks Coffee</p>
                <p className="text-sm text-gray-500">Expense • Today</p>
              </div>
              <p className="font-medium text-red-600">-{formatCurrency(45000)}</p>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">Salary</p>
                <p className="text-sm text-gray-500">Income • Yesterday</p>
              </div>
              <p className="font-medium text-green-600">+{formatCurrency(50000000)}</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}
```

### Step 12.4: Create src/pages/NotFoundPage.jsx

```jsx
import { Link } from 'react-router-dom'
import { Button } from '../components/Common/Button'
import { APP_ROUTES } from '../utils/constants'

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <Link to={APP_ROUTES.DASHBOARD} className="mt-8 inline-block">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
```

---

## PART 13: MAIN APP ROUTING

### Step 13.1: Create src/App.jsx

```jsx
import { useState, useEffect } from 'react'
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
```

### Step 13.2: Create src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Step 13.3: Update index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Money Flow - Personal Finance Manager</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## PART 14: FINAL SETUP

### Step 14.1: Update package.json

Add to scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx"
  }
}
```

### Step 14.2: Git Commit

```bash
# Stage all files
git add .

# Commit initial setup
git commit -m "chore: initial project setup with auth, tailwind, and core structure"

# Verify branch
git branch
# Should show:
# * feature/auth-setup
#   develop
```

### Step 14.3: Verify Project Structure

```bash
# Check if dev server runs
npm run dev

# Should output:
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

---

## PART 15: TEST CHECKLIST

Before agent runs, verify:

- [ ] `npm install` completes without errors
- [ ] `.env.local` created with Supabase credentials
- [ ] `npm run dev` starts without errors
- [ ] File structure matches above layout
- [ ] All imports use correct paths
- [ ] Tailwind CSS configured correctly
- [ ] Git initialized with feature branch
- [ ] No TypeScript errors (if using TS)

---

## 🎯 NEXT: WHAT AGENT DOES

Agent will:
1. Run `npm install` (all dependencies)
2. Setup `.env.local` with Supabase keys
3. Run `npm run dev` to start dev server
4. Test login/signup flow
5. Verify database connectivity
6. Report back with screenshots

**Expected Results:**
- ✅ Login page renders
- ✅ Signup page renders
- ✅ Form validation works
- ✅ Supabase auth connects
- ✅ Navigation to dashboard works
- ✅ Dashboard displays user info
- ✅ Logout functions correctly

---

## 📝 NOTES FOR AGENT

- All files are provided above (copy-paste ready)
- Follow exact file paths and naming
- Do NOT modify authentication logic
- Do NOT skip dependency installation
- Run dev server on port 5173
- Test full auth flow before reporting
- Screenshot each page state
- Report any errors immediately

---

**Ready for agent deployment! 🚀**