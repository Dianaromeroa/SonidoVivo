import { useState } from "react";
import { Link } from "react-router-dom";
import { validarCorreo } from "../utils/validaciones.js";

export default function Registro() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", password: "" });
  const [resultado, setResultado] = useState("");
  function enviar(event) {
    event.preventDefault();
    if (datos.nombre.trim().length < 3 || !validarCorreo(datos.correo) || datos.password.length < 6) {
      setResultado("Completa nombre, un correo válido y una contraseña de al menos 6 caracteres.");
      return;
    }
    localStorage.setItem("sonidoVivo.registroPendiente", JSON.stringify(datos));
    setResultado("Registro simulado completado. Ya puedes iniciar sesión con las credenciales de demostración.");
    setDatos({ nombre: "", correo: "", password: "" });
  }
  return <section className="auth"><form className="formulario" onSubmit={enviar} noValidate><p className="eyebrow">Nueva cuenta</p><h1>Registrarse</h1><p>Esta versión frontend guarda el registro como demostración local.</p><label>Nombre completo<input value={datos.nombre} onChange={(event) => setDatos({ ...datos, nombre: event.target.value })} /></label><label>Correo electrónico<input type="email" value={datos.correo} onChange={(event) => setDatos({ ...datos, correo: event.target.value })} /></label><label>Contraseña<input type="password" value={datos.password} onChange={(event) => setDatos({ ...datos, password: event.target.value })} /></label>{resultado && <p className={resultado.startsWith("Registro") ? "mensaje" : "mensaje error"} role="status">{resultado}</p>}<button className="boton" type="submit">Crear cuenta</button><p className="mb-0">¿Ya tienes una cuenta? <Link className="enlace-formulario" to="/login">Inicia sesión</Link></p></form></section>;
}