export function leer(clave, respaldo) {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : respaldo;
  } catch {
    return respaldo;
  }
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}