import { Link } from "react-router-dom";

export default function Ofertas() { return <section className="empty"><p className="eyebrow">Ofertas</p><h1>Próximamente</h1><p>Las promociones se publicarán aquí cuando estén disponibles.</p><Link className="boton" to="/catalogo">Explorar catálogo</Link></section>; }