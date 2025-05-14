// src/pages/PartsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { fetchSkus, createSku, updateSku, deleteSku } from '@/lib/sku/api'
import { fetchParts, createPart, updatePart, deletePart } from '@/lib/parts/api'
import SKUForm from '../components/SKUForm'
import PartForm from '../components/PartsForm'
import ListWithDelete from '../components/ListWithDelete'
import HeaderWithActions from '../components/HeaderWithActions'

export default function Parts() {
  const [skus, setSkus] = useState<any[]>([])      // State to store SKUs
  const [parts, setParts] = useState<any[]>([])    // State to store Parts
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [tab, setTab] = useState<'skus' | 'parts' | 'inventory'>('skus') // Tab state to toggle between SKUs and Parts

  const [editingSku, setEditingSku] = useState<any | null>(null) // State for SKU currently being edited
  const [editingPart, setEditingPart] = useState<any | null>(null)

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
    loadSkus()
    loadParts()
  }, [])

  const handleSkuSubmit = async (sku_value: string, description: string, size: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      if (editingSku) {
        await updateSku(editingSku.id, { sku_value, description, size }) // Update existing SKU
        setEditingSku(null)
      } else {
        await createSku({ sku_value, description, size }) // Create new SKU
      }
      loadSkus()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to save SKU. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePartSubmit = async (quantity: number, sku_id: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      if (editingPart) {
        await updatePart(editingPart.id, { quantity })
        setEditingPart(null)
      } else {
        await createPart({ quantity, sku_id })
      }
      loadParts()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to save Part. Please try again.')
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

  // Start editing a SKU
  const handleEditSku = (sku: any) => {
    setEditingSku(sku)
    setShowForm(true)
  }

  // Start editing a Part
  const handleEditPart = (part: any) => {
    setEditingPart(part)
    setShowForm(true)
  }

  const handleCreateClick = () => setShowForm(true)
  const handleCancelClick = () => {
    setShowForm(false)
    setEditingSku(null)
    setEditingPart(null)
  }
  const handleDeleteModeToggle = () => setDeleteMode(!deleteMode)

  // Render SKU items
  const renderSku = (sku: any) => (
    <div>
      <strong>SKU: {sku.sku_value}</strong> | Description: {sku.description} | Size: {sku.size}
      <button onClick={() => handleEditSku(sku)} className="text-blue-500 ml-2">Edit</button>
    </div>
  )

  // Render Part items
  const renderPart = (part: any) => (
    <div>
      <strong>Part: {part.name}</strong> | Quantity: {part.quantity} |
      <span> SKU : {part.sku_id}</span>
      <button onClick={() => handleEditPart(part)} className="text-blue-500 ml-2">Edit</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Parts</h1>

      <p className={tab === 'parts' ? 'text-red-600' : 'text-gray-600'}>
        {tab === 'parts' ? 'Remember that Parts require SKUs to work!' : 'View and register SKUs and parts.'}
      </p>

      <div className="flex space-x-4 border-b pb-2 mb-4">
        <button onClick={() => setTab('skus')} className={`${tab === 'skus' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>SKUs</button>
        <button onClick={() => setTab('parts')} className={`${tab === 'parts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Parts</button>

      </div>

      {/* SKUs Tab */}
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
          {errorMessage && <div className="text-red-600 text-sm mt-2">{errorMessage}</div>}
          <ListWithDelete
            items={skus}
            renderItem={renderSku}
            deleteMode={deleteMode}
            onItemSelect={(id) => console.log(`Item selected: ${id}`)}
            onDeleteItem={handleDeleteSku}
          />
        </div>
      )}

      {/* Parts Tab */}
      {tab === 'parts' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <HeaderWithActions
            title="Parts"
            onCreateClick={handleCreateClick}
            onCancelClick={handleCancelClick}
            deleteMode={deleteMode}
            onDeleteModeToggle={handleDeleteModeToggle}
            createButtonLabel={editingPart ? "Update Part" : "Create Part"}
            deleteButtonLabel="Delete Part"
          />
          {showForm && (
            <PartForm
              onSubmit={handlePartSubmit}
              loading={loading}
              onCancel={handleCancelClick}
              availableSkus={skus.map(sku => ({ id: sku.id, sku_value: sku.sku_value }))}
              initialValues={editingPart ? { quantity: editingPart.quantity, sku_id: editingPart.sku_id } : {}}
            />
          )}
          {errorMessage && <div className="text-red-600 text-sm mt-2">{errorMessage}</div>}
          <ListWithDelete
            items={parts}
            renderItem={renderPart}
            deleteMode={deleteMode}
            onItemSelect={(id) => console.log(`Item selected: ${id}`)}
            onDeleteItem={handleDeletePart}
          />
        </div>
      )}

      {/* Inventory Tab */}
      {tab === 'inventory' && <div className="bg-white p-6 rounded-2xl shadow">[TODO: Inventory Table]</div>}
    </div>
  )
}
