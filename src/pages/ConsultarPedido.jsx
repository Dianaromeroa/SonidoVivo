import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function ConsultarPedido() {
  const { pedidos } = useStore();
  const navegar = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");

  function consultar(event) {
    event.preventDefault();
    const id = codigo.trim().toUpperCase();
    if (!id) { setMensaje("Ingresa el código de tu pedido."); return; }
    if (!pedidos.some((pedido) => pedido.id.toUpperCase() === id)) { setMensaje("No encontramos un pedido con ese código."); return; }
    navegar(`/seguimiento/${id}`);
  }

  return <section className="consulta-pedido"><div className="consulta-pedido-panel"><p className="eyebrow">Seguimiento de compra</p><h1>Consulta tu pedido</h1><p>Ingresa el código que recibiste al confirmar tu compra para revisar el estado de entrega sin iniciar sesión.</p><form onSubmit={consultar} noValidate><label htmlFor="codigo-pedido">Código de pedido</label><div><input id="codigo-pedido" value={codigo} onChange={(event) => { setCodigo(event.target.value); setMensaje(""); }} placeholder="Ej.: SV-000001" autoComplete="off" /><button className="boton" type="submit">Ver pedido</button></div>{mensaje && <p className="error" role="alert">{mensaje}</p>}</form></div></section>;
}