import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "./Registro.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

describe("Registro", () => {
  it("renderiza el formulario de registro", () => {
    render(<MemoryRouter><AuthProvider><Registro /></AuthProvider></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Regístrate y compra más rápido." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear cuenta" })).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
  });

  it("crea una cuenta cliente e inicia su sesión", () => {
    render(<MemoryRouter><AuthProvider><Registro /></AuthProvider></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Nombre completo"), { target: { value: "Ana Música" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@sonidovivo.cl" } });
    fireEvent.change(screen.getByLabelText("Teléfono"), { target: { value: "+56 9 1234 5678" } });
    fireEvent.change(screen.getByLabelText("Región"), { target: { value: "Valparaíso" } });
    fireEvent.change(screen.getByLabelText("Comuna"), { target: { value: "Viña del Mar" } });
    fireEvent.change(screen.getByLabelText("Dirección"), { target: { value: "Calle Marina 123" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "secreta" } });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), { target: { value: "secreta" } });
    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(JSON.parse(localStorage.getItem("sonidoVivo.usuarios"))).toEqual([expect.objectContaining({ nombre: "Ana Música", correo: "ana@sonidovivo.cl", comuna: "Viña del Mar", direccion: "Calle Marina 123", rol: "CLIENTE" })]);
    expect(JSON.parse(localStorage.getItem("sonidoVivo.sesion"))).toEqual(expect.objectContaining({ nombre: "Ana Música", correo: "ana@sonidovivo.cl", comuna: "Viña del Mar", direccion: "Calle Marina 123", rol: "CLIENTE" }));
  });
});