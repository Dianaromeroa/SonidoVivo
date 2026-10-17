import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP, formatearFecha } from "../utils/formato.js";

export default function MisPedidos() {
  const { sesion } = useAuth();
  const { pedidos } = useStore();
  const correo = sesion?.correo?.trim().toLowerCase();
  const pedidosCliente = pedidos.filter((pedido) => pedido.cliente?.correo?.trim().toLowerCase() === correo);

  return <section className="mis-pedidos"><header className="page-heading"><p className="eyebrow">Tu cuenta</p><h1>Mis pedidos</h1><p className="texto-secundario">Revisa el estado y el historial de tus compras en Sonido Vivo.</p></header>{pedidosCliente.length ? <div className="mis-pedidos-lista">{pedidosCliente.map((pedido) => <article key={pedido.id} className="pedido-cliente-card"><div><p className="pedido-cliente-fecha">Pedido realizado el {formatearFecha(pedido.fecha)}</p><h2>{pedido.id}</h2><span className="badge">{pedido.estado}</span></div><div className="pedido-cliente-resumen"><strong>{formatearCLP(pedido.total)}</strong><small>{pedido.items?.reduce((cantidad, item) => cantidad + item.cantidad, 0) || 0} artículo(s)</small><Link className="boton secundario small" to={`/seguimiento/${pedido.id}`}>Ver seguimiento</Link></div></article>)}</div> : <section className="empty"><h2>Aún no tienes pedidos asociados</h2><p>Cuando realices una compra con el correo de tu cuenta, aparecerá aquí.</p><Link className="boton" to="/catalogo">Ir al catálogo</Link></section>}</section>;
}