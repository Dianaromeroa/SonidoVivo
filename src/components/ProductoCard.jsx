import { Link } from "react-router-dom";
import { useState } from "react";
import { formatearCLP } from "../utils/formato.js";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useStore();
  const [mensaje, setMensaje] = useState("");
  const sinStock = producto.stock < 1;
  function agregar() { const resultado = agregarAlCarrito(producto); setMensaje(resultado.ok ? "Producto agregado al carrito." : resultado.mensaje); }
  return <article className="producto-card">
    <div className="producto-icono" aria-hidden="true">♫</div>
    <div className="producto-cuerpo"><p className="categoria">{producto.categoria}</p><h3>{producto.nombre}</h3>
      <p className="marca">{producto.marca} · {producto.modelo}</p><p className="precio">{formatearCLP(producto.precio)}</p>
      <p className={sinStock ? "stock agotado" : "stock"}>{sinStock ? "Agotado" : `${producto.stock} disponibles`}</p>
      <div className="acciones"><Link className="boton secundario" to={`/producto/${producto.id}`}>Ver detalle</Link><button className="boton" disabled={sinStock} onClick={agregar}>Agregar</button></div>
      {mensaje && <small className={mensaje === "Producto agregado al carrito." ? "mensaje-item exito" : "mensaje-item error"} role="status">{mensaje}</small>}
    </div>
  </article>;
}