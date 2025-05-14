const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchParts() {
  const res = await fetch(`${API_BASE_URL}/parts`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch parts');
  return res.json();
}
export async function createPart(data: { quantity: number, sku_id: string}) {
  const res = await fetch(`${API_BASE_URL}/parts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create part');
  return res.json();
}
export async function deletePart(item_id: string) {
  const res = await fetch(`${API_BASE_URL}/parts/${item_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete part');
  return res.json();
}

export async function updatePart(item_id: string, data: { quantity: number}) {
  const res = await fetch(`${API_BASE_URL}/parts/${item_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update part');
  return res.json();
}