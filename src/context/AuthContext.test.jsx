import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

vi.mock("../services/authService.js", () => ({
  iniciarSesionApi: vi.fn().mockResolvedValue({ token: "jwt-prueba", usuario: { id: 7, nombre: "Ana Música", email: "ana@sonidovivo.cl", rol: "CLIENTE" } }),
  registrarApi: vi.fn().mockResolvedValue({ id: 7, nombre: "Ana Música", email: "ana@sonidovivo.cl", rol: "CLIENTE" }),
}));

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
describe("AuthContext", () => { it("inicia sesión con el JWT emitido por la API", async () => { const { result } = renderHook(() => useAuth(), { wrapper }); let usuario; await act(async () => { usuario = await result.current.iniciarSesion("ANA@SONIDOVIVO.CL", "secreta"); }); expect(usuario).toMatchObject({ nombre: "Ana Música", correo: "ana@sonidovivo.cl", rol: "CLIENTE" }); expect(localStorage.getItem("sonidoVivo.token")).toBe("jwt-prueba"); expect(result.current.sesion).toMatchObject({ correo: "ana@sonidovivo.cl" }); }); });