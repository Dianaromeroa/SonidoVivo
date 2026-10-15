import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";

const productoVacio = { id: "", nombre: "", categoria: "", marca: "", modelo: "", precio: "", stock: "", descripcion: "", imagen: "" };

function estadoStock(stock) {
  if (stock === 0) return { texto: "Agotado", clase: "agotado" };
  if (stock <= 3) return { texto: "Crítico", clase: "critico" };
  return { texto: "Disponible", clase: "disponible" };
}

export default function Admin() {
  const { productos, pedidos, crearProducto, actualizarProducto, eliminarProducto } = useStore();
  const [busqueda, setBusqueda] = useState("");
  const [formulario, setFormulario] = useState(null);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [erroresFormulario, setErroresFormulario] = useState({});
  const ventas = pedidos.reduce((total, pedido) => total + pedido.total, 0);
  const bajoStock = productos.filter((producto) => producto.stock > 0 && producto.stock <= 3);
  const agotados = productos.filter((producto) => producto.stock === 0).length;
  const visibles = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return productos;
    return productos.filter((producto) => [producto.id, producto.nombre, producto.categoria, producto.marca].some((valor) => valor.toLowerCase().includes(termino)));
  }, [busqueda, productos]);

  function abrirCreacion() { setErroresFormulario({}); setModoFormulario("crear"); setFormulario({ ...productoVacio }); }
  function abrirEdicion(producto) { setErroresFormulario({}); setModoFormulario("editar"); setFormulario({ ...producto, imagen: producto.imagen || "" }); }
  function cerrarFormulario() { setErroresFormulario({}); setFormulario(null); }
  function actualizarCampo(campo, valor) { setFormulario((actual) => ({ ...actual, [campo]: valor })); }
  function guardar(event) {
    event.preventDefault();
    const resultado = modoFormulario === "crear" ? crearProducto(formulario) : actualizarProducto(formulario);
    if (!resultado.ok) { setErroresFormulario(resultado.errores); return; }
    cerrarFormulario();
  }
  function eliminar(producto) {
    if (window.confirm(`¿Eliminar "${producto.nombre}" del inventario?`)) eliminarProducto(producto.id);
  }

  return <section className="dashboard">
    <header className="dashboard-hero"><div><p className="eyebrow">Área restringida · Administración</p><h1>Centro de control</h1><p>Gestiona el catálogo, supervisa el inventario y revisa la actividad comercial de Sonido Vivo.</p></div><div className="dashboard-hero-summary"><span>Catálogo activo</span><strong>{productos.length}</strong><small>productos registrados</small></div></header>
    <div className="dashboard-kpis" aria-label="Resumen administrativo"><article className="kpi-card"><span className="kpi-icono" aria-hidden="true">▦</span><div><span>Productos</span><strong>{productos.length}</strong><small>en el catálogo local</small></div></article><article className="kpi-card advertencia"><span className="kpi-icono" aria-hidden="true">!</span><div><span>Stock crítico</span><strong>{bajoStock.length}</strong><small>{agotados} producto(s) agotado(s)</small></div></article><article className="kpi-card"><span className="kpi-icono" aria-hidden="true">□</span><div><span>Pedidos</span><strong>{pedidos.length}</strong><small>compras registradas</small></div></article><article className="kpi-card destacado"><span className="kpi-icono" aria-hidden="true">$</span><div><span>Ventas</span><strong>{formatearCLP(ventas)}</strong><small>total confirmado</small></div></article></div>
    <div className="dashboard-layout">
      <section className="dashboard-card inventario-card"><div className="dashboard-card-header"><div><p className="seccion-etiqueta">Catálogo</p><h2>Inventario</h2><p>Administra los productos y mantén actualizada su disponibilidad.</p></div><button className="boton" onClick={abrirCreacion}>+ Nuevo producto</button></div><div className="dashboard-toolbar"><label className="buscador"><span aria-hidden="true">⌕</span><input aria-label="Buscar inventario" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar código, producto, marca o categoría" /></label><span className="resultado-busqueda">{visibles.length} de {productos.length} productos</span></div><div className="tabla-responsive"><table><thead><tr><th>Código</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{visibles.map((producto) => { const estado = estadoStock(producto.stock); return <tr key={producto.id}><td><code>{producto.id}</code></td><td><strong>{producto.nombre}</strong><small>{producto.marca} · {producto.modelo}</small></td><td>{producto.categoria}</td><td><strong>{formatearCLP(producto.precio)}</strong></td><td><span className={`estado-stock ${estado.clase}`}>{estado.texto}<small>{producto.stock} unidades</small></span></td><td><div className="acciones acciones-tabla"><button className="boton small secundario" onClick={() => abrirEdicion(producto)}>Editar</button><button className="boton small peligro" onClick={() => eliminar(producto)}>Eliminar</button></div></td></tr>; })}</tbody></table>{!visibles.length && <div className="tabla-vacia"><strong>No encontramos productos.</strong><span>Prueba con otro término de búsqueda.</span></div>}</div></section>
      <aside className="dashboard-side"><section className="dashboard-card alertas-card"><div className="dashboard-card-header"><div><p className="seccion-etiqueta">Atención requerida</p><h2>Alertas de stock</h2></div><span className="contador-alertas">{bajoStock.length + agotados}</span></div>{bajoStock.length || agotados ? <ul className="lista-alertas">{productos.filter((producto) => producto.stock <= 3).slice(0, 5).map((producto) => <li key={producto.id}><span className={`alerta-punto ${producto.stock === 0 ? "agotado" : "critico"}`} /><div><strong>{producto.nombre}</strong><small>{producto.id} · {producto.stock === 0 ? "Sin unidades" : `${producto.stock} unidades restantes`}</small></div></li>)}</ul> : <p className="estado-vacio">El inventario no tiene alertas de stock.</p>}</section><section className="dashboard-card pedidos-card"><div className="dashboard-card-header"><div><p className="seccion-etiqueta">Actividad reciente</p><h2>Últimos pedidos</h2></div></div>{pedidos.length ? <div className="lista-pedidos">{pedidos.slice(0, 5).map((pedido) => <article key={pedido.id}><div><strong>{pedido.id}</strong><small>{pedido.cliente.nombre} · {new Date(pedido.fecha).toLocaleDateString("es-CL")}</small></div><span className="badge">{pedido.estado}</span><strong>{formatearCLP(pedido.total)}</strong></article>)}</div> : <p className="estado-vacio">Aún no existen pedidos registrados.</p>}</section></aside>
    </div>
    {formulario && <div className="modal-fondo"><form className="modal formulario producto-formulario" onSubmit={guardar} noValidate><div className="modal-cabecera"><div><p className="seccion-etiqueta">Inventario</p><h2>{modoFormulario === "crear" ? "Nuevo producto" : "Editar producto"}</h2></div><button className="cerrar-modal" type="button" onClick={cerrarFormulario} aria-label="Cerrar formulario">×</button></div>{modoFormulario === "editar" && <p>Actualiza la información de <strong>{formulario.id}</strong>.</p>}<div className="formulario-producto-grid"><label>Código<input aria-label="Código" disabled={modoFormulario === "editar"} value={formulario.id} onChange={(event) => actualizarCampo("id", event.target.value)} />{erroresFormulario.id && <small className="error">{erroresFormulario.id}</small>}</label><label>Nombre<input aria-label="Nombre" value={formulario.nombre} onChange={(event) => actualizarCampo("nombre", event.target.value)} />{erroresFormulario.nombre && <small className="error">{erroresFormulario.nombre}</small>}</label><label>Categoría<input aria-label="Categoría" value={formulario.categoria} onChange={(event) => actualizarCampo("categoria", event.target.value)} />{erroresFormulario.categoria && <small className="error">{erroresFormulario.categoria}</small>}</label><label>Marca<input aria-label="Marca" value={formulario.marca} onChange={(event) => actualizarCampo("marca", event.target.value)} />{erroresFormulario.marca && <small className="error">{erroresFormulario.marca}</small>}</label><label>Modelo<input aria-label="Modelo" value={formulario.modelo} onChange={(event) => actualizarCampo("modelo", event.target.value)} />{erroresFormulario.modelo && <small className="error">{erroresFormulario.modelo}</small>}</label><label>Precio (CLP)<input aria-label="Precio (CLP)" type="number" min="1" step="1" value={formulario.precio} onChange={(event) => actualizarCampo("precio", event.target.value)} />{erroresFormulario.precio && <small className="error">{erroresFormulario.precio}</small>}</label><label>Stock<input aria-label="Stock" type="number" min="0" step="1" value={formulario.stock} onChange={(event) => actualizarCampo("stock", event.target.value)} />{erroresFormulario.stock && <small className="error">{erroresFormulario.stock}</small>}</label></div><label>Descripción<textarea aria-label="Descripción" rows="3" value={formulario.descripcion} onChange={(event) => actualizarCampo("descripcion", event.target.value)} /></label><p className="form-text">Imagen pendiente: el producto se guarda con un espacio vacío para vincular una imagen IA posteriormente.</p><div className="acciones acciones-formulario"><button type="button" className="boton secundario" onClick={cerrarFormulario}>Cancelar</button><button className="boton" type="submit">{modoFormulario === "crear" ? "Crear producto" : "Guardar cambios"}</button></div></form></div>}
  </section>;
}