import { describe, expect, it } from "vitest";
import { validarCheckout, validarCorreo } from "./validaciones.js";

describe("validaciones", () => {
  it("acepta un correo válido", () => expect(validarCorreo("cliente@sonidovivo.cl")).toBe(true));
  it("rechaza un correo inválido", () => expect(validarCorreo("cliente.sin.arroba")).toBe(false));
  it("informa los campos requeridos de checkout", () => {
    const errores = validarCheckout({ nombre: "", correo: "sin-formato", direccion: "", comuna: "" });
    expect(Object.keys(errores)).toEqual(expect.arrayContaining(["nombre", "correo", "direccion"]));
  });
});