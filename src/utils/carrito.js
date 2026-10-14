import { totalCarrito } from "./formato.js";

export const cuponesSonidoVivo = {
  SONIDOVIVO10: { porcentaje: 0.1, etiqueta: "10% de descuento" },
  MUSICA5: { porcentaje: 0.05, etiqueta: "5% de descuento" },
};

export function sincronizarCarritoConInventario(carrito, productos) {
  return carrito.reduce((sincronizado, item) => {
    const producto = productos.find((registro) => registro.id === item.id);
    if (!producto || producto.stock <= 0) return sincronizado;
    const cantidad = Math.min(item.cantidad, producto.stock);
    return [...sincronizado, { ...producto, cantidad }];
  }, []);
}

export function calcularResumenCarrito(carrito, descuento) {
  const subtotal = totalCarrito(carrito);
  const montoDescuento = descuento ? Math.round(subtotal * descuento.porcentaje) : 0;
  return { subtotal, montoDescuento, totalFinal: subtotal - montoDescuento };
}