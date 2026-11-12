const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const TOKEN_KEY = "sonidoVivo.auth.token";

export class ApiError extends Error {
  constructor(status, message, errors = {}) { super(message); this.status = status; this.errors = errors; }
}

export function obtenerToken() { return localStorage.getItem(TOKEN_KEY) || ""; }
export function guardarToken(token) { localStorage.setItem(TOKEN_KEY, token); }
export function eliminarToken() { localStorage.removeItem(TOKEN_KEY); }

export async function api(path, options = {}) {
  const token = options.token ?? obtenerToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
  });
  if (response.status === 204) return null;
  const body = await response.json().catch(() => ({}));
  if (response.status === 401 && token) window.dispatchEvent(new Event("sonidoVivo:sesion-invalida"));
  if (!response.ok) throw new ApiError(response.status, body.message || "No fue posible completar la solicitud.", body.errors || {});
  return body;
}