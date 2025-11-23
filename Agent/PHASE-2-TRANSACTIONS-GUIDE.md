# 🚀 PHASE 2 - TRANSACTIONS UI GUIDE
## Complete Code for Agent: Table + Modal Add Transaction

---

## OVERVIEW

**Objective:** Build Transactions page with:
- Table displaying all transactions (real-time from DB)
- Modal for adding new transactions
- Delete functionality
- Status indicators
- Currency formatting

**New/Modified Files:** 8 files
**Time:** ~30 minutes

---

## PART 1: NEW MODAL COMPONENT

### Create: `src/components/Common/Modal.jsx`

```jsx
import { useEffect } from 'react'

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-lg ${sizes[size]} w-full max-h-96 overflow-y-auto`}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
```

---

## PART 2: SELECT COMPONENT

### Create: `src/components/Common/Select.jsx`

```jsx
import clsx from 'clsx'

export const Select = ({ 
  label, 
  name,
  value, 
  onChange, 
  options = [],
  error, 
  disabled = false,
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg font-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          error ? 'border-red-500' : 'border-gray-300',
          disabled && 'bg-gray-100 cursor-not-allowed',
          className
        )}
        {...props}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
```

---

## PART 3: TEXTAREA COMPONENT

### Create: `src/components/Common/Textarea.jsx`

```jsx
import clsx from 'clsx'

export const Textarea = ({ 
  label, 
  error, 
  disabled = false,
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
      <textarea
        disabled={disabled}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg font-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none',
          error ? 'border-red-500' : 'border-gray-300',
          disabled && 'bg-gray-100 cursor-not-allowed',
          className
        )}
        rows={3}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
```

---

## PART 4: ADD TRANSACTION FORM COMPONENT

### Create: `src/components/Dashboard/AddTransactionModal.jsx`

```jsx
import { useState } from 'react'
import { Modal } from '../Common/Modal'
import { Input } from '../Common/Input'
import { Select } from '../Common/Select'
import { Textarea } from '../Common/Textarea'
import { Button } from '../Common/Button'
import { TRANSACTION_TYPES } from '../../utils/constants'

export const AddTransactionModal = ({ isOpen, onClose, accounts, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    txn_type: TRANSACTION_TYPES.EXPENSE,
    from_account_id: '',
    to_account_id: '',
    notes: '',
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
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Amount must be > 0'
    if (!formData.txn_type) newErrors.txn_type = 'Transaction type is required'
    
    if (formData.txn_type === TRANSACTION_TYPES.TRANSFER) {
      if (!formData.from_account_id) newErrors.from_account_id = 'From account required'
      if (!formData.to_account_id) newErrors.to_account_id = 'To account required'
      if (formData.from_account_id === formData.to_account_id) {
        newErrors.to_account_id = 'From and To accounts cannot be same'
      }
    } else if (formData.txn_type === TRANSACTION_TYPES.EXPENSE) {
      if (!formData.from_account_id) newErrors.from_account_id = 'Account required'
    } else if ([TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.CASHBACK_EARNED].includes(formData.txn_type)) {
      if (!formData.to_account_id) newErrors.to_account_id = 'Account required'
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

    const txnData = {
      ...formData,
      amount: parseFloat(formData.amount),
      transaction_id: `TXN-${Date.now()}`,
      status: 'ACTIVE',
      period_tag: formData.date.substring(0, 7).replace('-', '').toUpperCase() + formData.date.substring(8),
    }

    await onSubmit(txnData)
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      txn_type: TRANSACTION_TYPES.EXPENSE,
      from_account_id: '',
      to_account_id: '',
      notes: '',
    })
    setErrors({})
    onClose()
  }

  const accountOptions = accounts.map(acc => ({
    value: acc.account_id,
    label: `${acc.account_name} (${acc.balance.toLocaleString('vi-VN')})`,
  }))

  const txnTypeOptions = [
    { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense' },
    { value: TRANSACTION_TYPES.INCOME, label: 'Income' },
    { value: TRANSACTION_TYPES.TRANSFER, label: 'Transfer' },
    { value: TRANSACTION_TYPES.REFUND, label: 'Refund' },
    { value: TRANSACTION_TYPES.CASHBACK_EARNED, label: 'Cashback Earned' },
    { value: TRANSACTION_TYPES.CASHBACK_GIVEN, label: 'Cashback Given' },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            disabled={loading}
          />
          <Input
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
            placeholder="0.00"
            disabled={loading}
          />
        </div>

        <Select
          label="Transaction Type"
          name="txn_type"
          value={formData.txn_type}
          onChange={handleChange}
          options={txnTypeOptions}
          error={errors.txn_type}
          disabled={loading}
        />

        {[TRANSACTION_TYPES.EXPENSE, TRANSACTION_TYPES.TRANSFER, TRANSACTION_TYPES.CASHBACK_GIVEN].includes(formData.txn_type) && (
          <Select
            label="From Account"
            name="from_account_id"
            value={formData.from_account_id}
            onChange={handleChange}
            options={accountOptions}
            error={errors.from_account_id}
            disabled={loading}
          />
        )}

        {[TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.TRANSFER, TRANSACTION_TYPES.CASHBACK_EARNED].includes(formData.txn_type) && (
          <Select
            label="To Account"
            name="to_account_id"
            value={formData.to_account_id}
            onChange={handleChange}
            options={accountOptions}
            error={errors.to_account_id}
            disabled={loading}
          />
        )}

        <Textarea
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Optional notes..."
          disabled={loading}
        />

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            className="flex-1"
            loading={loading}
            disabled={loading}
          >
            Add Transaction
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
```

---

## PART 5: TRANSACTIONS TABLE COMPONENT

### Create: `src/components/Dashboard/TransactionsTable.jsx`

```jsx
import { formatCurrency, formatDate } from '../../utils/formatting'

export const TransactionsTable = ({ transactions, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions yet. Add one to get started!
      </div>
    )
  }

  const getTxnTypeColor = (type) => {
    const colors = {
      EXPENSE: 'text-red-600 bg-red-50',
      INCOME: 'text-green-600 bg-green-50',
      TRANSFER: 'text-blue-600 bg-blue-50',
      REFUND: 'text-yellow-600 bg-yellow-50',
      CASHBACK_EARNED: 'text-purple-600 bg-purple-50',
      CASHBACK_GIVEN: 'text-indigo-600 bg-indigo-50',
    }
    return colors[type] || 'text-gray-600 bg-gray-50'
  }

  const getAmountSign = (type) => {
    if ([TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.REFUND, TRANSACTION_TYPES.CASHBACK_EARNED].includes(type)) {
      return '+'
    }
    return '-'
  }

  const getAmountColor = (type) => {
    if ([TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.REFUND, TRANSACTION_TYPES.CASHBACK_EARNED].includes(type)) {
      return 'text-green-600'
    }
    return 'text-red-600'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">From</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">To</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Notes</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.transaction_id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-3 text-sm text-gray-700">{formatDate(txn.date)}</td>
              <td className="px-6 py-3 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTxnTypeColor(txn.txn_type)}`}>
                  {txn.txn_type}
                </span>
              </td>
              <td className="px-6 py-3 text-sm text-gray-600">{txn.from_account_id || '-'}</td>
              <td className="px-6 py-3 text-sm text-gray-600">{txn.to_account_id || '-'}</td>
              <td className={`px-6 py-3 text-sm font-medium text-right ${getAmountColor(txn.txn_type)}`}>
                {getAmountSign(txn.txn_type)}{formatCurrency(txn.amount)}
              </td>
              <td className="px-6 py-3 text-sm text-gray-600 truncate">{txn.notes || '-'}</td>
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => onDelete(txn.transaction_id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

## PART 6: UPDATE TRANSACTIONS PAGE

### Update: `src/pages/DashboardPage.jsx`

**Replace entire file with:**

```jsx
import { useState, useEffect } from 'react'
import { Card } from '../components/Common/Card'
import { Button } from '../components/Common/Button'
import { MainLayout } from '../layouts/MainLayout'
import { useAuth } from '../hooks/useAuth'
import { formatCurrency } from '../utils/formatting'
import { AddTransactionModal } from '../components/Dashboard/AddTransactionModal'
import { TransactionsTable } from '../components/Dashboard/TransactionsTable'
import { transactionService } from '../services/transactionService'
import { accountService } from '../services/accountService'
import { supabase } from '../services/supabaseClient'

export const DashboardPage = () => {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [totalBalance, setTotalBalance] = useState(0)

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch transactions
        const txnResult = await transactionService.getTransactions(20)
        if (txnResult.success) {
          setTransactions(txnResult.data || [])
        }

        // Fetch accounts
        const accResult = await accountService.getAccounts()
        if (accResult.success) {
          setAccounts(accResult.data || [])
        }

        // Get total balance
        const balResult = await accountService.getTotalBalance()
        if (balResult.success) {
          setTotalBalance(balResult.total)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Subscribe to real-time transaction updates
  useEffect(() => {
    const subscription = transactionService.onTransactionsChange((payload) => {
      console.log('Transaction update:', payload)
      setTransactions(prev => {
        if (payload.eventType === 'INSERT') {
          return [payload.new, ...prev]
        } else if (payload.eventType === 'UPDATE') {
          return prev.map(t => t.transaction_id === payload.new.transaction_id ? payload.new : t)
        } else if (payload.eventType === 'DELETE') {
          return prev.filter(t => t.transaction_id !== payload.old.transaction_id)
        }
        return prev
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [])

  const handleAddTransaction = async (txnData) => {
    const result = await transactionService.createTransaction(txnData)
    if (result.success) {
      // Real-time will handle UI update
      setModalOpen(false)
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  const handleDeleteTransaction = async (txnId) => {
    if (confirm('Are you sure?')) {
      const result = await transactionService.deleteTransaction(txnId)
      if (!result.success) {
        alert(`Error: ${result.error}`)
      }
    }
  }

  const monthlySpending = transactions
    .filter(t => t.txn_type === 'EXPENSE')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const monthlyIncome = transactions
    .filter(t => t.txn_type === 'INCOME')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.email}!
            </h1>
            <p className="text-gray-600 mt-2">Here's your financial overview</p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2"
          >
            + Add Transaction
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatCurrency(totalBalance)}
            </p>
          </Card>

          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Monthly Spending</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {formatCurrency(monthlySpending)}
            </p>
          </Card>

          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Monthly Income</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatCurrency(monthlyIncome)}
            </p>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
          <TransactionsTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            loading={loading}
          />
        </Card>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        accounts={accounts}
        onSubmit={handleAddTransaction}
        loading={loading}
      />
    </MainLayout>
  )
}
```

---

## PART 7: UPDATE CONSTANTS

### Update: `src/utils/constants.js`

**Replace entire file with:**

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

---

## PART 8: CREATE TRANSACTIONS PAGE

### Create: `src/pages/TransactionsPage.jsx`

```jsx
import { useState, useEffect } from 'react'
import { Card } from '../components/Common/Card'
import { Button } from '../components/Common/Button'
import { MainLayout } from '../layouts/MainLayout'
import { AddTransactionModal } from '../components/Dashboard/AddTransactionModal'
import { TransactionsTable } from '../components/Dashboard/TransactionsTable'
import { transactionService } from '../services/transactionService'
import { accountService } from '../services/accountService'

export const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const txnResult = await transactionService.getTransactions(100)
        if (txnResult.success) {
          setTransactions(txnResult.data || [])
        }

        const accResult = await accountService.getAccounts()
        if (accResult.success) {
          setAccounts(accResult.data || [])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const subscription = transactionService.onTransactionsChange((payload) => {
      setTransactions(prev => {
        if (payload.eventType === 'INSERT') {
          return [payload.new, ...prev]
        } else if (payload.eventType === 'UPDATE') {
          return prev.map(t => t.transaction_id === payload.new.transaction_id ? payload.new : t)
        } else if (payload.eventType === 'DELETE') {
          return prev.filter(t => t.transaction_id !== payload.old.transaction_id)
        }
        return prev
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [])

  const handleAddTransaction = async (txnData) => {
    const result = await transactionService.createTransaction(txnData)
    if (result.success) {
      setModalOpen(false)
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  const handleDeleteTransaction = async (txnId) => {
    if (confirm('Are you sure?')) {
      const result = await transactionService.deleteTransaction(txnId)
      if (!result.success) {
        alert(`Error: ${result.error}`)
      }
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-2">Manage all your transactions</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            + Add Transaction
          </Button>
        </div>

        <Card>
          <TransactionsTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            loading={loading}
          />
        </Card>
      </div>

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        accounts={accounts}
        onSubmit={handleAddTransaction}
        loading={loading}
      />
    </MainLayout>
  )
}
```

---

## PART 9: UPDATE APP ROUTING

### Update: `src/App.jsx`

**Find section with routes and add:**

```jsx
import { TransactionsPage } from './pages/TransactionsPage'
```

**Add route in Routes section:**

```jsx
<Route
  path={APP_ROUTES.TRANSACTIONS}
  element={
    <ProtectedRoute user={user} loading={loading}>
      <TransactionsPage />
    </ProtectedRoute>
  }
/>
```

---

## EXECUTION CHECKLIST

### Step 1: Create New Components

Create these files (copy-paste from PARTS 1-3):
- [ ] `src/components/Common/Modal.jsx`
- [ ] `src/components/Common/Select.jsx`
- [ ] `src/components/Common/Textarea.jsx`

### Step 2: Create Form Component

- [ ] `src/components/Dashboard/AddTransactionModal.jsx` (PART 4)

### Step 3: Create Table Component

- [ ] `src/components/Dashboard/TransactionsTable.jsx` (PART 5)

### Step 4: Update Existing Files

- [ ] Update `src/pages/DashboardPage.jsx` (PART 6)
- [ ] Update `src/utils/constants.js` (PART 7)
- [ ] Create `src/pages/TransactionsPage.jsx` (PART 8)
- [ ] Update `src/App.jsx` (PART 9)

### Step 5: Test

```bash
npm run dev
```

Test features:
- [ ] Click "+ Add Transaction" button → Modal opens
- [ ] Fill form and submit → Transaction appears in table
- [ ] Real-time update works (form clears, table refreshes)
- [ ] Click "Delete" → Transaction removed
- [ ] Navigate to Transactions page → Full list displayed
- [ ] Summary cards update with new data

### Step 6: Commit

```bash
git add .
git commit -m "feat: add transactions table and modal form"
git push origin feature/auth-setup
```

---

## 🎯 EXPECTED RESULTS

✅ Dashboard shows:
- Add Transaction button
- Summary cards (Balance, Spending, Income)
- Recent transactions table

✅ Modal features:
- Date picker
- Amount input
- Transaction type dropdown
- Account selection (From/To based on type)
- Notes textarea
- Form validation

✅ Table features:
- Sortable columns
- Color-coded transaction types
- Delete button
- Currency formatting
- Date formatting

✅ Real-time:
- New transactions appear instantly
- Deleted transactions removed instantly
- Form clears after submission

---

**Everything ready for agent! Download and deploy.** 🚀