import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function Layout() {
  const { sesion, cerrarSesion } = useAuth();
  const { carrito } = useStore();
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  const nombreCorto = sesion?.nombre?.trim().split(" ")[0] || "Usuario";
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);
  return <>
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark site-navbar">
        <div className="contenedor nav-principal">
          <Link className="navbar-brand logo" to="/" onClick={cerrarMenu}><span>♪</span> Sonido Vivo</Link>
          <div className="nav-mobile-actions">
            <NavLink className="carrito-nav" to="/carrito" onClick={cerrarMenu} aria-label={`Ir al carrito, ${cantidad} productos`}><span aria-hidden="true">🛒</span><span className="d-none d-sm-inline">Carrito</span><span className="contador">{cantidad}</span></NavLink>
            <button className="navbar-toggler" type="button" aria-label="Abrir menú de navegación" aria-controls="menuPrincipal" aria-expanded={menuAbierto} onClick={() => setMenuAbierto((abierto) => !abierto)}><span className="navbar-toggler-icon" /></button>
          </div>
          <div id="menuPrincipal" className={`navbar-collapse ${menuAbierto ? "show" : "collapse"}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links-principales">
              <li className="nav-item"><NavLink className="nav-link" to="/" end onClick={cerrarMenu}>Inicio</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/catalogo" onClick={cerrarMenu}>Catálogo</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/categorias" onClick={cerrarMenu}>Categorías</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/ofertas" onClick={cerrarMenu}>Ofertas</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contacto" onClick={cerrarMenu}>Contacto</NavLink></li>
            </ul>
            <NavLink className="carrito-nav carrito-escritorio" to="/carrito" onClick={cerrarMenu}><span aria-hidden="true">🛒</span><span>Mi carrito</span><span className="contador">{cantidad}</span></NavLink>
          </div>
        </div>
      </nav>
      <div className="contenedor acceso-usuario">
        {sesion ? <div><span className="saludo-usuario">Hola, {nombreCorto}</span><NavLink to={sesion.rol === "ADMIN" ? "/admin" : "/vendedor"}>{sesion.rol === "ADMIN" ? "Administración" : "Panel vendedor"}</NavLink><span>|</span><button className="link-button" onClick={cerrarSesion}>Cerrar sesión</button></div> : <div><NavLink to="/login">Iniciar sesión</NavLink><span>|</span><NavLink to="/registro">Registrarse</NavLink></div>}
      </div>
    </header>
    <main className="contenedor main-content"><Outlet /></main>
    <footer className="site-footer"><div className="contenedor">© 2026 Sonido Vivo · Catálogo basado en la fuente oficial entregada.</div></footer>
  </>;
}