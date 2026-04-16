const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error('Identifiants invalides');
  return response.json();
}

export async function getResource<T>(path: string): Promise<T[]> {
  const response = await fetch(`${API_URL}/api/${path}`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Erreur API');
  const data = (await response.json()) as { data: T[] };
  return data.data;
}

export async function createResource<T>(path: string, payload: object): Promise<T> {
  const response = await fetch(`${API_URL}/api/${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Création impossible');
  const data = (await response.json()) as { data: T };
  return data.data;
}

export async function updateResource(path: string, payload: object): Promise<void> {
  const response = await fetch(`${API_URL}/api/${path}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Mise à jour impossible');
}

export async function deleteResource(path: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/${path}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Suppression impossible');
}
