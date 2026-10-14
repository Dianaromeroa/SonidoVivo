import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { productosIniciales } from "../data/productosIniciales.js";
import { guardar, leer } from "../services/storageService.js";
import { calcularResumenCarrito, cuponesSonidoVivo, sincronizarCarritoConInventario } from "../utils/carrito.js";

const StoreContext = createContext(null);
const claves = { inventario: "sonidoVivo.inventario", carrito: "sonidoVivo.carrito", pedidos: "sonidoVivo.pedidos", descuento: "sonidoVivo.descuento" };

export function StoreProvider({ children }) {
  const [productos, setProductos] = useState(() => leer(claves.inventario, productosIniciales));
  const [carrito, setCarrito] = useState(() => leer(claves.carrito, []));
  const [pedidos, setPedidos] = useState(() => leer(claves.pedidos, []));
  const [descuento, setDescuento] = useState(() => leer(claves.descuento, null));
  useEffect(() => guardar(claves.inventario, productos), [productos]);
  useEffect(() => guardar(claves.carrito, carrito), [carrito]);
  useEffect(() => guardar(claves.pedidos, pedidos), [pedidos]);
  useEffect(() => { if (descuento) guardar(claves.descuento, descuento); else localStorage.removeItem(claves.descuento); }, [descuento]);
  useEffect(() => {
    setCarrito((actual) => {
      const sincronizado = sincronizarCarritoConInventario(actual, productos);
      return JSON.stringify(actual) === JSON.stringify(sincronizado) ? actual : sincronizado;
    });
  }, [productos]);
  useEffect(() => { if (!carrito.length && descuento) setDescuento(null); }, [carrito.length, descuento]);

  function agregarAlCarrito(producto, cantidad = 1) {
    const productoActual = productos.find((item) => item.id === producto.id);
    const cantidadAgregar = Math.max(1, Number(cantidad) || 1);
    if (!productoActual) return { ok: false, mensaje: "Este producto ya no está disponible en la tienda." };
    if (productoActual.stock < 1) return { ok: false, mensaje: "Este producto no tiene stock disponible." };
    const actual = carrito.find((item) => item.id === producto.id);
    const cantidadActual = actual?.cantidad || 0;
    if (cantidadActual + cantidadAgregar > productoActual.stock) return { ok: false, mensaje: `Solo hay ${productoActual.stock} unidad(es) disponibles de ${productoActual.nombre}.` };
    setCarrito((items) => actual
      ? items.map((item) => item.id === producto.id ? { ...productoActual, cantidad: item.cantidad + cantidadAgregar } : item)
      : [...items, { ...productoActual, cantidad: cantidadAgregar }]);
    return { ok: true };
  }
  function cambiarCantidad(id, cantidad) {
    const producto = productos.find((item) => item.id === id);
    if (!producto) { setCarrito((items) => items.filter((item) => item.id !== id)); return; }
    if (cantidad <= 0) { setCarrito((items) => items.filter((item) => item.id !== id)); return; }
    setCarrito((items) => items.map((item) => item.id === id ? { ...item, cantidad: Math.min(cantidad, producto.stock) } : item));
  }
  function vaciarCarrito() { setCarrito([]); setDescuento(null); }
  function aplicarCupon(codigoIngresado) {
    if (!carrito.length) return { ok: false, mensaje: "Agrega productos al carrito antes de aplicar un cupón." };
    if (descuento) return { ok: false, mensaje: "Ya aplicaste un cupón de descuento en esta compra." };
    const codigo = codigoIngresado.trim().toUpperCase();
    if (!cuponesSonidoVivo[codigo]) return { ok: false, mensaje: "El código ingresado no es válido." };
    const nuevoDescuento = { codigo, ...cuponesSonidoVivo[codigo] };
    setDescuento(nuevoDescuento);
    return { ok: true, mensaje: `Cupón ${codigo} aplicado: ${nuevoDescuento.etiqueta}.` };
  }
  function confirmarCompra(datos) {
    const carritoValidado = sincronizarCarritoConInventario(carrito, productos);
    if (!carritoValidado.length) { setCarrito([]); setDescuento(null); return { ok: false, mensaje: "El carrito está vacío o los productos ya no tienen stock disponible." }; }
    if (carritoValidado.length !== carrito.length || carritoValidado.some((item) => carrito.find((actual) => actual.id === item.id)?.cantidad !== item.cantidad)) {
      setCarrito(carritoValidado);
      return { ok: false, mensaje: "El inventario cambió. Revisamos y ajustamos tu carrito antes de pagar." };
    }
    const id = `SV-${String(Date.now()).slice(-6)}`;
    const resumen = calcularResumenCarrito(carritoValidado, descuento);
    const pedido = { id, fecha: new Date().toISOString(), cliente: datos, items: carritoValidado, subtotal: resumen.subtotal, descuento, descuentoMonto: resumen.montoDescuento, total: resumen.totalFinal, estado: "Confirmado" };
    setProductos((items) => items.map((producto) => {
      const comprado = carritoValidado.find((item) => item.id === producto.id);
      return comprado ? { ...producto, stock: Math.max(0, producto.stock - comprado.cantidad) } : producto;
    }));
    setPedidos((items) => [pedido, ...items]);
    setCarrito([]);
    setDescuento(null);
    return { ok: true, pedido };
  }
  function actualizarProducto(productoEditado) {
    setProductos((items) => items.map((item) => item.id === productoEditado.id ? productoEditado : item));
  }
  const resumen = useMemo(() => calcularResumenCarrito(carrito, descuento), [carrito, descuento]);
  const valor = useMemo(() => ({ productos, carrito, pedidos, descuento, agregarAlCarrito, cambiarCantidad, vaciarCarrito, aplicarCupon, confirmarCompra, actualizarProducto, ...resumen }), [productos, carrito, pedidos, descuento, resumen]);
  return <StoreContext.Provider value={valor}>{children}</StoreContext.Provider>;
}
export function useStore() { return useContext(StoreContext); }