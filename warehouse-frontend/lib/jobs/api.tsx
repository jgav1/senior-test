const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export async function fetchJobs() {
  const res = await fetch(`${API_BASE_URL}/workshop_orders`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch workshop_orders');
  return res.json();
}
export async function createJobs(data: { description: string, job_type: string, max_days: string, total_fixed_cost: string,total_profit: string }) {
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
export async function deleteJobs(workshop_order_id: string) {
  const res = await fetch(`${API_BASE_URL}/workshop_orders/${workshop_order_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete workshop_orders');
  return res.json();
}
export async function updateJobs(workshop_order_id: string, data: { description: string, job_type: string, max_days: string, total_fixed_cost: string,total_profit: string}) {
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