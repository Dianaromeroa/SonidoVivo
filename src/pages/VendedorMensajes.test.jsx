import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import VendedorMensajes from "./VendedorMensajes.jsx";

vi.mock("../services/sonidoVivoApi.js", () => ({
  listarMensajes: vi.fn(async () => [{ id: "1", tipo: "reparacion", nombre: "Ana", correo: "ana@correo.cl", descripcion: "Cambio de cuerdas", fecha: "2026-10-16T12:00:00.000Z", estado: "Solicitud recibida" }]),
  responderMensaje: vi.fn(async (mensaje, respuesta) => ({ ...mensaje, respuesta, estado: "Respondido" })),
}));

describe("VendedorMensajes", () => {
  it("consulta la bandeja remota y registra una respuesta", async () => {
    render(<VendedorMensajes />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Responder" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Responder" }));
    fireEvent.change(screen.getByLabelText("Respuesta registrada"), { target: { value: "Agenda disponible el lunes." } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar respuesta" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Respuesta registrada correctamente."));
    expect(screen.getByText("Respondido")).toBeInTheDocument();
  });
});