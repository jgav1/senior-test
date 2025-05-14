// src/pages/PartsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { fetchSkus, createSku, deleteSku } from '@/lib/api'
import SKUForm from '../components/SKUForm'
import ListWithDelete from '../components/ListWithDelete'
import HeaderWithActions from '../components/HeaderWithActions'

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

  const handleCreateClick = () => {
    setShowForm(true)
  }

  const handleCancelClick = () => {
    setShowForm(false)
  }

  const handleDeleteModeToggle = () => {
    setDeleteMode(!deleteMode)
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
          <HeaderWithActions
            title="SKUs"
            onCreateClick={handleCreateClick}
            onCancelClick={handleCancelClick}
            deleteMode={deleteMode}
            onDeleteModeToggle={handleDeleteModeToggle}
            createButtonLabel="Create SKU"
            deleteButtonLabel="Delete SKU"
          />

          {showForm && (
            <SKUForm 
              onSubmit={handleSkuSubmit}
              loading={loading}
              onCancel={handleCancelClick} 
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
