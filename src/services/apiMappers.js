export function usuarioApiAUi(usuario) {
  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.email, rol: usuario.rol, telefono: usuario.telefono || "", direccion: usuario.direccion || "", comuna: usuario.comuna || "", region: usuario.region || "" };
}

export function productoApiAUi(producto) {
  return { id: producto.codigo, apiId: producto.id, codigo: producto.codigo, nombre: producto.nombre, categoria: producto.categoria, marca: producto.marca || "", modelo: producto.modelo || "", descripcion: producto.descripcion || "", precio: Number(producto.precio), stock: producto.stock, imagen: producto.imagen || "", oferta: producto.oferta };
}

export function productoUiAApi(producto) {
  return { codigo: producto.id?.trim().toUpperCase(), nombre: producto.nombre?.trim(), categoria: producto.categoria?.trim(), marca: producto.marca?.trim() || null, modelo: producto.modelo?.trim() || null, descripcion: producto.descripcion?.trim() || null, precio: Number(producto.precio), stock: Number(producto.stock), imagen: producto.imagen?.trim() || null, oferta: Boolean(producto.oferta) };
}

export function estadoUi(estado) { return estado === "Preparacion" ? "Preparación" : estado; }
export function estadoApi(estado) { return estado === "Preparación" ? "Preparacion" : estado; }

export function pedidoApiAUi(pedido) {
  return { id: pedido.codigoPedido, apiId: pedido.id, fecha: pedido.fechaPedido, fechaActualizacion: pedido.fechaActualizacion, estado: estadoUi(pedido.estado), total: Number(pedido.total), cliente: usuarioApiAUi(pedido.cliente), items: pedido.items.map((item) => ({ id: item.codigoProducto, apiId: item.productoId, nombre: item.nombreProducto, precio: Number(item.precioUnitario), cantidad: item.cantidad })), historial: pedido.historial.map((evento) => ({ estado: estadoUi(evento.estado), fecha: evento.fecha })) };
}

export function mensajeApiAUi(mensaje) {
  return { ...mensaje, id: String(mensaje.id), estado: mensaje.estado === "RESPONDIDO" || mensaje.estado === "RESPONDIDA" ? "Respondido" : mensaje.tipo === "reparacion" ? "Solicitud recibida" : "Mensaje recibido" };
}