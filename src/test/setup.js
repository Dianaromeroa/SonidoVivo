import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => localStorage.clear());
afterEach(() => cleanup());

vi.mock("../services/sonidoVivoApi.js", () => ({
  login: vi.fn(async () => ({ token: "token-prueba", usuario: { id: 1, nombre: "Ana", correo: "ana@sonidovivo.cl", rol: "CLIENTE", telefono: "", direccion: "", comuna: "", region: "" } })),
  registrar: vi.fn(async () => ({ id: 2, nombre: "Ana", correo: "ana@sonidovivo.cl", rol: "CLIENTE", telefono: "", direccion: "", comuna: "", region: "" })),
  listarProductos: vi.fn(async () => []), listarMisPedidos: vi.fn(async () => []), listarPedidosGestion: vi.fn(async () => []), crearProducto: vi.fn(async (producto) => ({ ...producto, apiId: 1 })), actualizarProducto: vi.fn(async (producto) => producto), eliminarProducto: vi.fn(async () => null), crearPedido: vi.fn(async () => ({ id: "SV-PRUEBA", apiId: 1, fecha: new Date().toISOString(), fechaActualizacion: new Date().toISOString(), estado: "Confirmado", total: 0, cliente: { nombre: "Ana", correo: "ana@sonidovivo.cl" }, items: [], historial: [] })), actualizarEstadoPedido: vi.fn(async () => null), seguimientoPedido: vi.fn(), enviarContacto: vi.fn(async () => ({})), enviarReparacion: vi.fn(async () => ({ id: 1 })), listarMensajes: vi.fn(async () => []), responderMensaje: vi.fn(async (mensaje, respuesta) => ({ ...mensaje, respuesta, estado: "Respondido" })),
}));