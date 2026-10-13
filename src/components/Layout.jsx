import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function Layout() {
  const { sesion, cerrarSesion } = useAuth();
  const { carrito } = useStore();
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  return <>
    <header className="site-header"><div className="contenedor header-inner">
      <Link className="logo" to="/"><span>♪</span> Sonido Vivo</Link>
      <p>Instrumentos musicales y audio para crear.</p>
    </div></header>
    <nav className="site-nav"><div className="contenedor nav-inner">
      <NavLink to="/" end>Inicio</NavLink><NavLink to="/catalogo">Catálogo</NavLink><NavLink to="/categorias">Categorías</NavLink>
      <NavLink to="/ofertas">Ofertas</NavLink><NavLink to="/contacto">Contacto</NavLink>
      <NavLink to="/carrito">Carrito <span className="contador">{cantidad}</span></NavLink>
      {sesion ? <><NavLink to={sesion.rol === "ADMIN" ? "/admin" : "/vendedor"}>{sesion.rol === "ADMIN" ? "Administración" : "Vendedor"}</NavLink><button className="link-button" onClick={cerrarSesion}>Salir</button></> : <NavLink to="/login">Ingresar</NavLink>}
    </div></nav>
    <main className="contenedor main-content"><Outlet /></main>
    <footer className="site-footer"><div className="contenedor">© 2026 Sonido Vivo · Catálogo basado en la fuente oficial entregada.</div></footer>
  </>;
}