import { Link, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";

export default function DetalleProducto() {
  const { id } = useParams(); const { productos, agregarAlCarrito } = useStore(); const producto = productos.find((item) => item.id === id);
  if (!producto) return <section className="empty"><h1>Producto no encontrado</h1><Link className="boton" to="/catalogo">Volver al catálogo</Link></section>;
  return <section className="detalle"><div className="detalle-icono">♫</div><div><p className="eyebrow">{producto.categoria}</p><h1>{producto.nombre}</h1><p className="marca">{producto.marca} · Modelo {producto.modelo}</p><p className="detalle-descripcion">{producto.descripcion}</p><p className="precio grande">{formatearCLP(producto.precio)}</p><p className={producto.stock ? "stock" : "stock agotado"}>{producto.stock ? `${producto.stock} unidades disponibles` : "Producto agotado"}</p><button className="boton" disabled={!producto.stock} onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button></div></section>;
}