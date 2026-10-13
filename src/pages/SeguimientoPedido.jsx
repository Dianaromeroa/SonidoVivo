import { Link, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";

export default function SeguimientoPedido() {
  const { id } = useParams(); const { pedidos } = useStore(); const pedido = pedidos.find((item) => item.id === id);
  if (!pedido) return <section className="empty"><h1>No encontramos el pedido</h1><Link className="boton" to="/catalogo">Ir al catálogo</Link></section>;
  return <section className="seguimiento"><p className="eyebrow">Seguimiento de pedido</p><h1>{pedido.id}</h1><p>Estado actual: <strong className="badge">{pedido.estado}</strong></p><div className="linea-estado"><span className="activo">1<br /><small>Confirmado</small></span><span>2<br /><small>Preparación</small></span><span>3<br /><small>Despacho</small></span></div><div className="panel"><h2>Detalle</h2>{pedido.items.map((item) => <p key={item.id}>{item.nombre} × {item.cantidad} <strong>{formatearCLP(item.precio * item.cantidad)}</strong></p>)}<p className="total"><span>Total</span><strong>{formatearCLP(pedido.total)}</strong></p></div></section>;
}