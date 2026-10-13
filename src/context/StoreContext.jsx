import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { productosIniciales } from "../data/productosIniciales.js";
import { guardar, leer } from "../services/storageService.js";
import { totalCarrito } from "../utils/formato.js";

const StoreContext = createContext(null);
const claves = { inventario: "sonidoVivo.inventario", carrito: "sonidoVivo.carrito", pedidos: "sonidoVivo.pedidos" };

export function StoreProvider({ children }) {
  const [productos, setProductos] = useState(() => leer(claves.inventario, productosIniciales));
  const [carrito, setCarrito] = useState(() => leer(claves.carrito, []));
  const [pedidos, setPedidos] = useState(() => leer(claves.pedidos, []));
  useEffect(() => guardar(claves.inventario, productos), [productos]);
  useEffect(() => guardar(claves.carrito, carrito), [carrito]);
  useEffect(() => guardar(claves.pedidos, pedidos), [pedidos]);

  function agregarAlCarrito(producto) {
    if (producto.stock < 1) return { ok: false, mensaje: "Este producto no tiene stock disponible." };
    const actual = carrito.find((item) => item.id === producto.id);
    if (actual && actual.cantidad >= producto.stock) return { ok: false, mensaje: "No puedes superar el stock disponible." };
    setCarrito((items) => actual
      ? items.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
      : [...items, { ...producto, cantidad: 1 }]);
    return { ok: true };
  }
  function cambiarCantidad(id, cantidad) {
    const producto = productos.find((item) => item.id === id);
    if (!producto) return;
    if (cantidad <= 0) { setCarrito((items) => items.filter((item) => item.id !== id)); return; }
    setCarrito((items) => items.map((item) => item.id === id ? { ...item, cantidad: Math.min(cantidad, producto.stock) } : item));
  }
  function confirmarCompra(datos) {
    if (!carrito.length) return null;
    const id = `SV-${String(Date.now()).slice(-6)}`;
    const pedido = { id, fecha: new Date().toISOString(), cliente: datos, items: carrito, total: totalCarrito(carrito), estado: "Confirmado" };
    setProductos((items) => items.map((producto) => {
      const comprado = carrito.find((item) => item.id === producto.id);
      return comprado ? { ...producto, stock: producto.stock - comprado.cantidad } : producto;
    }));
    setPedidos((items) => [pedido, ...items]);
    setCarrito([]);
    return pedido;
  }
  function actualizarProducto(productoEditado) {
    setProductos((items) => items.map((item) => item.id === productoEditado.id ? productoEditado : item));
  }
  const valor = useMemo(() => ({ productos, carrito, pedidos, agregarAlCarrito, cambiarCantidad, confirmarCompra, actualizarProducto, total: totalCarrito(carrito) }), [productos, carrito, pedidos]);
  return <StoreContext.Provider value={valor}>{children}</StoreContext.Provider>;
}
export function useStore() { return useContext(StoreContext); }