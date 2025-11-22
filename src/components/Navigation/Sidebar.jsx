import React from 'react'
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