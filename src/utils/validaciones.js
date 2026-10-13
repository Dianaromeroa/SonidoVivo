export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function validarCheckout(datos) {
  const errores = {};
  if (datos.nombre.trim().length < 3) errores.nombre = "Ingresa tu nombre completo.";
  if (!validarCorreo(datos.correo)) errores.correo = "Ingresa un correo válido.";
  if (datos.direccion.trim().length < 5) errores.direccion = "Ingresa una dirección de entrega.";
  return errores;
}