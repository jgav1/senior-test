const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchVehicles() {
  const res = await fetch(`${API_BASE_URL}/vehicles`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch vehicles');
  return res.json();
}

export async function createVehicle(data: { make: string, model: string, year: number }) {
  const res = await fetch(`${API_BASE_URL}/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create vehicle');
  return res.json();
}

export async function deleteVehicle(vehicle_id: string) {
  const res = await fetch(`${API_BASE_URL}/vehicles/${vehicle_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete vehicle');
  return res.json();
}

export async function updateVehicle(vehicle_id: string, data: { make: string, model: string, year: number }) {
  const res = await fetch(`${API_BASE_URL}/vehicles/${vehicle_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update vehicle');
  return res.json();
}

export async function fetchVehicleTypes() {
  const res = await fetch(`${API_BASE_URL}/vehicle_types`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch vehicle types');
  return res.json();
}
export async function createVehicleType(data: { name: string }) {
  const res = await fetch(`${API_BASE_URL}/vehicle_types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create vehicle type');
  return res.json();
}
export async function deleteVehicleType(vehicle_type_id: string) {
  const res = await fetch(`${API_BASE_URL}/vehicle_types/${vehicle_type_id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete vehicle type');
  return res.json();
}
export async function updateVehicleType(vehicle_type_id: string, data: { name: string }) {
  const res = await fetch(`${API_BASE_URL}/vehicle_types/${vehicle_type_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update vehicle type');
  return res.json();
}