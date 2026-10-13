import { describe, expect, it } from "vitest";
import { formatearCLP, totalCarrito } from "./formato.js";

describe("utilidades de compra", () => {
  it("formatea precios en pesos chilenos", () => expect(formatearCLP(129990)).toBe("$129.990"));
  it("calcula el total del carrito", () => expect(totalCarrito([{ precio: 1000, cantidad: 2 }, { precio: 500, cantidad: 3 }])).toBe(3500));
});