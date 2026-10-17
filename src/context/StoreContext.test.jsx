import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreProvider, useStore } from "./StoreContext.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

const producto = { id: "GA001", nombre: "Guitarra", categoria: "Guitarras", marca: "Yamaha", modelo: "F310", precio: 129990, stock: 8, descripcion: "Prueba", oferta: false };
const wrapper = ({ children }) => <AuthProvider><StoreProvider>{children}</StoreProvider></AuthProvider>;

describe("StoreContext: CRUD de productos", () => {
  it("crea productos normalizados y rechaza un código duplicado", async () => {
    localStorage.setItem("sonidoVivo.inventario", JSON.stringify([producto]));
    const { result } = renderHook(() => useStore(), { wrapper });
    let creado;
    act(() => { creado = result.current.crearProducto({ ...producto, id: " te001 ", nombre: " Teclado ", precio: "299990", stock: "4", imagen: "" }); });
    expect(creado).toMatchObject({ ok: true, producto: { id: "TE001", nombre: "Teclado", imagen: "" } });
    await waitFor(() => expect(JSON.parse(localStorage.getItem("sonidoVivo.inventario"))).toEqual(expect.arrayContaining([expect.objectContaining({ id: "TE001", stock: 4, precio: 299990 })])));
    let duplicado;
    act(() => { duplicado = result.current.crearProducto({ ...producto, id: "ga001" }); });
    expect(duplicado).toEqual({ ok: false, errores: { id: "Ya existe un producto con ese código." } });
  });

  it("elimina el producto del inventario y del carrito sincronizado", async () => {
    localStorage.setItem("sonidoVivo.inventario", JSON.stringify([producto]));
    localStorage.setItem("sonidoVivo.sesion", JSON.stringify({ nombre: "Ana", correo: "ana@sonidovivo.cl", rol: "CLIENTE" }));
    localStorage.setItem("sonidoVivo.carrito.ana@sonidovivo.cl", JSON.stringify([{ ...producto, cantidad: 2 }]));
    const { result } = renderHook(() => useStore(), { wrapper });
    act(() => { result.current.eliminarProducto("GA001"); });
    await waitFor(() => {
      expect(result.current.productos).toEqual([]);
      expect(result.current.carrito).toEqual([]);
      expect(JSON.parse(localStorage.getItem("sonidoVivo.carrito.ana@sonidovivo.cl"))).toEqual([]);
    });
  });
});

describe("StoreContext: carrito por cuenta", () => {
  it("vacía el carrito al cerrar sesión y restaura solamente el de la misma cliente", async () => {
    localStorage.setItem("sonidoVivo.inventario", JSON.stringify([producto]));
    localStorage.setItem("sonidoVivo.usuarios", JSON.stringify([
      { nombre: "Ana", correo: "ana@sonidovivo.cl", password: "ana123", rol: "CLIENTE" },
      { nombre: "Bea", correo: "bea@sonidovivo.cl", password: "bea123", rol: "CLIENTE" },
    ]));
    const { result } = renderHook(() => ({ tienda: useStore(), auth: useAuth() }), { wrapper });
    act(() => { result.current.auth.iniciarSesion("ana@sonidovivo.cl", "ana123"); });
    await waitFor(() => expect(result.current.tienda.carrito).toEqual([]));
    act(() => { result.current.tienda.agregarAlCarrito(producto, 2); });
    await waitFor(() => expect(result.current.tienda.carrito).toHaveLength(1));
    act(() => { result.current.auth.cerrarSesion(); });
    await waitFor(() => expect(result.current.tienda.carrito).toEqual([]));
    act(() => { result.current.auth.iniciarSesion("admin@sonidovivo.cl", "admin123"); });
    await waitFor(() => expect(result.current.tienda.carrito).toEqual([]));
    act(() => { result.current.auth.cerrarSesion(); result.current.auth.iniciarSesion("ana@sonidovivo.cl", "ana123"); });
    await waitFor(() => expect(result.current.tienda.carrito).toEqual([expect.objectContaining({ id: "GA001", cantidad: 2 })]));
    act(() => { result.current.auth.cerrarSesion(); result.current.auth.iniciarSesion("bea@sonidovivo.cl", "bea123"); });
    await waitFor(() => expect(result.current.tienda.carrito).toEqual([]));
  });
});

describe("StoreContext: pedidos", () => {
  it("avanza un pedido, guarda historial y rechaza permisos o saltos", async () => {
    const pedido = { id: "SV-000001", fecha: "2026-10-14T10:00:00.000Z", estado: "Confirmado", cliente: { nombre: "Ana" }, items: [], total: 1000 };
    localStorage.setItem("sonidoVivo.pedidos", JSON.stringify([pedido]));
    const { result } = renderHook(() => useStore(), { wrapper });
    let sinPermiso;
    let salto;
    let avance;
    act(() => {
      sinPermiso = result.current.actualizarEstadoPedido("SV-000001", "Preparación", "CLIENTE");
      salto = result.current.actualizarEstadoPedido("SV-000001", "Despacho", "VENDEDOR");
      avance = result.current.actualizarEstadoPedido("SV-000001", "Preparación", "VENDEDOR");
    });
    expect(sinPermiso.ok).toBe(false);
    expect(salto.ok).toBe(false);
    expect(avance).toEqual({ ok: true });
    await waitFor(() => expect(result.current.pedidos[0]).toMatchObject({ estado: "Preparación", historial: [{ estado: "Confirmado" }, { estado: "Preparación" }] }));
  });
});