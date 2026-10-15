import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreProvider, useStore } from "./StoreContext.jsx";

const producto = { id: "GA001", nombre: "Guitarra", categoria: "Guitarras", marca: "Yamaha", modelo: "F310", precio: 129990, stock: 8, descripcion: "Prueba", oferta: false };
const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;

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
    localStorage.setItem("sonidoVivo.carrito", JSON.stringify([{ ...producto, cantidad: 2 }]));
    const { result } = renderHook(() => useStore(), { wrapper });
    act(() => { result.current.eliminarProducto("GA001"); });
    await waitFor(() => {
      expect(result.current.productos).toEqual([]);
      expect(result.current.carrito).toEqual([]);
      expect(JSON.parse(localStorage.getItem("sonidoVivo.carrito"))).toEqual([]);
    });
  });
});