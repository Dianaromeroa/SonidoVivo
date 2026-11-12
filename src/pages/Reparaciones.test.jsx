import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Reparaciones from "./Reparaciones.jsx";

describe("Reparaciones", () => {
  it("envía una solicitud válida mediante la API", async () => {
    render(<Reparaciones />);
    fireEvent.change(screen.getByLabelText("Nombre completo"), { target: { value: "Ana Música" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@sonidovivo.cl" } });
    fireEvent.change(screen.getByLabelText("Teléfono"), { target: { value: "+56 9 1234 5678" } });
    fireEvent.change(screen.getByLabelText("Tipo de instrumento"), { target: { value: "Guitarra acústica" } });
    fireEvent.change(screen.getByLabelText("Servicio que necesitas"), { target: { value: "Mantención general" } });
    fireEvent.change(screen.getByLabelText("Describe el problema o lo que necesitas"), { target: { value: "La guitarra necesita ajuste de altura y cambio de cuerdas." } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud de reparación" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Recibimos tu solicitud #1"));
  });
});