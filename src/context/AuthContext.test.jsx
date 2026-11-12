import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

vi.mock("../services/sonidoVivoApi.js", () => ({
  login: vi.fn(async () => ({ token: "token-demo", usuario: { id: 3, nombre: "Ana Música", correo: "ana@sonidovivo.cl", telefono: "+56 9 1234 5678", region: "Valparaíso", comuna: "Viña del Mar", direccion: "Calle Marina 123", rol: "CLIENTE" } })),
  registrar: vi.fn(async () => ({ id: 3, nombre: "Ana Música", correo: "ana@sonidovivo.cl", telefono: "+56 9 1234 5678", region: "Valparaíso", comuna: "Viña del Mar", direccion: "Calle Marina 123", rol: "CLIENTE" })),
}));

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe("AuthContext", () => {
  it("registra mediante API, inicia sesión y persiste solo datos no sensibles", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let registro; await act(async () => { registro = await result.current.registrar({ nombre: "Ana Música", correo: "ANA@SONIDOVIVO.CL", telefono: "+56 9 1234 5678", region: "Valparaíso", comuna: "Viña del Mar", direccion: "Calle Marina 123", password: "secreta" }); });
    expect(registro.usuario).toMatchObject({ correo: "ana@sonidovivo.cl", rol: "CLIENTE" });
    await act(async () => { await result.current.iniciarSesion("ana@sonidovivo.cl", "secreta"); });
    expect(result.current.sesion).toMatchObject({ correo: "ana@sonidovivo.cl", rol: "CLIENTE" });
    expect(localStorage.getItem("sonidoVivo.auth.token")).toBe("token-demo");
    expect(localStorage.getItem("sonidoVivo.sesion")).not.toContain("secreta");
  });
});