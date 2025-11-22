import React from 'react'

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