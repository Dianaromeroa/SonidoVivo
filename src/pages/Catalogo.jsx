import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductoCard from "../components/ProductoCard.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function Catalogo() {
  const { productos } = useStore(); const [params] = useSearchParams(); const [busqueda, setBusqueda] = useState(""); const [categoria, setCategoria] = useState(() => params.get("categoria") || ""); const [orden, setOrden] = useState("nombre");
  const categorias = [...new Set(productos.map((producto) => producto.categoria))].sort();
  const filtrados = useMemo(() => productos.filter((producto) => `${producto.nombre} ${producto.marca} ${producto.modelo}`.toLowerCase().includes(busqueda.toLowerCase()) && (!categoria || producto.categoria === categoria)).sort((a, b) => orden === "precio-asc" ? a.precio - b.precio : orden === "precio-desc" ? b.precio - a.precio : a.nombre.localeCompare(b.nombre)), [productos, busqueda, categoria, orden]);
  return <><section className="page-heading"><p className="eyebrow">Catálogo oficial</p><h1>Instrumentos y accesorios</h1><p>Productos cargados exclusivamente desde la hoja “Catálogo de Productos”.</p></section>
    <section className="filtros"><input aria-label="Buscar producto" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Busca por nombre, marca o modelo" /><select aria-label="Filtrar por categoría" value={categoria} onChange={(event) => setCategoria(event.target.value)}><option value="">Todas las categorías</option>{categorias.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Ordenar productos" value={orden} onChange={(event) => setOrden(event.target.value)}><option value="nombre">Nombre</option><option value="precio-asc">Precio: menor a mayor</option><option value="precio-desc">Precio: mayor a menor</option></select></section>
    <p className="resultado">{filtrados.length} productos encontrados</p><section className="grid-productos">{filtrados.map((producto) => <ProductoCard key={producto.id} producto={producto} />)}</section></>;
}