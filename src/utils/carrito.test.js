import { describe, expect, it } from "vitest";
import { calcularResumenCarrito, cuponesSonidoVivo, sincronizarCarritoConInventario } from "./carrito.js";

describe("lógica de carrito", () => {
  const productos = [
    { id: "GA001", nombre: "Guitarra", precio: 100000, stock: 2 },
    { id: "GA002", nombre: "Bajo", precio: 80000, stock: 0 },
  ];

  it("sincroniza precio, datos y cantidad con el inventario disponible", () => {
    const carrito = [{ id: "GA001", nombre: "Nombre antiguo", precio: 1, cantidad: 4 }, { id: "GA002", cantidad: 1 }, { id: "NO-EXISTE", cantidad: 1 }];
    expect(sincronizarCarritoConInventario(carrito, productos)).toEqual([{ id: "GA001", nombre: "Guitarra", precio: 100000, stock: 2, cantidad: 2 }]);
  });

  it("calcula subtotal, descuento y total final", () => {
    const resumen = calcularResumenCarrito([{ precio: 100000, cantidad: 2 }], { codigo: "SONIDOVIVO10", ...cuponesSonidoVivo.SONIDOVIVO10 });
    expect(resumen).toEqual({ subtotal: 200000, montoDescuento: 20000, totalFinal: 180000 });
  });
});