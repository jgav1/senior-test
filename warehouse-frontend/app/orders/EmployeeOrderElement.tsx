'use client'

import {fetchWorkshopOrders, createWorkshopOrders, updateWorkshopOrders, deleteWorkshopOrders} from '@/lib/workshop_order/api'
import {fetchJobs, createJobs, updateJobs, deleteJobs} from '@/lib/jobs/api'
import {fetchCustomerOrders, createCustomerOrders,deleteCustomerOrders,updateCustomerOrders} from '@/lib/customer_order/api'

import { useState, useEffect, use } from 'react';
import HeaderWithActions from '../components/HeaderWithActions';
import WorkshopOrderForm from '../components/WorkshopOrderForm';






export default function EmployeeOrderElement() {
const [workshoporders, setworkshopOrders] = useState([])
const [jobs, setJobs] = useState([])
const [customerOrders, setCustomerOrders] = useState<any[]>([])  

const [loading, setLoading] = useState(false)
const [showForm, setShowForm] = useState(false)
const [deleteMode, setDeleteMode] = useState(false)
const [errorMessage, setErrorMessage] = useState<string | null>(null)
const [tab, setTab] = useState<'workshop_orders' | 'jobs' | 'order_jobs' | 'sku_jobs'>('workshop_orders')  // Tab state to toggle between Workshop Orders, Jobs, Order Jobs, and SKU Jobs

const [editingWorkshopOrder, setEditingWorkshopOrder] = useState<any | null>(null)
const [editingJob, setEditingJob] = useState<any | null>(null)

const loadCustomerOrders = async () => {
  try {
    const data = await fetchCustomerOrders()
    setCustomerOrders(data)
  } catch (err) {
    console.error(err)
  }
}

 const loadWorkshopOrders = async () => {
    try {
      const data = await fetchWorkshopOrders()
      setworkshopOrders(data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadJobs = async () => {
    try {
      const data = await fetchJobs()
      setJobs(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadCustomerOrders()
    loadWorkshopOrders()
    loadJobs()
  }, [])

  const handleWorkshopOrderSubmit = async (data: { customer_order_id: string, description: string, max_days: string, state: string, total_fixed_cost: string, total_profit: string, total_variable_cost: string }) => {
   setLoading(true)
   setErrorMessage(null)
    try {
      if (editingWorkshopOrder) {
        await updateWorkshopOrders(editingWorkshopOrder.id, data)
        setEditingWorkshopOrder(null)
      } else {
        await createWorkshopOrders(data)
      }
      loadWorkshopOrders()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to save workshop order')
    } finally {
      setLoading(false)
    }

  }

  const handleJobSubmit = async (data: { description: string, job_type: string, max_days: string, total_fixed_cost: string,total_profit: string }) => {
    setLoading(true)
    setErrorMessage(null)
    try {
      if (editingJob) {
        await updateJobs(editingJob.id, data)
        setEditingJob(null)
      } else {
        await createJobs(data)
      }
      loadJobs()
      setShowForm(false)
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to save job')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteWorkshopOrder = async (workshop_order_id: string) => {
    if(!editingWorkshopOrder){
          setLoading(true)
    try {
      await deleteWorkshopOrders(workshop_order_id)
      loadWorkshopOrders()
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to delete workshop order')
    } finally {
      setLoading(false)
      setDeleteMode(false)
    }

  }
}

  const handleDeleteJob = async (job_id: string) => {
    if(!editingJob){
          setLoading(true)
    try {
      await deleteJobs(job_id)
      loadJobs()
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to delete job')
    } finally {
      setLoading(false)
      setDeleteMode(false)
    }

  }
  }

  const handleCreateClick = () => setShowForm(true)
  const handleCancelClick = () => {
    setShowForm(false)
    setEditingWorkshopOrder(null)
    setEditingJob(null)
  }
  const handleDeleteModeToggle = () => setDeleteMode(!deleteMode)

  const renderWorkshopOrders = (workshop:any) => {
    <div>
      <h2 className="text-lg font-bold">Customer Order Id:{workshop.customer_order_id}</h2>
      Description: {workshop.description}
      Max Days to complete: {workshop.max_days}
      State: {workshop.state}
      Total Fixed Cost: {workshop.total_fixed_cost}
      Total Profit: {workshop.total_profit}
      Total Variable Cost: {workshop.total_variable_cost}
    </div>

  }

  const renderJobs = (job:any) => {
    <div>
      <h2 className="text-lg font-bold">Job Id:{job.id}</h2>
      Description: {job.description}
      Job Type: {job.job_type}
      Max Days to complete: {job.max_days}
      Total Fixed Cost: {job.total_fixed_cost}
      Total Profit: {job.total_profit}
    </div>

  }



  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Employee Order Management</h1>
            <div className="flex space-x-4 border-b pb-2 mb-4">
        <button onClick={() => setTab('workshop_orders')} className={`${tab === 'workshop_orders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Workshop Orders</button>
        <button onClick={() => setTab('jobs')} className={`${tab === 'jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Jobs</button>
        <button onClick={() => setTab('order_jobs')} className={`${tab === 'order_jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Order Jobs</button>
        <button onClick={() => setTab('sku_jobs')} className={`${tab === 'sku_jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>SKU Jobs</button>
      </div>

      {/* Workshop Orders Tab */}
      {tab === 'workshop_orders' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <HeaderWithActions
            title="Workshop Orders"
            onCreateClick={handleCreateClick}
            onCancelClick={handleCancelClick}
            deleteMode={deleteMode}
            onDeleteModeToggle={handleDeleteModeToggle}
            createButtonLabel="Create Workshop Order"
            deleteButtonLabel="Delete Workshop Order"
          />
          {showForm && (
            <WorkshopOrderForm
            onSubmit={handleWorkshopOrderSubmit}
            loading={loading}
            onCancel={handleCancelClick}
            customerOrders={customerOrders}           
            />
            )}
        </div>
      )}

    </div>
  )
}