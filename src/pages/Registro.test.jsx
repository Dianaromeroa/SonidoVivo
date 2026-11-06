import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "./Registro.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

vi.mock("../services/authService.js", () => ({ iniciarSesionApi: vi.fn(), registrarApi: vi.fn().mockResolvedValue({ id: 7, nombre: "Ana Música", email: "ana@sonidovivo.cl", rol: "CLIENTE" }) }));

describe("Registro", () => {
  it("renderiza el formulario de registro", () => { render(<MemoryRouter><AuthProvider><Registro /></AuthProvider></MemoryRouter>); expect(screen.getByRole("heading", { name: "Regístrate y compra más rápido." })).toBeInTheDocument(); expect(screen.getByRole("button", { name: "Crear cuenta" })).toBeInTheDocument(); });
  it("envía el registro a la API", async () => { render(<MemoryRouter><AuthProvider><Registro /></AuthProvider></MemoryRouter>); [["Nombre completo", "Ana Música"], ["Correo electrónico", "ana@sonidovivo.cl"], ["Teléfono", "+56 9 1234 5678"], ["Comuna", "Viña del Mar"], ["Dirección", "Calle Marina 123"], ["Contraseña", "secreta"], ["Confirmar contraseña", "secreta"]].forEach(([label, value]) => fireEvent.change(screen.getByLabelText(label), { target: { value } })); fireEvent.change(screen.getByLabelText("Región"), { target: { value: "Valparaíso" } }); fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" })); await waitFor(() => expect(screen.queryByRole("button", { name: "Creando..." })).not.toBeInTheDocument()); });
});