import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "./Registro.jsx";

describe("Registro", () => {
  it("renderiza el formulario de registro", () => {
    render(<MemoryRouter><Registro /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Registrarse" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear cuenta" })).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
  });

  it("aclara que el registro local no crea credenciales de acceso", () => {
    render(<MemoryRouter><Registro /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Nombre completo"), { target: { value: "Ana Música" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@sonidovivo.cl" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "secreta" } });
    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByRole("status")).toHaveTextContent("inicio de sesión de esta versión usa las credenciales de demostración");
  });
});