const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export async function fetchWorkshopOrders() {
  const res = await fetch(`${API_BASE_URL}/workshop_orders`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch workshop_orders');
  return res.json();
}
export async function createWorkshopOrders(data: { customer_order_id: string, description: string, max_days: string, state: string, total_fixed_cost: string, total_profit: string, total_variable_cost: string }) {
  const res = await fetch(`${API_BASE_URL}/workshop_orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create workshop_orders');
  return res.json();
}
export async function deleteWorkshopOrders(workshop_order_id: string) {
  const res = await fetch(`${API_BASE_URL}/workshop_orders/${workshop_order_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete workshop_orders');
  return res.json();
}
export async function updateWorkshopOrders(workshop_order_id: string, data: { customer_order_id: string, description: string, max_days: string, state: string, total_fixed_cost: string, total_profit: string, total_variable_cost: string }) {
  const res = await fetch(`${API_BASE_URL}/workshop_orders/${workshop_order_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update workshop_orders');
  return res.json();
}

export async function fetchOrderJob(workshop_order_id: string) {
  const res = await fetch(`${API_BASE_URL}/workshop_orders/${workshop_order_id}/jobs`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch order_jobs');
  return res.json();
}


export async function fetchOrderJobs() {
  try {
    // Fetch all workshop orders
    const workshopOrders = await fetchWorkshopOrders();

    // Create an array to store the jobs for each workshop order
    const allOrderJobs = await Promise.all(
      workshopOrders.map(async (workshopOrder: { id: string }) => {
        // Fetch jobs for each workshop order using its id
        const jobs = await fetchOrderJob(workshopOrder.id);
        return { workshopOrderId: workshopOrder.id, jobs }; // Store the relationship between workshop order and jobs
      })
    );

    return allOrderJobs; // This will be an array of objects with workshopOrderId and associated jobs
  } catch (error) {
    console.error("Error fetching order jobs:", error);
    throw error; // Propagate the error if necessary
  }
}

export async function createWorkshopOrdersJobs(data: { workshop_order_id: string, job_id: string }) {

    const response = await fetch(`${API_BASE_URL}/workshop_orders/${data.workshop_order_id}/jobs/${data.job_id}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobs_id: data.job_id,  
        workshop_orders_id: data.workshop_order_id,  
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create workshop order job: ${response.statusText}`);
    }
}


export async function deleteWorkshopOrderJobs(workshop_order_id: string, job_id: string) {
  const res = await fetch(`${API_BASE_URL}/workshop_orders/${workshop_order_id}/jobs/${job_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete workshop order jobs');
  return res.json();
}
