import { createContext, useContext, useState } from "react";
import { guardar, leer } from "../services/storageService.js";

const AuthContext = createContext(null);
const CLAVE = "sonidoVivo.sesion";
const cuentas = [
  { correo: "admin@sonidovivo.cl", password: "admin123", nombre: "Administración Sonido Vivo", rol: "ADMIN" },
  { correo: "vendedor@sonidovivo.cl", password: "vendedor123", nombre: "Vendedor Sonido Vivo", rol: "VENDEDOR" },
];

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => leer(CLAVE, null));
  function iniciarSesion(correo, password) {
    const usuario = cuentas.find((cuenta) => cuenta.correo === correo.trim().toLowerCase() && cuenta.password === password);
    if (!usuario) return false;
    const { password: _, ...usuarioSeguro } = usuario;
    guardar(CLAVE, usuarioSeguro);
    setSesion(usuarioSeguro);
    return usuarioSeguro;
  }
  function cerrarSesion() { localStorage.removeItem(CLAVE); setSesion(null); }
  return <AuthContext.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }