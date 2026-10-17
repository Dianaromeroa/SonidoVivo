import { describe, expect, it } from "vitest";
import { filtrarYOrdenarProductos, obtenerCategorias } from "./inventario.js";

const productos = [
  { id: "GA001", nombre: "Guitarra", categoria: "Cuerdas", marca: "Yamaha", precio: 120000, stock: 8 },
  { id: "TE001", nombre: "Teclado", categoria: "Teclados", marca: "Casio", precio: 90000, stock: 2 },
  { id: "AC001", nombre: "Cable", categoria: "Accesorios", marca: "Proel", precio: 5000, stock: 0 },
];

describe("utilidades de inventario", () => {
  it("obtiene categorías únicas ordenadas", () => expect(obtenerCategorias(productos)).toEqual(["Accesorios", "Cuerdas", "Teclados"]));
  it("filtra por búsqueda y estado de stock, y ordena los resultados", () => {
    expect(filtrarYOrdenarProductos(productos, { busqueda: "a", stock: "disponible", orden: "precio" }).map((producto) => producto.id)).toEqual(["GA001"]);
    expect(filtrarYOrdenarProductos(productos, { stock: "critico" }).map((producto) => producto.id)).toEqual(["TE001"]);
  });
});