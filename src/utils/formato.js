export function formatearCLP(valor) {
  return `$${Number(valor).toLocaleString("es-CL")}`;
}

export function totalCarrito(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}