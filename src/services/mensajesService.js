import { guardar, leer } from "./storageService.js";

const CLAVES = {
  contacto: "sonidoVivo.contacto",
  reparaciones: "sonidoVivo.reparaciones",
};

function crearMensaje(tipo, datos) {
  return {
    ...datos,
    id: `${tipo === "reparacion" ? "REP" : "CON"}-${Date.now()}`,
    tipo,
    fecha: new Date().toISOString(),
    estado: tipo === "reparacion" ? "Solicitud recibida" : "Mensaje recibido",
    respuesta: "",
    fechaRespuesta: "",
  };
}

function leerMensajes(clave) {
  const datos = leer(clave, []);
  return Array.isArray(datos) ? datos : [datos];
}

export function guardarMensajeContacto(datos) {
  const mensaje = crearMensaje("contacto", datos);
  guardar(CLAVES.contacto, [mensaje, ...leerMensajes(CLAVES.contacto)]);
  return mensaje;
}

export function guardarSolicitudReparacion(datos) {
  const solicitud = crearMensaje("reparacion", datos);
  guardar(CLAVES.reparaciones, [solicitud, ...leerMensajes(CLAVES.reparaciones)]);
  return solicitud;
}

export function obtenerMensajesOperacion() {
  return [
    ...leerMensajes(CLAVES.reparaciones),
    ...leerMensajes(CLAVES.contacto),
  ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

export function responderMensajeOperacion(mensaje, respuesta) {
  const clave = mensaje.tipo === "reparacion" ? CLAVES.reparaciones : CLAVES.contacto;
  const mensajes = leerMensajes(clave).map((item) => item.id === mensaje.id ? {
    ...item,
    respuesta: respuesta.trim(),
    fechaRespuesta: new Date().toISOString(),
    estado: "Respondido",
  } : item);

  guardar(clave, mensajes);
  return mensajes.find((item) => item.id === mensaje.id);
}