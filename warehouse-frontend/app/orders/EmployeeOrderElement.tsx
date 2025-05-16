'use client'

import {fetchWorkshopOrders, createWorkshopOrders, updateWorkshopOrders, deleteWorkshopOrders, fetchOrderJobs, createWorkshopOrdersJobs, deleteWorkshopOrderJobs} from '@/lib/workshop_order/api'
import {fetchJobs, createJobs, updateJobs, deleteJobs} from '@/lib/jobs/api'
import {fetchCustomerOrders, createCustomerOrders,deleteCustomerOrders,updateCustomerOrders} from '@/lib/customer_order/api'

import { useState, useEffect, use } from 'react';
import HeaderWithActions from '../components/HeaderWithActions';
import WorkshopOrderForm from '../components/WorkshopOrderForm';
import JobForm from '../components/JobForm';
import OrderJobsForm from '../components/OrderJobsForm';
import ListWithDelete from '../components/ListWithDelete';
import OrderJobsRender from '../components/OrderJobsRender';


interface Job {
  jobs_id: string;
  description: string;
  // Add other fields as needed
}

interface OrderJob {
  workshopOrderId: string;
  description: string;
  jobs: Job[];
}

export default function EmployeeOrderElement() {
const [workshoporders, setworkshopOrders] = useState([])
const [jobs, setJobs] = useState([])
const [customerOrders, setCustomerOrders] = useState<any[]>([]) 
const [orderJobs, setOrderJobs] = useState<OrderJob[]>([])
const [skuJobs, setSkuJobs] = useState([]) 

const [loading, setLoading] = useState(false)
const [showForm, setShowForm] = useState(false)
const [deleteMode, setDeleteMode] = useState(false)
const [errorMessage, setErrorMessage] = useState<string | null>(null)
const [tab, setTab] = useState<'workshop_orders' | 'jobs' | 'order_jobs' | 'sku_jobs'>('workshop_orders')  // Tab state to toggle between Workshop Orders, Jobs, Order Jobs, and SKU Jobs

const [editingWorkshopOrder, setEditingWorkshopOrder] = useState<any | null>(null)
const [editingJob, setEditingJob] = useState<any | null>(null)
const [editingOrderJob, setEditingOrderJob] = useState<any | null>(null)
const [editingSkuJob, setEditingSkuJob] = useState<any | null>(null)
const [selectedItemOrderJobId, setSelectedItemOrderJobId] = useState<string | null>(null)
const [orderJobStrings, setOrderJobStrings] = useState<string[]>([
    'Order id: 1 | Job id: job1',
    'Order id: 1 | Job id: job2',
    'Order id: 2 | Job id: job3',
  ]);

  const deleteOrderJobs = (workshop_order_id: string, job_id: string) => {

    deleteWorkshopOrderJobs(workshop_order_id, job_id);


    setOrderJobStrings((prevStrings) =>
      prevStrings.filter(
        (item) =>
          !item.includes(`Order id: ${workshop_order_id}`) ||
          !item.includes(`Job id: ${job_id}`)
      )
    );
    loadOrderJobs();
  };

const convertOrderJobsToStrings = (orderJobs: OrderJob[], workshoporders: { id: string, description: string }[], jobs: { id: string, description: string }[]): string[] => {
  const strings: string[] = [];

  for (let i = 0; i < orderJobs.length; i++) {
    const orderJob = orderJobs[i];

    for (let j = 0; j < orderJob.jobs.length; j++) {
      const job = orderJob.jobs[j];
      const workshopOrder = workshoporders.find((order) => order.id === orderJob.workshopOrderId);
      const jobOrder = jobs.find((x) => x.id === job.jobs_id);
      strings.push(`Workshop description: ${workshopOrder?.description} | Job description: ${jobOrder?.description} | WorkshopOrder id: ${orderJob.workshopOrderId} | Job id: ${job.jobs_id}`);
    }
  }

  return strings;
};

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
      console.log('Jobs:', data)
    } catch (err) {
      console.error(err)
    }
  }
  const loadOrderJobs = async () => {
    try {
      const data = await fetchOrderJobs()
      setOrderJobs(data)
      console.log('Order Jobs:', data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadCustomerOrders()
    loadWorkshopOrders()
    loadJobs()
    loadOrderJobs()
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

const handleJobSubmit = async (
  description: string,
  job_type: string,
  max_days: number,
  total_fixed_cost: number,
  total_profit: number
) => {
  setLoading(true);
  setErrorMessage(null);
  try {
    const data = { description, job_type, max_days, total_fixed_cost, total_profit };
    if (editingJob) {
      await updateJobs(editingJob.id, data);
      setEditingJob(null);
    } else {
      await createJobs(data);
    }
    loadJobs();
    setShowForm(false);
  } catch (err) {
    console.error(err);
    setErrorMessage('Failed to save job');
  } finally {
    setLoading(false);
  }
};

const handleOrderJobSubmit = async (workshop_order_id: string, job_id: string) => {
  setLoading(true);
  setErrorMessage(null);
  try {
    const data = { workshop_order_id, job_id };
    if (editingOrderJob) {
      //await updateWorkshopOrdersJobs(workshop_order_id, job_id);
      setEditingOrderJob(null);
    } else {
      await createWorkshopOrdersJobs(data);
    }
    loadWorkshopOrders();
    loadJobs();
    loadOrderJobs();
    setShowForm(false);
  } catch (err) {
    console.error(err);
    setErrorMessage('Failed to save order job');
  } finally {
    setLoading(false);
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

  const handleDeleteOrderJob = async (workshop_order_id: string, job_id: string) => {
    if(!editingOrderJob){
          setLoading(true)
    try {
      await deleteWorkshopOrderJobs(workshop_order_id, job_id)
      loadOrderJobs()
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to delete order job')
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

const renderWorkshopOrders = (workshop: any) => {
  return (
    <div>
      <h2 className="text-lg font-bold">Workshop Id: {workshop.id}</h2>
      <span>| Customer Order Id: {workshop.customer_order_id}</span>
      <span>| Description: {workshop.description}</span>
      <span>| Max Days to complete: {workshop.max_days}</span>
      <span>| State: {workshop.state}</span>
      {!editingWorkshopOrder && (
        <button onClick={() => handleDeleteWorkshopOrder(workshop.id)} className="text-red-500 ml-2">
          Delete
        </button>
      )}
    </div>
  );
};

const renderJobs = (jobs: any) => {
  return (
    <div>
      <h2 className="text-lg font-bold">Job Id: {jobs.id}</h2>
      <span>| Description: {jobs.description}</span>
      <span>| Job Type: {jobs.job_type}</span>
      <span>| Max Days to complete: {jobs.max_days}</span>
      <span>| Total Fixed Cost: {jobs.total_fixed_cost}</span>
      <span>| Total Profit: {jobs.total_profit}</span>
            {!editingJob && (
        <button onClick={() => handleDeleteJob(jobs.id)} className="text-red-500 ml-2">
          Delete
        </button>
      )}
    </div>
  );
};

const renderOrderJobs = (orderJob: OrderJob) => {
  return (
    <div>
      <h2 className="text-lg font-bold">Workshop Order Id: {orderJob.workshopOrderId}</h2>
      {orderJob.jobs.map((job) => (
        <div key={job.id}>
          <span>| Job Id: {job.id}</span>
        </div>
      ))}
    </div>
  );
};

const returnWorkShopTab = () => {
  return (
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
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ListWithDelete
        items={workshoporders}
        renderItem={renderWorkshopOrders}
        deleteMode={deleteMode}
        onItemSelect={(id) => console.log(`Item selected: ${id}`)}
        onDeleteItem={handleDeleteWorkshopOrder}
      />
    </div>
  );
};

const returnJobsTab = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <HeaderWithActions
        title="Jobs"
        onCreateClick={handleCreateClick}
        onCancelClick={handleCancelClick}
        deleteMode={deleteMode}
        onDeleteModeToggle={handleDeleteModeToggle}
        createButtonLabel="Create Job"
        deleteButtonLabel="Delete Job"
      />
      {showForm && (
        <JobForm
          onSubmit={handleJobSubmit}
          loading={loading}
          onCancel={handleCancelClick}
        />
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <ListWithDelete
        items={jobs}
        renderItem={renderJobs}
        deleteMode={deleteMode}
        onItemSelect={(id) => console.log(`Item selected: ${id}`)}
        onDeleteItem={handleDeleteJob}
      />
      
    </div>
  );
};

const returnOrderJobsTab = () => {  
 
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <HeaderWithActions
        title="Order Jobs"
        onCreateClick={handleCreateClick}
        onCancelClick={handleCancelClick}
        deleteMode={deleteMode}
        onDeleteModeToggle={handleDeleteModeToggle}
        createButtonLabel="Create Order Job"
        deleteButtonLabel="Delete Order Job"
      />
      {showForm && (
        <OrderJobsForm
          onSubmit={handleOrderJobSubmit}
          loading={loading}
          onCancel={handleCancelClick}
          workshopOrders={workshoporders}
          jobs={jobs}
        />
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <OrderJobsRender
        orderJobStrings={convertOrderJobsToStrings(orderJobs, workshoporders, jobs)}
        deleteWorkshopOrderJobs={deleteOrderJobs}
      />

    </div>
  );
}



  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Employee Order Management</h1>
            <div className="flex space-x-4 border-b pb-2 mb-4">
        <button onClick={() => setTab('workshop_orders')} className={`${tab === 'workshop_orders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Workshop Orders</button>
        <button onClick={() => setTab('jobs')} className={`${tab === 'jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Jobs</button>
        <button onClick={() => setTab('order_jobs')} className={`${tab === 'order_jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>Order Jobs</button>
        {/*<button onClick={() => setTab('sku_jobs')} className={`${tab === 'sku_jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} pb-1 font-semibold`}>SKU Jobs</button>*/}
      </div>

      {/* Workshop Orders Tab */}
      {tab === 'workshop_orders' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          {returnWorkShopTab()}
        </div>
      )}

      {/* Jobs Tab */}
      {tab === 'jobs' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          {returnJobsTab()}
        </div>
      )}

      {/* Order Jobs Tab */}
      {tab === 'order_jobs' && (
        <div className="bg-white p-6 rounded-2xl shadow">
          {returnOrderJobsTab()}
        </div>
      )}

      {/* SKU Jobs Tab */}

    </div>
  )
}