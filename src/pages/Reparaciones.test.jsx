import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Reparaciones from "./Reparaciones.jsx";

describe("Reparaciones", () => {
  it("guarda una solicitud válida en el almacenamiento local", () => {
    render(<Reparaciones />);
    fireEvent.change(screen.getByLabelText("Nombre completo"), { target: { value: "Ana Música" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@sonidovivo.cl" } });
    fireEvent.change(screen.getByLabelText("Teléfono"), { target: { value: "+56 9 1234 5678" } });
    fireEvent.change(screen.getByLabelText("Tipo de instrumento"), { target: { value: "Guitarra acústica" } });
    fireEvent.change(screen.getByLabelText("Servicio que necesitas"), { target: { value: "Mantención general" } });
    fireEvent.change(screen.getByLabelText("Describe el problema o lo que necesitas"), { target: { value: "La guitarra necesita ajuste de altura y cambio de cuerdas." } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud de reparación" }));
    expect(screen.getByRole("status")).toHaveTextContent("Recibimos tu solicitud REP-");
    expect(JSON.parse(localStorage.getItem("sonidoVivo.reparaciones"))).toHaveLength(1);
  });
});