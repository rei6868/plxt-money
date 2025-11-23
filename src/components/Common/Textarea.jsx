import React from 'react'
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