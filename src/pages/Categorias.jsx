import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import ImagenProducto from "../components/ImagenProducto.jsx";

export default function Categorias() {
  const { productos } = useStore(); const categorias = [...new Set(productos.map((item) => item.categoria))].sort();
  return <><section className="pagina-hero pagina-hero-categorias"><div><p className="eyebrow">Explora por tipo</p><h1>Todo lo que necesitas para sonar mejor.</h1><p>Encuentra instrumentos, amplificación, accesorios y equipos organizados para que llegues más rápido a lo que buscas.</p></div><p className="pagina-hero-destacado"><span aria-hidden="true">→</span> Elige una categoría y descubre sus productos</p></section><section className="grid-categorias">{categorias.map((categoria) => { const productosCategoria = productos.filter((item) => item.categoria === categoria); const destacado = productosCategoria[0]; return <Link key={categoria} className="categoria-card" to={`/catalogo?categoria=${encodeURIComponent(categoria)}`}><div className="categoria-miniatura">{destacado && <ImagenProducto producto={destacado} className="categoria-imagen" fallbackClassName="categoria-icono" />}</div><div><strong>{categoria}</strong><small>{productosCategoria.length} productos</small></div><span className="categoria-flecha" aria-hidden="true">→</span></Link>; })}</section></>;
}