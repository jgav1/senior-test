const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchCustomerOrders() {
  const res = await fetch(`${API_BASE_URL}/customer_orders`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch customer_orders');
  return res.json();
}

export async function createCustomerOrders(data: { customer_id: string, description: string, vehicle_id: string }) {
  const res = await fetch(`${API_BASE_URL}/customer_orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create customer');
  return res.json();
}

export async function deleteCustomerOrders(customer_id: string) {
  const res = await fetch(`${API_BASE_URL}/customer_orders/${customer_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete customer');
  return res.json();
}

export async function updateCustomerOrders(customer_id: string, data: { customer_id: string, description: string, vehicle_id: string }) {
  const res = await fetch(`${API_BASE_URL}/customer_orders/${customer_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update customer');
  return res.json();
}