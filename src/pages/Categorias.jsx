import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Categorias() {
  const { productos } = useStore(); const categorias = [...new Set(productos.map((item) => item.categoria))].sort();
  return <><section className="page-heading"><p className="eyebrow">Explora por tipo</p><h1>Categorías</h1><p>Organizadas a partir del catálogo oficial de Sonido Vivo.</p></section><section className="grid-categorias">{categorias.map((categoria) => <Link key={categoria} className="categoria-card" to={`/catalogo?categoria=${encodeURIComponent(categoria)}`}><span>♫</span><strong>{categoria}</strong><small>{productos.filter((item) => item.categoria === categoria).length} productos</small></Link>)}</section></>;
}