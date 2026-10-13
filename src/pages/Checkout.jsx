import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";
import { validarCheckout } from "../utils/validaciones.js";

export default function Checkout() {
  const { carrito, total, confirmarCompra } = useStore(); const navegar = useNavigate(); const [datos, setDatos] = useState({ nombre: "", correo: "", direccion: "", comuna: "" }); const [errores, setErrores] = useState({});
  if (!carrito.length) return <Navigate to="/carrito" replace />;
  function enviar(event) { event.preventDefault(); const resultado = validarCheckout(datos); setErrores(resultado); if (Object.keys(resultado).length) return; const pedido = confirmarCompra(datos); navegar(`/compra-exitosa/${pedido.id}`); }
  return <section className="checkout"><div><div className="page-heading"><p className="eyebrow">Paso de pago</p><h1>Datos de entrega</h1></div><form className="formulario" onSubmit={enviar} noValidate>{[["nombre","Nombre completo"],["correo","Correo electrónico"],["direccion","Dirección"],["comuna","Comuna"]].map(([campo, etiqueta]) => <label key={campo}>{etiqueta}<input value={datos[campo]} onChange={(event) => setDatos({ ...datos, [campo]: event.target.value })} />{errores[campo] && <small className="error">{errores[campo]}</small>}</label>)}<button className="boton" type="submit">Confirmar pago simulado</button></form></div><aside className="resumen"><h2>Resumen del pedido</h2>{carrito.map((item) => <p key={item.id}><span>{item.nombre} × {item.cantidad}</span><strong>{formatearCLP(item.precio * item.cantidad)}</strong></p>)}<hr /><p className="total"><span>Total</span><strong>{formatearCLP(total)}</strong></p></aside></section>;
}