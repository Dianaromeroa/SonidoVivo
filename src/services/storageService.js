export function leer(clave, respaldo) {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : respaldo;
  } catch {
    return respaldo;
  }
}

export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // La aplicación sigue funcionando aunque el navegador no permita persistencia.
  }
}

export function eliminar(clave) {
  try {
    localStorage.removeItem(clave);
  } catch {
    // No hay acción adicional si el almacenamiento no está disponible.
  }
}