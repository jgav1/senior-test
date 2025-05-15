'use client'

import { useEffect, useState } from 'react'
import { fetchCustomers, createCustomer, deleteCustomer, updateCustomer } from '@/lib/customer/api'
import { fetchVehicles, createVehicle, deleteVehicle, updateVehicle, fetchVehicleTypes, createVehicleType, deleteVehicleType, updateVehicleType } from '@/lib/vehicle/api'
import CustomerForm from '../components/CustomerForm'
import VehicleTypeForm from '../components/VehicleTypeForm'
import VehicleForm from '../components/VehicleForm'
import ListWithDelete from '../components/ListWithDelete'
import HeaderWithActions from '../components/HeaderWithActions'

export default function Parts() {
  const [customers, setCustomers] = useState<any[]>([])    // State to store Customers
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([])    // State to store Vehicle Types
  const [vehicles, setVehicles] = useState<any[]>([])    // State to store Vehicles
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [tab, setTab] = useState<'customers' | 'vehicle_types' | 'vehicles'>('customers')  // Tab state to toggle between Customer, Vehicle Type, and Vehicle

  const [editingCustomer, setEditingCustomer] = useState<any | null>(null) // State for Customer currently being edited
  const [editingVehicleType, setEditingVehicleType] = useState<any | null>(null) // State for VehicleType currently being edited
  const [editingVehicle, setEditingVehicle] = useState<any | null>(null) // State for Vehicle currently being edited

  // Fetch Customers from the backend
  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers()
      setCustomers(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch Vehicle Types from the backend
  const loadVehicleTypes = async () => {
    try {
      const data = await fetchVehicleTypes()
      setVehicleTypes(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch Vehicles from the backend
  const loadVehicles = async () => {
    try {
      const data = await fetchVehicles()
      setVehicles(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadCustomers()
    loadVehicleTypes()
    loadVehicles()
  }, [])

  // Handle Customer creation
  const handleCustomerSubmit = async (email: string, last_name: string, name: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, { email, last_name, name }) // Update existing Customer
        setEditingCustomer(null)
      } else {
        await createCustomer({ email, last_name, name }) // Create new Customer
      }
      loadCustomers()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to save Customer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Vehicle Type creation
  const handleVehicleTypeSubmit = async (color: string, company: string, model: string, version: string, year: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      if (editingVehicleType) {
        await updateVehicleType(editingVehicleType.id, { color, company, model, version, year }) // Update existing Vehicle Type
        setEditingVehicleType(null)
      } else {
        await createVehicleType({ color, company, model, version, year }) // Create new Vehicle Type
      }
      loadVehicleTypes()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to save Vehicle Type. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Vehicle creation
  const handleVehicleSubmit = async (customer_id: string, license_plate: string, vehicle_type_id: string, vin: string) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, { customer_id, license_plate, vehicle_type_id, vin }) // Update existing Vehicle
        setEditingVehicle(null)
      } else {
        await createVehicle({ customer_id, license_plate, vehicle_type_id, vin }) // Create new Vehicle
      }
      loadVehicles()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to save Vehicle. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Customer deletion
  const handleDeleteCustomer = async (customerId: string) => {
    if (!editingCustomer) { // Only allow delete if not in edit mode
      setLoading(true)
      try {
        await deleteCustomer(customerId)
        loadCustomers()
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        setDeleteMode(false)
      }
    }
  }

  // Handle Vehicle Type deletion
  const handleDeleteVehicleType = async (vehicleTypeId: string) => {
    if (!editingVehicleType) { // Only allow delete if not in edit mode
      setLoading(true)
      try {
        await deleteVehicleType(vehicleTypeId)
        loadVehicleTypes()
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        setDeleteMode(false)
      }
    }
  }

  // Handle Vehicle deletion
  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!editingVehicle) { // Only allow delete if not in edit mode
      setLoading(true)
      try {
        await deleteVehicle(vehicleId)
        loadVehicles()
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        setDeleteMode(false)
      }
    }
  }

  const handleCreateClick = () => setShowForm(true)
  const handleCancelClick = () => {
    setShowForm(false)
    setEditingCustomer(null)
    setEditingVehicleType(null)
    setEditingVehicle(null)
  }
  const handleDeleteModeToggle = () => setDeleteMode(!deleteMode)

  // Render Customer items
  const renderCustomer = (customer: any) => (
    <div>
      <strong>{customer.name}</strong> | Email: {customer.email} | Last Name: {customer.last_name}
      
      {!editingCustomer && (
        <button onClick={() => handleDeleteCustomer(customer.id)} className="text-red-500 ml-2">Delete</button>
      )}
    </div>
  )

  // Render Vehicle Type items
  const renderVehicleType = (vehicleType: any) => (
    <div>
      <strong>{vehicleType.model}</strong> | Company: {vehicleType.company} | Color: {vehicleType.color}
      
      {!editingVehicleType && (
        <button onClick={() => handleDeleteVehicleType(vehicleType.id)} className="text-red-500 ml-2">Delete</button>
      )}
    </div>
  )

  // Render Vehicle items
  const renderVehicle = (vehicle: any) => (
    <div>
      <strong>{vehicle.vin}</strong> | License Plate: {vehicle.license_plate} | Customer ID: {vehicle.customer_id}
      
      {!editingVehicle && (
        <button onClick={() => handleDeleteVehicle(vehicle.id)} className="text-red-500 ml-2">Delete</button>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders Management</h1>

      <div className="flex space-x-4 border-b pb-2 mb-4">
        <button onClick={() => setTab('customers')} className={`${tab === 'customers' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Customers</button>
        <button onClick={() => setTab('vehicle_types')} className={`${tab === 'vehicle_types' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Vehicle Types</button>
        <button onClick={() => setTab('vehicles')} className={`${tab === 'vehicles' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Vehicles</button>
      </div>

      {/* Customers Tab */}
      {tab === 'customers' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <HeaderWithActions
            title="Customers"
            onCreateClick={handleCreateClick}
            onCancelClick={handleCancelClick}
            deleteMode={deleteMode}
            onDeleteModeToggle={handleDeleteModeToggle}
            createButtonLabel="Create Customer"
            deleteButtonLabel="Delete Customer"
          />
          {showForm && (
            <CustomerForm
              onSubmit={handleCustomerSubmit}
              loading={loading}
              onCancel={handleCancelClick}
            />
          )}
          {errorMessage && <div className="text-red-600 text-sm mt-2">{errorMessage}</div>}
          <ListWithDelete
            items={customers}
            renderItem={renderCustomer}
            deleteMode={deleteMode}
            onItemSelect={(id) => console.log(`Item selected: ${id}`)}
            onDeleteItem={handleDeleteCustomer}
          />
        </div>
      )}

      {/* Vehicle Types Tab */}
      {tab === 'vehicle_types' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <HeaderWithActions
            title="Vehicle Types"
            onCreateClick={handleCreateClick}
            onCancelClick={handleCancelClick}
            deleteMode={deleteMode}
            onDeleteModeToggle={handleDeleteModeToggle}
            createButtonLabel="Create Vehicle Type"
            deleteButtonLabel="Delete Vehicle Type"
          />
          {showForm && (
            <VehicleTypeForm
              onSubmit={handleVehicleTypeSubmit}
              loading={loading}
              onCancel={handleCancelClick}
            />
          )}
          {errorMessage && <div className="text-red-600 text-sm mt-2">{errorMessage}</div>}
          <ListWithDelete
            items={vehicleTypes}
            renderItem={renderVehicleType}
            deleteMode={deleteMode}
            onItemSelect={(id) => console.log(`Item selected: ${id}`)}
            onDeleteItem={handleDeleteVehicleType}
          />
        </div>
      )}

      {/* Vehicles Tab */}
      {tab === 'vehicles' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <HeaderWithActions
            title="Vehicles"
            onCreateClick={handleCreateClick}
            onCancelClick={handleCancelClick}
            deleteMode={deleteMode}
            onDeleteModeToggle={handleDeleteModeToggle}
            createButtonLabel="Create Vehicle"
            deleteButtonLabel="Delete Vehicle"
          />
          {showForm && (
            <VehicleForm
              onSubmit={handleVehicleSubmit}
              loading={loading}
              onCancel={handleCancelClick}
              customers={customers}
              vehicleTypes={vehicleTypes}
            />
          )}
          {errorMessage && <div className="text-red-600 text-sm mt-2">{errorMessage}</div>}
          <ListWithDelete
            items={vehicles}
            renderItem={renderVehicle}
            deleteMode={deleteMode}
            onItemSelect={(id) => console.log(`Item selected: ${id}`)}
            onDeleteItem={handleDeleteVehicle}
          />
        </div>
      )}
    </div>
  )
}
