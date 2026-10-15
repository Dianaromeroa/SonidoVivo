import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";

function estadoStock(stock) {
  if (stock === 0) return { texto: "Agotado", clase: "agotado" };
  if (stock <= 3) return { texto: "Bajo", clase: "critico" };
  return { texto: "Disponible", clase: "disponible" };
}

export default function Vendedor() {
  const { productos, pedidos } = useStore();
  const [busqueda, setBusqueda] = useState("");
  const disponibles = productos.filter((producto) => producto.stock > 0).length;
  const agotados = productos.filter((producto) => producto.stock === 0).length;
  const porPreparar = pedidos.filter((pedido) => pedido.estado === "Confirmado").length;
  const productosVisibles = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return productos;
    return productos.filter((producto) => [producto.id, producto.nombre, producto.categoria, producto.marca].some((valor) => valor.toLowerCase().includes(termino)));
  }, [busqueda, productos]);

  return <section className="dashboard vendedor-dashboard">
    <header className="dashboard-hero"><div><p className="eyebrow">Área restringida · Vendedor</p><h1>Operación de tienda</h1><p>Consulta rápidamente la disponibilidad del catálogo y prepara los pedidos confirmados.</p></div><div className="dashboard-hero-summary"><span>Pedidos por preparar</span><strong>{porPreparar}</strong><small>requieren gestión</small></div></header>
    <div className="dashboard-kpis dashboard-kpis-tres" aria-label="Resumen de operación"><article className="kpi-card"><span className="kpi-icono" aria-hidden="true">✓</span><div><span>Disponibles</span><strong>{disponibles}</strong><small>productos con stock</small></div></article><article className="kpi-card advertencia"><span className="kpi-icono" aria-hidden="true">!</span><div><span>Sin stock</span><strong>{agotados}</strong><small>requieren reposición</small></div></article><article className="kpi-card destacado"><span className="kpi-icono" aria-hidden="true">□</span><div><span>Por preparar</span><strong>{porPreparar}</strong><small>pedidos confirmados</small></div></article></div>
    <div className="dashboard-layout vendedor-layout"><section className="dashboard-card inventario-card"><div className="dashboard-card-header"><div><p className="seccion-etiqueta">Consulta operativa</p><h2>Disponibilidad actual</h2><p>Verifica existencias antes de atender una venta o preparar un pedido.</p></div></div><div className="dashboard-toolbar"><label className="buscador"><span aria-hidden="true">⌕</span><input aria-label="Buscar disponibilidad" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar código, producto, marca o categoría" /></label><span className="resultado-busqueda">{productosVisibles.length} de {productos.length} productos</span></div><div className="tabla-responsive"><table><thead><tr><th>Código</th><th>Producto</th><th>Categoría</th><th>Disponibilidad</th><th>Precio</th></tr></thead><tbody>{productosVisibles.map((producto) => { const estado = estadoStock(producto.stock); return <tr key={producto.id}><td><code>{producto.id}</code></td><td><strong>{producto.nombre}</strong><small>{producto.marca} · {producto.modelo}</small></td><td>{producto.categoria}</td><td><span className={`estado-stock ${estado.clase}`}>{estado.texto}<small>{producto.stock} unidades</small></span></td><td><strong>{formatearCLP(producto.precio)}</strong></td></tr>; })}</tbody></table>{!productosVisibles.length && <div className="tabla-vacia"><strong>No encontramos productos.</strong><span>Prueba con otro término de búsqueda.</span></div>}</div></section><aside className="dashboard-side"><section className="dashboard-card pedidos-card"><div className="dashboard-card-header"><div><p className="seccion-etiqueta">Prioridad</p><h2>Pedidos por preparar</h2></div><span className="contador-alertas">{porPreparar}</span></div>{porPreparar ? <div className="lista-pedidos">{pedidos.filter((pedido) => pedido.estado === "Confirmado").slice(0, 5).map((pedido) => <article key={pedido.id}><div><strong>{pedido.id}</strong><small>{pedido.cliente.nombre} · {pedido.items.length} producto(s)</small></div><strong>{formatearCLP(pedido.total)}</strong></article>)}</div> : <p className="estado-vacio">No hay pedidos pendientes de preparación.</p>}</section><section className="dashboard-card alertas-card"><div className="dashboard-card-header"><div><p className="seccion-etiqueta">Reposición</p><h2>Stock bajo o agotado</h2></div></div>{productos.some((producto) => producto.stock <= 3) ? <ul className="lista-alertas">{productos.filter((producto) => producto.stock <= 3).slice(0, 5).map((producto) => <li key={producto.id}><span className={`alerta-punto ${producto.stock === 0 ? "agotado" : "critico"}`} /><div><strong>{producto.nombre}</strong><small>{producto.stock === 0 ? "Sin unidades disponibles" : `${producto.stock} unidades restantes`}</small></div></li>)}</ul> : <p className="estado-vacio">No hay productos que requieran reposición.</p>}</section></aside></div>
  </section>;
}