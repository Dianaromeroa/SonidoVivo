import { apiFetch } from "../api.js";
export const listarUsuarios = () => apiFetch("/api/usuarios");
export const obtenerUsuario = (id) => apiFetch(`/api/usuarios/${id}`);
export const actualizarUsuarioApi = (id, usuario) => apiFetch(`/api/usuarios/${id}`, { method: "PUT", body: JSON.stringify(usuario) });
export const eliminarUsuarioApi = (id) => apiFetch(`/api/usuarios/${id}`, { method: "DELETE" });