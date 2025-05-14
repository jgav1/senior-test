// warehouse-frontend/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchSkus() {
  const res = await fetch(`${API_BASE_URL}/skus`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch SKUs');
  return res.json();
}

export async function createSku(data: { sku_value: string; description: string, size: string }) {
  const res = await fetch(`${API_BASE_URL}/skus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create SKU');
  return res.json();
}

export async function deleteSku(item_id: string) {
  const res = await fetch(`${API_BASE_URL}/skus/${item_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete SKU');
  return res.json();
}

export async function updateSku(item_id: string, data: { sku_value: string; description: string, size: string }) {
  const res = await fetch(`${API_BASE_URL}/skus/${item_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update SKU');
  return res.json();
}