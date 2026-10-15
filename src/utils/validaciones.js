export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function validarCheckout(datos) {
  const errores = {};
  if (datos.nombre.trim().length < 3) errores.nombre = "Ingresa tu nombre completo.";
  if (!validarCorreo(datos.correo)) errores.correo = "Ingresa un correo válido.";
  if (datos.direccion.trim().length < 5) errores.direccion = "Ingresa una dirección de entrega.";
  if (datos.comuna.trim().length < 2) errores.comuna = "Ingresa una comuna válida.";
  return errores;
}

export function validarProductoParaEdicion(producto) {
  const errores = {};
  const camposTexto = [
    ["id", "El código del producto es obligatorio."],
    ["nombre", "El nombre del producto es obligatorio."],
    ["categoria", "La categoría del producto es obligatoria."],
    ["marca", "La marca del producto es obligatoria."],
    ["modelo", "El modelo del producto es obligatorio."],
  ];

  camposTexto.forEach(([campo, mensaje]) => {
    if (!String(producto[campo] ?? "").trim()) errores[campo] = mensaje;
  });

  const precio = Number(producto.precio);
  const stock = Number(producto.stock);
  if (!String(producto.precio ?? "").trim() || !Number.isFinite(precio) || precio <= 0) errores.precio = "Ingresa un precio mayor que cero.";
  if (!String(producto.stock ?? "").trim() || !Number.isInteger(stock) || stock < 0) errores.stock = "Ingresa un stock entero mayor o igual a cero.";
  return errores;
}