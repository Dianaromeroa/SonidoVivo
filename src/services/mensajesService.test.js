import { beforeEach, describe, expect, it } from "vitest";
import { guardarMensajeContacto, guardarSolicitudReparacion, obtenerMensajesOperacion, responderMensajeOperacion } from "./mensajesService.js";

describe("mensajesService", () => {
  beforeEach(() => localStorage.clear());

  it("guarda contacto y reparación para la bandeja del vendedor", () => {
    const contacto = guardarMensajeContacto({ nombre: "Ana", correo: "ana@correo.cl", mensaje: "Necesito ayuda" });
    const reparacion = guardarSolicitudReparacion({ nombre: "Beto", correo: "beto@correo.cl", descripcion: "Ajustar guitarra" });
    expect(contacto).toMatchObject({ tipo: "contacto", estado: "Mensaje recibido" });
    expect(obtenerMensajesOperacion()).toEqual(expect.arrayContaining([expect.objectContaining({ id: reparacion.id, tipo: "reparacion" }), expect.objectContaining({ id: contacto.id, tipo: "contacto" })]));
  });

  it("registra una respuesta y actualiza el estado", () => {
    const mensaje = guardarMensajeContacto({ nombre: "Ana", correo: "ana@correo.cl", mensaje: "Necesito ayuda" });
    const respondido = responderMensajeOperacion(mensaje, "Te responderemos hoy.");
    expect(respondido).toMatchObject({ estado: "Respondido", respuesta: "Te responderemos hoy." });
  });
});