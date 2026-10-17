import { Link, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP, formatearFecha } from "../utils/formato.js";
import { estadosPedido } from "../utils/pedidos.js";

export default function SeguimientoPedido() {
  const { id } = useParams(); const { pedidos } = useStore(); const pedido = pedidos.find((item) => item.id === id);
  if (!pedido) return <section className="empty"><h1>No encontramos el pedido</h1><Link className="boton" to="/catalogo">Ir al catálogo</Link></section>;
  const indiceActual = estadosPedido.indexOf(pedido.estado);
  return <section className="seguimiento"><p className="eyebrow">Seguimiento de pedido</p><h1>{pedido.id}</h1><p>Estado actual: <strong className="badge">{pedido.estado}</strong></p><p className="actualizacion-pedido">Última actualización: {formatearFecha(pedido.fechaActualizacion || pedido.fecha, { dateStyle: "medium", timeStyle: "short" })}</p><ol className="linea-estado" aria-label="Progreso del pedido">{estadosPedido.map((estado, indice) => <li key={estado} className={indice <= indiceActual ? "activo" : ""}><span>{indice + 1}</span><small>{estado}</small></li>)}</ol><div className="panel"><h2>Detalle</h2>{pedido.items.map((item) => <p key={item.id}>{item.nombre} × {item.cantidad} <strong>{formatearCLP(item.precio * item.cantidad)}</strong></p>)}<p className="total"><span>Total</span><strong>{formatearCLP(pedido.total)}</strong></p></div><section className="panel historial-pedido"><h2>Historial</h2><ol>{pedido.historial.map((evento) => <li key={`${evento.estado}-${evento.fecha}`}><strong>{evento.estado}</strong><span>{formatearFecha(evento.fecha, { dateStyle: "medium", timeStyle: "short" })}</span></li>)}</ol></section></section>;
}