const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) {
    throw new Error('Falha ao consultar o backend');
  }
  return response.json();
}

export function getApiBaseUrl() {
  return API_BASE_URL || 'http://localhost:3000';
}