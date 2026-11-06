import { apiFetch } from "../api.js";
export const listarProductos = (filtros = {}) => apiFetch(`/api/productos?${new URLSearchParams(Object.entries(filtros).filter(([, valor]) => valor !== undefined && valor !== "")).toString()}`);
export const obtenerProducto = (id) => apiFetch(`/api/productos/${id}`);
export const crearProductoApi = (producto) => apiFetch("/api/productos", { method: "POST", body: JSON.stringify(producto) });
export const actualizarProductoApi = (id, producto) => apiFetch(`/api/productos/${id}`, { method: "PUT", body: JSON.stringify(producto) });
export const eliminarProductoApi = (id) => apiFetch(`/api/productos/${id}`, { method: "DELETE" });