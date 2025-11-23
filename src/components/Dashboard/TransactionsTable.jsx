import React from 'react'
import { formatCurrency, formatDate } from '../../utils/formatting'
import { TRANSACTION_TYPES } from '../../utils/constants'

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