// src/pages/PartsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { fetchSkus, createSku, deleteSku } from '@/lib/api'
import SKUForm from '../components/SKUForm'
import ListWithDelete from '../components/ListWithDelete'

export default function Parts() {
  const [skus, setSkus] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [tab, setTab] = useState<'skus' | 'parts' | 'inventory'>('skus')

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
    try {
      await createSku({ sku_value, description, size })
      loadSkus()
      setShowForm(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSku = async (skuId: string) => {
    setLoading(true)
    try {
      await deleteSku(skuId)
      loadSkus()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setDeleteMode(false)
    }
  }

  const renderSku = (sku: any) => (
    <div>
      <strong>SKU: {sku.sku_value}</strong> | Description: {sku.description} | Size: {sku.size}
    </div>
  )

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
            <button
              onClick={() => setDeleteMode(!deleteMode)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              {deleteMode ? 'Cancel Delete' : 'Delete SKU'}
            </button>
          </div>

          {showForm && (
            <SKUForm 
              onSubmit={handleSkuSubmit}
              loading={loading}
              onCancel={() => setShowForm(false)} 
            />
          )}

          <ListWithDelete
            items={skus}
            renderItem={renderSku}
            deleteMode={deleteMode}
            onItemSelect={(id) => console.log(`Item selected: ${id}`)} // Handle item selection if needed
            onDeleteItem={handleDeleteSku} // Call delete handler when item is deleted
          />
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
