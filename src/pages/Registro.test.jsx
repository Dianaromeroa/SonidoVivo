import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "./Registro.jsx";

describe("Registro", () => {
  it("renderiza el formulario de registro", () => {
    render(<MemoryRouter><Registro /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Registrarse" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear cuenta" })).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
  });
});