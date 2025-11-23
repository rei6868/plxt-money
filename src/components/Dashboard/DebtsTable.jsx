import React from 'react'
import { formatCurrency, formatDate } from '../../utils/formatting'
import clsx from 'clsx'

export const DebtsTable = ({ debts, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!debts || debts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No active debts.
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const badges = {
      OPEN: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      PARTIAL: 'bg-orange-50 text-orange-700 border-orange-200',
      FULLY_REPAID: 'bg-green-50 text-green-700 border-green-200',
      OVERDUE: 'bg-red-50 text-red-700 border-red-200',
    }
    return badges[status] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  const getProgressPercent = (sum_repaid, sum_debt) => {
    if (sum_debt === 0) return 100
    return Math.min((sum_repaid / sum_debt) * 100, 100)
  }

  return (
    <div className="space-y-4">
      {debts.map((debt) => {
        const progressPercent = getProgressPercent(debt.sum_repaid || 0, debt.sum_debt || 0)
        const remainingDebt = (debt.sum_debt || 0) - (debt.sum_repaid || 0)

        return (
          <div key={debt.ledger_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{debt.person_name || 'Unknown'}</h3>
                <p className="text-xs text-gray-500">{debt.period_tag}</p>
              </div>
              <span className={clsx(
                'px-3 py-1 rounded-full text-xs font-medium border',
                getStatusBadge(debt.status)
              )}>
                {debt.status.replace('_', ' ')}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Debt Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Initial Debt</p>
                <p className="font-semibold text-gray-900">{formatCurrency(debt.sum_debt_initial || 0)}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Repaid</p>
                <p className="font-semibold text-green-600">{formatCurrency(debt.sum_repaid || 0)}</p>
              </div>
              <div>
                <p className="text-gray-600">Remaining</p>
                <p className={clsx(
                  'font-semibold',
                  remainingDebt > 0 ? 'text-red-600' : 'text-green-600'
                )}>
                  {formatCurrency(Math.max(remainingDebt, 0))}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Back on Debt</p>
                <p className="font-semibold text-purple-600">{formatCurrency(debt.sum_back_on_debt || 0)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}