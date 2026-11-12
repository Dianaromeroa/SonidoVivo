import { apiFetch } from "../api.js";
export const listarPedidos = () => apiFetch("/api/pedidos");
export const obtenerPedido = (id) => apiFetch(`/api/pedidos/${id}`);
export const crearPedidoApi = (items) => apiFetch("/api/pedidos", { method: "POST", body: JSON.stringify({ items }) });
export const cambiarEstadoPedidoApi = (id, estado) => apiFetch(`/api/pedidos/${id}/estado`, { method: "PUT", body: JSON.stringify({ estado }) });