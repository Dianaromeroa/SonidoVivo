import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { seguimientoPedido } from "../services/sonidoVivoApi.js";
import { validarCorreo } from "../utils/validaciones.js";

export default function ConsultarPedido() {
  const navegar = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function consultar(event) {
    event.preventDefault();
    const codigoPedido = codigo.trim().toUpperCase();
    if (!codigoPedido || !validarCorreo(correo)) { setMensaje("Ingresa el código de pedido y el correo usado en la compra."); return; }
    try {
      const pedido = await seguimientoPedido(codigoPedido, correo);
      sessionStorage.setItem(`sonidoVivo.seguimiento.${pedido.id}`, JSON.stringify(pedido));
      navegar(`/seguimiento/${pedido.id}`);
    } catch {
      setMensaje("No encontramos un pedido con esos datos.");
    }
  }

  return <section className="consulta-pedido"><div className="consulta-pedido-panel"><p className="eyebrow">Seguimiento de compra</p><h1>Consulta tu pedido</h1><p>Ingresa el código y el correo utilizado al comprar para revisar el estado sin iniciar sesión.</p><form onSubmit={consultar} noValidate><label htmlFor="codigo-pedido">Código de pedido</label><input id="codigo-pedido" value={codigo} onChange={(event) => { setCodigo(event.target.value); setMensaje(""); }} placeholder="Ej.: SV-A1B2C3D4E5" autoComplete="off" /><label htmlFor="correo-pedido">Correo usado en la compra</label><div><input id="correo-pedido" type="email" value={correo} onChange={(event) => { setCorreo(event.target.value); setMensaje(""); }} autoComplete="email" /><button className="boton" type="submit">Ver pedido</button></div>{mensaje && <p className="error" role="alert">{mensaje}</p>}</form></div></section>;
}