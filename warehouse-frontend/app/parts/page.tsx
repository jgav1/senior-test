// src/pages/PartsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { fetchSkus, createSku, deleteSku} from '@/lib/sku/api'
import { fetchParts,createPart, deletePart } from '@/lib/parts/api'
import SKUForm from   '../components/SKUForm'
import PartForm from '../components/PartsForm'
import ListWithDelete from '../components/ListWithDelete'
import HeaderWithActions from '../components/HeaderWithActions'// src/pages/PartsPage.tsx
// src/pages/PartsPage.tsx


export default function Parts() {
  const [skus, setSkus] = useState<any[]>([])      // State to store SKUs
  const [parts, setParts] = useState<any[]>([])    // State to store Parts
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Error message state
  const [tab, setTab] = useState<'skus' | 'parts' | 'inventory'>('skus') // Tab state to toggle between SKUs and Parts

  // Fetch SKUs from the backend
  const loadSkus = async () => {
    try {
      const data = await fetchSkus()
      setSkus(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch Parts from the backend
  const loadParts = async () => {
    try {
      const data = await fetchParts()
      setParts(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadSkus()  // Load SKUs when the component is mounted
    loadParts() // Load Parts when the component is mounted
  }, [])

  // Handle SKU creation
  const handleSkuSubmit = async (sku_value: string, description: string, size: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      await createSku({ sku_value, description, size })
      loadSkus()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to create SKU. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Part creation
  const handlePartSubmit = async (quantity: number, sku_id: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      await createPart({ quantity, sku_id })
      loadParts()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to create Part. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle SKU deletion
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

  // Handle Part deletion
  const handleDeletePart = async (partId: string) => {
    setLoading(true)
    try {
      await deletePart(partId)
      loadParts()
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

  const renderPart = (part: any) => (
    <div>
      <strong>Part: {part.name}</strong> | Quantity: {part.quantity} | SKU: {part.sku_id}
    </div>
  )

  // Handlers for toggling the form and delete mode
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

      {/* Conditional message */}
      <p className={tab === 'parts' ? 'text-red-600' : 'text-gray-600'}>
        {tab === 'parts'
          ? 'Remember that Parts require SKUs to work!'
          : 'View and register SKUs and parts. Inventory available below.'
        }
      </p>

      <div className="flex space-x-4 border-b pb-2 mb-4">
        <button onClick={() => setTab('skus')} className={`${tab === 'skus' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>SKUs</button>
        <button onClick={() => setTab('parts')} className={`${tab === 'parts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Parts</button>
        <button onClick={() => setTab('inventory')} className={`${tab === 'inventory' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Inventory</button>
      </div>

      {/* Show SKUs tab */}
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

          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
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

      {/* Show Parts tab */}
      {tab === 'parts' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <HeaderWithActions
            title="Parts"
            onCreateClick={handleCreateClick}
            onCancelClick={handleCancelClick}
            deleteMode={deleteMode}
            onDeleteModeToggle={handleDeleteModeToggle}
            createButtonLabel="Create Part"
            deleteButtonLabel="Delete Part"
          />

          {showForm && (
            <PartForm 
              onSubmit={handlePartSubmit}
              loading={loading}
              onCancel={handleCancelClick} 
              availableSkus={skus.map(sku => ({ id: sku.id, sku_value: sku.sku_value }))} // Pass available SKUs to PartForm
            />
          )}

          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}

          <ListWithDelete
            items={parts}
            renderItem={renderPart}
            deleteMode={deleteMode}
            onItemSelect={(id) => console.log(`Item selected: ${id}`)} // Handle item selection if needed
            onDeleteItem={handleDeletePart} // Call delete handler when item is deleted
          />
        </div>
      )}

      {/* Inventory tab */}
      {tab === 'inventory' && (
        <div className="bg-white p-6 rounded-2xl shadow">[TODO: Inventory Table]</div>
      )}
    </div>
  )
}
