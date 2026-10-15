export const estadosPedido = ["Confirmado", "Preparación", "Despacho", "Entregado"];

export function siguienteEstadoPedido(estado) {
  const indice = estadosPedido.indexOf(estado);
  return indice >= 0 ? estadosPedido[indice + 1] ?? null : null;
}

export function transicionPedidoPermitida(estadoActual, estadoNuevo) {
  return siguienteEstadoPedido(estadoActual) === estadoNuevo;
}

export function historialInicialPedido(fecha) {
  return [{ estado: "Confirmado", fecha }];
}

export function normalizarPedido(pedido) {
  const fecha = pedido.fechaActualizacion || pedido.fecha;
  return {
    ...pedido,
    estado: estadosPedido.includes(pedido.estado) ? pedido.estado : "Confirmado",
    fechaActualizacion: fecha,
    historial: Array.isArray(pedido.historial) && pedido.historial.length
      ? pedido.historial
      : historialInicialPedido(pedido.fecha),
  };
}