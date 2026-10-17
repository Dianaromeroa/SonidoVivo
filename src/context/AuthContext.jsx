import { createContext, useContext, useState } from "react";
import { eliminar, guardar, leer } from "../services/storageService.js";

const AuthContext = createContext(null);
const CLAVE = "sonidoVivo.sesion";
const CLAVE_USUARIOS = "sonidoVivo.usuarios";
const cuentas = [
  { correo: "admin@sonidovivo.cl", password: "admin123", nombre: "Administración Sonido Vivo", rol: "ADMIN" },
  { correo: "vendedor@sonidovivo.cl", password: "vendedor123", nombre: "Vendedor Sonido Vivo", rol: "VENDEDOR" },
];

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => leer(CLAVE, null));
  function iniciarSesion(correo, password) {
    const usuariosRegistrados = leer(CLAVE_USUARIOS, []);
    const usuario = [...cuentas, ...usuariosRegistrados].find((cuenta) => cuenta.correo === correo.trim().toLowerCase() && cuenta.password === password);
    if (!usuario) return false;
    const { password: _, ...usuarioSeguro } = usuario;
    guardar(CLAVE, usuarioSeguro);
    setSesion(usuarioSeguro);
    return usuarioSeguro;
  }
  function registrar(datos) {
    const correo = datos.correo.trim().toLowerCase();
    const usuariosRegistrados = leer(CLAVE_USUARIOS, []);
    if ([...cuentas, ...usuariosRegistrados].some((cuenta) => cuenta.correo === correo)) return { ok: false, mensaje: "Ya existe una cuenta registrada con este correo." };
    const nuevoUsuario = {
      nombre: datos.nombre.trim(),
      correo,
      telefono: datos.telefono.trim(),
      region: datos.region,
      comuna: datos.comuna.trim(),
      direccion: datos.direccion.trim(),
      password: datos.password,
      rol: "CLIENTE",
    };
    guardar(CLAVE_USUARIOS, [...usuariosRegistrados, nuevoUsuario]);
    const { password: _, ...usuarioSeguro } = nuevoUsuario;
    guardar(CLAVE, usuarioSeguro);
    setSesion(usuarioSeguro);
    return { ok: true, usuario: usuarioSeguro };
  }
  function cerrarSesion() { eliminar(CLAVE); setSesion(null); }
  return <AuthContext.Provider value={{ sesion, iniciarSesion, registrar, cerrarSesion }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }