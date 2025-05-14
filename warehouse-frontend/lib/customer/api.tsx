const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchCustomers() {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}

export async function createCustomer(data: { email: string, last_name: string, name: string }) {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create customer');
  return res.json();
}

export async function deleteCustomer(customer_id: string) {
  const res = await fetch(`${API_BASE_URL}/customers/${customer_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete customer');
  return res.json();
}

export async function updateCustomer(customer_id: string, data: { email: string, last_name: string, name: string }) {
  const res = await fetch(`${API_BASE_URL}/customers/${customer_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update customer');
  return res.json();
}