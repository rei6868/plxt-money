import React from 'react'
import { formatCurrency } from '../../utils/formatting'
import clsx from 'clsx'

export const AccountsTable = ({ accounts, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No accounts found.
      </div>
    )
  }

  const getTypeColor = (type) => {
    const colors = {
      CREDIT_CARD: 'bg-blue-50 text-blue-700',
      BANK: 'bg-green-50 text-green-700',
      WALLET: 'bg-purple-50 text-purple-700',
    }
    return colors[type] || 'bg-gray-50 text-gray-700'
  }

  const getStatusColor = (isActive) => {
    return isActive ? 'text-green-600' : 'text-gray-400'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Account Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Balance</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Credit Limit</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Cashback %</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.account_id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-3">
                <div>
                  <p className="font-medium text-gray-900">{acc.account_name}</p>
                  <p className="text-xs text-gray-500">{acc.account_id}</p>
                </div>
              </td>
              <td className="px-6 py-3">
                <span className={clsx('px-3 py-1 rounded-full text-xs font-medium', getTypeColor(acc.account_type))}>
                  {acc.account_type.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-3 text-right">
                <p className={clsx(
                  'font-semibold',
                  acc.balance >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {formatCurrency(acc.balance)}
                </p>
              </td>
              <td className="px-6 py-3 text-right text-sm text-gray-600">
                {acc.credit_limit ? formatCurrency(acc.credit_limit) : '-'}
              </td>
              <td className="px-6 py-3 text-right text-sm text-gray-600">
                {acc.cashback_rate}%
              </td>
              <td className="px-6 py-3 text-center">
                <span className={clsx('text-sm font-medium', getStatusColor(acc.is_active))}>
                  {acc.is_active ? '●' : '○'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}