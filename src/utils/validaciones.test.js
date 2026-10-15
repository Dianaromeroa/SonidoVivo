import { describe, expect, it } from "vitest";
import { validarCheckout, validarCorreo, validarProductoParaEdicion } from "./validaciones.js";

describe("validaciones", () => {
  it("acepta un correo válido", () => expect(validarCorreo("cliente@sonidovivo.cl")).toBe(true));
  it("rechaza un correo inválido", () => expect(validarCorreo("cliente.sin.arroba")).toBe(false));
  it("informa los campos requeridos de checkout", () => {
    const errores = validarCheckout({ nombre: "", correo: "sin-formato", direccion: "", comuna: "" });
    expect(Object.keys(errores)).toEqual(expect.arrayContaining(["nombre", "correo", "direccion", "comuna"]));
  });

  it("rechaza precio inválido y stock negativo al editar un producto", () => {
    const errores = validarProductoParaEdicion({ id: "GA001", nombre: "Guitarra", categoria: "Guitarras", marca: "Marca", modelo: "Modelo", precio: 0, stock: -1 });
    expect(errores).toMatchObject({ precio: expect.any(String), stock: expect.any(String) });
  });

  it("acepta los campos válidos de un producto editable", () => {
    const errores = validarProductoParaEdicion({ id: "GA001", nombre: "Guitarra", categoria: "Guitarras", marca: "Marca", modelo: "Modelo", precio: 129990, stock: 3 });
    expect(errores).toEqual({});
  });
});