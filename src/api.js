// Same-origin, cookie-based authentication. No client-side session simulation.
const base = import.meta.env.VITE_API_BASE_URL || '/api';
export class ApiError extends Error { constructor(message, status) { super(message); this.status = status; } }
export async function request(path, data) {
  let response;
  try { response = await fetch(`${base}${path}`, { method: data ? 'POST' : 'GET', credentials: 'include', headers: { Accept: 'application/json', ...(data ? { 'Content-Type': 'application/json' } : {}) }, ...(data ? { body: JSON.stringify(data) } : {}), signal: AbortSignal.timeout(15000) }); }
  catch { throw new ApiError('Unable to reach authentication. Please try again later.', 0); }
  if (!(response.headers.get('content-type') || '').includes('application/json')) throw new ApiError('Authentication service is not configured yet. Please contact your organizer.', 503);
  const body = await response.json();
  if (!response.ok) throw new ApiError(body.message || 'The request could not be completed.', response.status);
  return body;
}
