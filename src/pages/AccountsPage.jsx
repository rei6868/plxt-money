import React, { useState, useEffect } from 'react'
import { Card } from '../components/Common/Card'
import { MainLayout } from '../layouts/MainLayout'
import { AccountsTable } from '../components/Dashboard/AccountsTable'
import { accountService } from '../services/accountService'
import { formatCurrency } from '../utils/formatting'

export const AccountsPage = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalLimit, setTotalLimit] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await accountService.getAccounts()
        if (result.success) {
          setAccounts(result.data || [])
          
          // Calculate totals
          const balance = (result.data || []).reduce((sum, acc) => sum + (acc.balance || 0), 0)
          const limit = (result.data || [])
            .filter(acc => acc.credit_limit)
            .reduce((sum, acc) => sum + acc.credit_limit, 0)
          
          setTotalBalance(balance)
          setTotalLimit(limit)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const subscription = accountService.onAccountsChange((payload) => {
      console.log('Account update:', payload)
      setAccounts(prev => {
        if (payload.eventType === 'INSERT') {
          return [...prev, payload.new]
        } else if (payload.eventType === 'UPDATE') {
          return prev.map(a => a.account_id === payload.new.account_id ? payload.new : a)
        } else if (payload.eventType === 'DELETE') {
          return prev.filter(a => a.account_id !== payload.old.account_id)
        }
        return prev
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600 mt-2">Manage all your financial accounts</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatCurrency(totalBalance)}
            </p>
          </Card>

          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Total Credit Limit</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {formatCurrency(totalLimit)}
            </p>
          </Card>
        </div>

        {/* Accounts Table */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">All Accounts</h2>
          <AccountsTable accounts={accounts} loading={loading} />
        </Card>
      </div>
    </MainLayout>
  )
}