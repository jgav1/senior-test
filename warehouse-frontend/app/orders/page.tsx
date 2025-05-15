'use client'
import { useState } from 'react'
import CustomerOrderElement from './CustomerOrderElement'
import EmployeeOrderElement from './EmployeeOrderElement'

export default function Customers() {
  const [view, setView] = useState<'customer' | 'employee'>('customer')

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setView('customer')}
          className={`px-4 py-2 rounded ${view === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Customer View
        </button>
        <button
          onClick={() => setView('employee')}
          className={`px-4 py-2 rounded ${view === 'employee' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Employee View
        </button>
      </div>

      {view === 'customer' ? (
        <div className="space-y-4">
          <CustomerOrderElement />
        </div>
      ) : (
        <div className="space-y-4">
            <EmployeeOrderElement />
        </div>
      )}
    </div>
  )
}