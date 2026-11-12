import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StoreProvider, useStore } from "./StoreContext.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

const producto = { id: "GA001", apiId: 1, nombre: "Guitarra", categoria: "Guitarras", marca: "Yamaha", modelo: "F310", precio: 129990, stock: 8, descripcion: "Prueba", oferta: false };
const pedido = { id: "SV-ABC123", apiId: 9, fecha: "2026-10-14T10:00:00.000Z", estado: "Confirmado", cliente: { nombre: "Ana", correo: "ana@sonidovivo.cl" }, items: [], total: 1000, historial: [{ estado: "Confirmado", fecha: "2026-10-14T10:00:00.000Z" }] };
vi.mock("../services/sonidoVivoApi.js", () => ({
  login: vi.fn(async () => ({ token: "demo", usuario: { nombre: "Ana", correo: "ana@sonidovivo.cl", rol: "CLIENTE" } })), registrar: vi.fn(), listarProductos: vi.fn(async () => [producto]), listarMisPedidos: vi.fn(async () => [pedido]), listarPedidosGestion: vi.fn(async () => [pedido]), crearProducto: vi.fn(async (item) => ({ ...producto, ...item, apiId: 2 })), actualizarProducto: vi.fn(async (item) => item), eliminarProducto: vi.fn(async () => null), crearPedido: vi.fn(async () => pedido), actualizarEstadoPedido: vi.fn(async () => ({ ...pedido, estado: "Preparación" })),
}));

const wrapper = ({ children }) => <AuthProvider><StoreProvider>{children}</StoreProvider></AuthProvider>;

describe("StoreContext conectado a API", () => {
  it("carga catálogo remoto y conserva el carrito temporal por cliente", async () => {
    const { result } = renderHook(() => ({ tienda: useStore(), auth: useAuth() }), { wrapper });
    await waitFor(() => expect(result.current.tienda.productos).toEqual([producto]));
    await act(async () => { await result.current.auth.iniciarSesion("ana@sonidovivo.cl", "demo"); });
    act(() => { result.current.tienda.agregarAlCarrito(producto, 2); });
    await waitFor(() => expect(result.current.tienda.carrito).toEqual([expect.objectContaining({ id: "GA001", cantidad: 2 })]));
    expect(JSON.parse(localStorage.getItem("sonidoVivo.carrito.ana@sonidovivo.cl"))).toHaveLength(1);
  });

  it("crea productos usando la API y conserva el código visual", async () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    await waitFor(() => expect(result.current.productos).toHaveLength(1));
    let creado; await act(async () => { creado = await result.current.crearProducto({ ...producto, id: "te001", nombre: "Teclado", precio: "299990", stock: "4", imagen: "" }); });
    expect(creado).toMatchObject({ ok: true, producto: { id: "te001" } });
  });
});