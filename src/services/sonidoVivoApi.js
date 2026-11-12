import { api } from "./apiClient.js";
import { mensajeApiAUi, pedidoApiAUi, productoApiAUi, productoUiAApi, usuarioApiAUi } from "./apiMappers.js";

export async function login(email, password) { const data = await api("/auth/login", { method: "POST", token: "", body: JSON.stringify({ email, password }) }); return { token: data.token, usuario: usuarioApiAUi(data.usuario) }; }
export async function registrar(datos) { const usuario = await api("/auth/register", { method: "POST", token: "", body: JSON.stringify({ nombre: datos.nombre, email: datos.correo, password: datos.password, telefono: datos.telefono, direccion: datos.direccion, comuna: datos.comuna, region: datos.region }) }); return usuarioApiAUi(usuario); }
export async function listarProductos() { const data = await api("/api/productos?tamanio=100"); return data.content.map(productoApiAUi); }
export async function crearProducto(producto) { return productoApiAUi(await api("/api/productos", { method: "POST", body: JSON.stringify(productoUiAApi(producto)) })); }
export async function actualizarProducto(producto) { return productoApiAUi(await api(`/api/productos/${producto.apiId}`, { method: "PUT", body: JSON.stringify(productoUiAApi(producto)) })); }
export async function eliminarProducto(apiId) { return api(`/api/productos/${apiId}`, { method: "DELETE" }); }
export async function listarMisPedidos() { return (await api("/api/pedidos")).map(pedidoApiAUi); }
export async function listarPedidosGestion() { return (await api("/api/pedidos/gestion")).map(pedidoApiAUi); }
export async function crearPedido(items) { return pedidoApiAUi(await api("/api/pedidos", { method: "POST", body: JSON.stringify({ items: items.map((item) => ({ productoId: item.apiId, cantidad: item.cantidad })) }) })); }
export async function actualizarEstadoPedido(apiId, estado) { return pedidoApiAUi(await api(`/api/pedidos/${apiId}/estado`, { method: "PUT", body: JSON.stringify({ estado }) })); }
export async function seguimientoPedido(codigoPedido, correo) { return pedidoApiAUi(await api("/api/pedidos/seguimiento", { method: "POST", token: "", body: JSON.stringify({ codigoPedido, correo }) })); }
export async function enviarContacto(datos) { return mensajeApiAUi(await api("/api/contacto", { method: "POST", token: "", body: JSON.stringify(datos) })); }
export async function enviarReparacion(datos) { return mensajeApiAUi(await api("/api/reparaciones", { method: "POST", token: "", body: JSON.stringify(datos) })); }
export async function listarMensajes() { return (await api("/api/mensajes")).map(mensajeApiAUi); }
export async function responderMensaje(mensaje, respuesta) { return mensajeApiAUi(await api(`/api/mensajes/${mensaje.tipo}/${mensaje.id}/respuesta`, { method: "PUT", body: JSON.stringify({ respuesta }) })); }