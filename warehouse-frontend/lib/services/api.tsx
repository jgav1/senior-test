const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchTotalProfit() {
  const res = await fetch(`${API_BASE_URL}/services/total/profit`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch profit');
  
  const data = await res.json();
  return data;
}


export async function fetchOptimizedOrder(){

    const res = await fetch(`${API_BASE_URL}/services/optimized/next_order`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch optimized order');
    return res.json();
}