const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export async function fetchJobs() {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}
export async function createJobs(data: { description: string, job_type: string, max_days: string, total_fixed_cost: string, total_profit: string }) {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create jobs');
  return res.json();
}
export async function deleteJobs(job_id: string) {
  const res = await fetch(`${API_BASE_URL}/jobs/${job_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete jobs');
  return res.json();
}
export async function updateJobs(job_id: string, data: { description: string, job_type: string, max_days: string, total_fixed_cost: string,total_profit: string}) {
  const res = await fetch(`${API_BASE_URL}/jobs/${job_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update jobs');
  return res.json();
}