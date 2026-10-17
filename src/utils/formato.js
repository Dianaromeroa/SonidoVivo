export function formatearCLP(valor) {
  return `$${Number(valor).toLocaleString("es-CL")}`;
}

export function formatearFecha(fecha, opciones = { dateStyle: "medium" }) {
  return new Date(fecha).toLocaleString("es-CL", opciones);
}

export function totalCarrito(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}