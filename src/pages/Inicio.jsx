import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import ProductoCard from "../components/ProductoCard.jsx";

export default function Inicio() {
  const { productos } = useStore();
  return <>
    <section className="hero"><div><p className="eyebrow">Música que cobra vida</p><h1>Encuentra el instrumento que busca tu sonido.</h1><p>Catálogo, disponibilidad y compra en línea para músicos, estudiantes y creadores.</p><Link className="boton" to="/catalogo">Explorar catálogo</Link></div><div className="hero-note"><strong>{productos.length}</strong><span>productos del catálogo oficial disponibles para explorar.</span></div></section>
    <section className="seccion-cabecera"><div><p className="eyebrow">Destacados</p><h2>Comienza a crear</h2></div><Link to="/catalogo">Ver todo el catálogo →</Link></section>
    <section className="grid-productos">{productos.slice(0, 3).map((producto) => <ProductoCard key={producto.id} producto={producto} />)}</section>
  </>;
}