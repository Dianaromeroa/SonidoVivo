import { useState } from "react";
import { formatearFecha } from "../utils/formato.js";
import { obtenerMensajesOperacion, responderMensajeOperacion } from "../services/mensajesService.js";

export default function VendedorMensajes() {
  const [mensajes, setMensajes] = useState(() => obtenerMensajesOperacion());
  const [seleccionado, setSeleccionado] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [aviso, setAviso] = useState("");

  function abrirRespuesta(mensaje) {
    setSeleccionado(mensaje);
    setRespuesta(mensaje.respuesta || "");
    setAviso("");
  }

  function guardarRespuesta(event) {
    event.preventDefault();
    if (respuesta.trim().length < 5) {
      setAviso("Escribe una respuesta de al menos 5 caracteres.");
      return;
    }

    const actualizado = responderMensajeOperacion(seleccionado, respuesta);
    setMensajes((actuales) => actuales.map((mensaje) => mensaje.id === actualizado.id ? actualizado : mensaje));
    setSeleccionado(actualizado);
    setAviso("Respuesta registrada en la demo local.");
  }

  return <section className="dashboard mensajes-vendedor">
    <header className="dashboard-hero">
      <div><p className="eyebrow">Área restringida · Vendedor</p><h1>Mensajes y reparaciones</h1><p>Revisa solicitudes recibidas y registra la respuesta entregada a cada cliente.</p></div>
      <div className="dashboard-hero-summary"><span>Pendientes</span><strong>{mensajes.filter((mensaje) => mensaje.estado !== "Respondido").length}</strong><small>por responder</small></div>
    </header>
    <p className="mensaje-operacion" role="status" aria-live="polite">{aviso}</p>
    <div className="dashboard-layout mensajes-vendedor-layout">
      <section className="dashboard-card">
        <div className="dashboard-card-header"><div><p className="seccion-etiqueta">Bandeja local</p><h2>Solicitudes recibidas</h2></div></div>
        {mensajes.length ? <div className="lista-mensajes-operacion">{mensajes.map((mensaje) => <article className="mensaje-operacion-card" key={mensaje.id}><div><p className="eyebrow">{mensaje.tipo === "reparacion" ? "Reparación" : "Contacto"}</p><h3>{mensaje.nombre}</h3><p>{mensaje.correo}</p><small>{formatearFecha(mensaje.fecha, { dateStyle: "medium", timeStyle: "short" })}</small></div><div><span className="badge">{mensaje.estado}</span><button className="boton secundario small" type="button" onClick={() => abrirRespuesta(mensaje)}>{mensaje.estado === "Respondido" ? "Ver respuesta" : "Responder"}</button></div></article>)}</div> : <p className="texto-secundario">Aún no hay mensajes ni solicitudes de reparación.</p>}
      </section>
      <aside className="dashboard-card respuesta-mensaje">
        {seleccionado ? <form onSubmit={guardarRespuesta}><p className="seccion-etiqueta">{seleccionado.tipo === "reparacion" ? "Solicitud de reparación" : "Mensaje de contacto"}</p><h2>{seleccionado.id}</h2><p><strong>Cliente:</strong> {seleccionado.nombre}</p><p><strong>Correo:</strong> {seleccionado.correo}</p>{seleccionado.telefono && <p><strong>Teléfono:</strong> {seleccionado.telefono}</p>}{seleccionado.tipo === "reparacion" && <p><strong>Instrumento:</strong> {seleccionado.tipoInstrumento} · {seleccionado.marcaModelo || "Sin marca/modelo indicado"}</p>}<p><strong>Consulta:</strong> {seleccionado.descripcion || seleccionado.mensaje}</p><label>Respuesta registrada<textarea rows="6" value={respuesta} onChange={(event) => setRespuesta(event.target.value)} /></label><button className="boton" type="submit">Guardar respuesta</button></form> : <div><p className="seccion-etiqueta">Detalle</p><h2>Selecciona una consulta</h2><p className="texto-secundario">Podrás revisar los datos y registrar la respuesta que se entregó al cliente.</p></div>}
      </aside>
    </div>
  </section>;
}