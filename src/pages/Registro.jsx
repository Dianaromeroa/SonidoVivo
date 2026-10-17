import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { validarCorreo } from "../utils/validaciones.js";

const regiones = ["Valparaíso", "Metropolitana de Santiago", "Biobío", "La Araucanía", "Antofagasta", "Otra región"];

export default function Registro() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", telefono: "", region: "", comuna: "", direccion: "", password: "", confirmarPassword: "" });
  const [resultado, setResultado] = useState("");
  const { registrar } = useAuth();
  const navegar = useNavigate();
  function enviar(event) {
    event.preventDefault();
    if (datos.nombre.trim().length < 3 || !validarCorreo(datos.correo) || datos.telefono.trim().replace(/\D/g, "").length < 8 || !datos.region || datos.comuna.trim().length < 2 || datos.direccion.trim().length < 5 || datos.password.length < 6 || datos.password !== datos.confirmarPassword) {
      setResultado("Completa tus datos personales y de despacho. La contraseña debe tener al menos 6 caracteres y coincidir con su confirmación.");
      return;
    }
    const respuesta = registrar(datos);
    if (!respuesta.ok) { setResultado(respuesta.mensaje); return; }
    navegar("/", { replace: true });
  }
  return <section className="auth registro"><form className="formulario formulario-registro" onSubmit={enviar} noValidate><div><p className="eyebrow">Nueva cuenta</p><h1>Regístrate y compra más rápido.</h1><p className="texto-secundario">Guardaremos tus datos de entrega localmente para completar el checkout con mayor agilidad.</p></div><div className="formulario-dos-columnas"><label>Nombre completo<input value={datos.nombre} onChange={(event) => setDatos({ ...datos, nombre: event.target.value })} /></label><label>Correo electrónico<input type="email" value={datos.correo} onChange={(event) => setDatos({ ...datos, correo: event.target.value })} /></label><label>Teléfono<input type="tel" placeholder="Ej: +56 9 1234 5678" value={datos.telefono} onChange={(event) => setDatos({ ...datos, telefono: event.target.value })} /></label><label>Región<select value={datos.region} onChange={(event) => setDatos({ ...datos, region: event.target.value })}><option value="">Selecciona una región</option>{regiones.map((region) => <option key={region}>{region}</option>)}</select></label><label>Comuna<input value={datos.comuna} onChange={(event) => setDatos({ ...datos, comuna: event.target.value })} /></label><label>Dirección<input value={datos.direccion} onChange={(event) => setDatos({ ...datos, direccion: event.target.value })} placeholder="Ej: Calle 1 #234" /></label><label>Contraseña<input type="password" value={datos.password} onChange={(event) => setDatos({ ...datos, password: event.target.value })} /></label><label>Confirmar contraseña<input type="password" value={datos.confirmarPassword} onChange={(event) => setDatos({ ...datos, confirmarPassword: event.target.value })} /></label></div>{resultado && <p className="mensaje error" role="alert">{resultado}</p>}<button className="boton" type="submit">Crear cuenta</button><p className="mb-0">¿Ya tienes una cuenta? <Link className="enlace-formulario" to="/login">Inicia sesión</Link></p></form></section>;
}