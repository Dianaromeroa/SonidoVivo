import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import VendedorMensajes from "./VendedorMensajes.jsx";

describe("VendedorMensajes", () => {
  beforeEach(() => localStorage.clear());

  it("permite registrar una respuesta para una solicitud de reparación", () => {
    localStorage.setItem("sonidoVivo.reparaciones", JSON.stringify([{ id: "REP-1", tipo: "reparacion", nombre: "Ana", correo: "ana@correo.cl", descripcion: "Cambio de cuerdas", fecha: "2026-10-16T12:00:00.000Z", estado: "Solicitud recibida" }]));
    render(<VendedorMensajes />);
    fireEvent.click(screen.getByRole("button", { name: "Responder" }));
    fireEvent.change(screen.getByLabelText("Respuesta registrada"), { target: { value: "Agenda disponible el lunes." } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar respuesta" }));
    expect(screen.getByRole("status")).toHaveTextContent("Respuesta registrada en la demo local.");
    expect(JSON.parse(localStorage.getItem("sonidoVivo.reparaciones"))[0]).toMatchObject({ estado: "Respondido", respuesta: "Agenda disponible el lunes." });
  });
});