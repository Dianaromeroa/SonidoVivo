import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe("AuthContext", () => {
  it("permite registrar e iniciar sesión con una cuenta cliente local", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let respuesta;
    act(() => { respuesta = result.current.registrar({ nombre: "Ana Música", correo: "ANA@SONIDOVIVO.CL", telefono: "+56 9 1234 5678", region: "Valparaíso", comuna: "Viña del Mar", direccion: "Calle Marina 123", password: "secreta" }); });
    expect(respuesta).toEqual({ ok: true, usuario: { nombre: "Ana Música", correo: "ana@sonidovivo.cl", telefono: "+56 9 1234 5678", region: "Valparaíso", comuna: "Viña del Mar", direccion: "Calle Marina 123", rol: "CLIENTE" } });
    expect(result.current.sesion).toEqual(respuesta.usuario);
    act(() => result.current.cerrarSesion());
    expect(result.current.iniciarSesion("ana@sonidovivo.cl", "secreta")).toEqual(respuesta.usuario);
  });
});