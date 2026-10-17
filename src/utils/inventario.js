export function obtenerCategorias(productos) {
  return [...new Set(productos.map((producto) => producto.categoria))].sort();
}

export function filtrarYOrdenarProductos(productos, filtros) {
  const { busqueda = "", categoria = "", stock = "", orden = "nombre" } = filtros;
  const termino = busqueda.trim().toLowerCase();

  return productos
    .filter((producto) => {
      const coincideBusqueda = !termino || [producto.id, producto.nombre, producto.categoria, producto.marca]
        .some((valor) => valor.toLowerCase().includes(termino));
      const coincideCategoria = !categoria || producto.categoria === categoria;
      const coincideStock = !stock || (
        stock === "disponible" ? producto.stock > 3
          : stock === "critico" ? producto.stock > 0 && producto.stock <= 3
            : producto.stock === 0
      );

      return coincideBusqueda && coincideCategoria && coincideStock;
    })
    .sort((a, b) => {
      if (orden === "precio") return a.precio - b.precio;
      if (orden === "stock") return a.stock - b.stock;
      return a.nombre.localeCompare(b.nombre, "es");
    });
}