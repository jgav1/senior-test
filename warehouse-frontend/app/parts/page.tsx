// src/pages/PartsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { fetchSkus, createSku } from '@/lib/api'
import SKUForm from '../components/SKUForm'

export default function Parts() {
  const [skus, setSkus] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [tab, setTab] = useState<'skus' | 'parts' | 'inventory'>('skus')
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // State for error message

  const loadSkus = async () => {
    try {
      const data = await fetchSkus()
      setSkus(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadSkus()
  }, [])

  const handleSkuSubmit = async (sku_value: string, description: string, size: string) => {
    setLoading(true)
    setErrorMessage(null) // Reset error message before each submission attempt
    try {
      await createSku({ sku_value, description, size })
      loadSkus()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to create SKU') // Set error message if API call fails
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Parts</h1>
      <p className="text-gray-600">View and register SKUs and parts. Inventory available below.</p>

      <div className="flex space-x-4 border-b pb-2 mb-4">
        <button onClick={() => setTab('skus')} className={`${tab === 'skus' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>SKUs</button>
        <button onClick={() => setTab('parts')} className={`${tab === 'parts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Parts</button>
        <button onClick={() => setTab('inventory')} className={`${tab === 'inventory' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Inventory</button>
      </div>

      {tab === 'skus' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">SKUs</h2>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create SKU
              </button>
            ) : (
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>

          {showForm && (
            <SKUForm 
              onSubmit={handleSkuSubmit}
              loading={loading}
              onCancel={() => setShowForm(false)} 
            />
          )}

          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}

          <ul className="space-y-2">
            {skus.map((sku) => (
              <li key={sku.id} className="border-b pb-2">
                <strong>SKU: {sku.sku_value}</strong> | Description: {sku.description} | Size: {sku.size}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'parts' && (
        <div className="bg-white p-6 rounded-2xl shadow">[TODO: List of Parts]</div>
      )}

      {tab === 'inventory' && (
        <div className="bg-white p-6 rounded-2xl shadow">[TODO: Inventory Table]</div>
      )}
    </div>
  )
}
