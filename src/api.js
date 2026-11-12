const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("sonidoVivo.token");
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const payload = response.status === 204 ? null : contentType.includes("application/json") ? await response.json() : await response.text();
  if (response.status === 401) {
    localStorage.removeItem("sonidoVivo.token");
    localStorage.removeItem("sonidoVivo.sesion");
    if (window.location.pathname !== "/login") window.location.assign("/login");
  }
  if (!response.ok) throw new Error(payload?.message || payload?.error || "No fue posible completar la solicitud.");
  return payload;
}