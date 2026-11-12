import { apiFetch } from "../api.js";
export const enviarContacto = (datos) => apiFetch("/api/contacto", { method: "POST", body: JSON.stringify(datos) });
export const enviarReparacion = (datos) => apiFetch("/api/reparaciones", { method: "POST", body: JSON.stringify(datos) });
export const listarMensajes = () => apiFetch("/api/mensajes");