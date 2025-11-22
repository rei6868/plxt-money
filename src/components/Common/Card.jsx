import React from 'react'
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