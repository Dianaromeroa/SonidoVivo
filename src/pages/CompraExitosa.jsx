import { Link, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";

export default function CompraExitosa() {
  const { id } = useParams(); const { pedidos } = useStore(); const pedido = pedidos.find((item) => item.id === id);
  if (!pedido) return <section className="empty"><h1>Pedido no encontrado</h1><Link className="boton" to="/catalogo">Volver al catálogo</Link></section>;
  return <section className="estado-compra exito"><span>✓</span><p className="eyebrow">Compra realizada</p><h1>¡Tu compra fue confirmada!</h1><p>Registramos el pedido <strong>{pedido.id}</strong>. Te enviaremos las novedades a {pedido.cliente.correo}.</p><p className="precio grande">{formatearCLP(pedido.total)}</p><div><Link className="boton" to={`/seguimiento/${pedido.id}`}>Ver seguimiento</Link><Link className="boton secundario" to="/catalogo">Seguir comprando</Link></div></section>;
}