import { createContext, useContext, useEffect, useState } from "react";
import { eliminar, guardar, leer } from "../services/storageService.js";
import { eliminarToken, guardarToken, obtenerToken } from "../services/apiClient.js";
import * as api from "../services/sonidoVivoApi.js";

const AuthContext = createContext(null);
const CLAVE = "sonidoVivo.sesion";

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => leer(CLAVE, null));
  async function iniciarSesion(correo, password) {
    const respuesta = await api.login(correo.trim().toLowerCase(), password);
    guardarToken(respuesta.token);
    guardar(CLAVE, respuesta.usuario);
    setSesion(respuesta.usuario);
    return respuesta.usuario;
  }
  async function registrar(datos) { return { ok: true, usuario: await api.registrar(datos) }; }
  function cerrarSesion() { eliminarToken(); eliminar(CLAVE); setSesion(null); }
  useEffect(() => { window.addEventListener("sonidoVivo:sesion-invalida", cerrarSesion); return () => window.removeEventListener("sonidoVivo:sesion-invalida", cerrarSesion); }, []);
  return <AuthContext.Provider value={{ sesion, token: obtenerToken(), iniciarSesion, registrar, cerrarSesion }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }