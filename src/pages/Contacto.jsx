import { useState } from "react";
import { validarCorreo } from "../utils/validaciones.js";

export default function Contacto() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", mensaje: "" }); const [resultado, setResultado] = useState("");
  function enviar(event) { event.preventDefault(); if (datos.nombre.trim().length < 3 || !validarCorreo(datos.correo) || datos.mensaje.trim().length < 5) { setResultado("Revisa los datos ingresados antes de enviar."); return; } localStorage.setItem("sonidoVivo.contacto", JSON.stringify(datos)); setResultado("Tu mensaje fue enviado correctamente."); setDatos({ nombre: "", correo: "", mensaje: "" }); }
  return <section className="auth"><form className="formulario" onSubmit={enviar} noValidate><p className="eyebrow">Estamos para ayudarte</p><h1>Contacto</h1><label>Nombre<input value={datos.nombre} onChange={(event) => setDatos({ ...datos, nombre: event.target.value })} /></label><label>Correo<input type="email" value={datos.correo} onChange={(event) => setDatos({ ...datos, correo: event.target.value })} /></label><label>Mensaje<textarea rows="5" value={datos.mensaje} onChange={(event) => setDatos({ ...datos, mensaje: event.target.value })} /></label>{resultado && <p className="mensaje" role="status">{resultado}</p>}<button className="boton">Enviar mensaje</button></form></section>;
}