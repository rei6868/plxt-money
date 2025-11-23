import React from 'react'
import clsx from 'clsx'

export const TabGroup = ({ value, onChange, options = [] }) => (
  <div className="flex gap-2 mb-4">
    {options.map(opt => (
      <button
        key={opt.value}
        type="button"
        className={clsx(
          "px-6 py-2 rounded-lg font-semibold",
          value === opt.value
            ? "bg-blue-600 text-white shadow"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
        onClick={() => onChange({ target: { value: opt.value } })}
      >
        {opt.label}
      </button>
    ))}
  </div>
)