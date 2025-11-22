import React from 'react'
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