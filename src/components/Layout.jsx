import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useStore } from "../context/StoreContext.jsx";

const enlaces = [
  { to: "/", texto: "Inicio", end: true },
  { to: "/catalogo", texto: "Catálogo" },
  { to: "/categorias", texto: "Categorías" },
  { to: "/reparaciones", texto: "Reparación" },
  { to: "/contacto", texto: "Contacto" },
  { to: "/seguimiento", texto: "Seguir pedido" },
];

export default function Layout() {
  const { sesion, cerrarSesion } = useAuth();
  const { carrito } = useStore();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navegar = useNavigate();
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  const nombreCorto = sesion?.nombre?.trim().split(" ")[0] || "Usuario";

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  function buscar(event) {
    event.preventDefault();
    const termino = busqueda.trim();
    navegar(termino ? `/catalogo?busqueda=${encodeURIComponent(termino)}` : "/catalogo");
    cerrarMenu();
  }

  function navegacion() {
    return <ul className="navbar-nav nav-links-principales">
      {enlaces.map(({ to, texto, end }) => <li className="nav-item" key={to}>
        <NavLink className="nav-link" to={to} end={end} onClick={cerrarMenu}>{texto}</NavLink>
      </li>)}
    </ul>;
  }

  function acceso() {
    if (!sesion) return <div className="cuenta-nav">
      <span aria-hidden="true">♙</span>
      <NavLink to="/login" onClick={cerrarMenu}>Ingresar</NavLink>
      <NavLink className="cuenta-registro" to="/registro" onClick={cerrarMenu}>Crear cuenta</NavLink>
    </div>;

    return <div className="cuenta-nav">
      <span aria-hidden="true">♙</span>
      <span>Hola, {nombreCorto}</span>
      {sesion.rol === "CLIENTE" && <NavLink to="/mis-pedidos" onClick={cerrarMenu}>Mis pedidos</NavLink>}
      {sesion.rol === "ADMIN" && <NavLink to="/admin" onClick={cerrarMenu}>Administración</NavLink>}
      {sesion.rol === "VENDEDOR" && <>
        <NavLink to="/vendedor" onClick={cerrarMenu}>Panel vendedor</NavLink>
        <NavLink to="/vendedor/mensajes" onClick={cerrarMenu}>Mensajes</NavLink>
      </>}
      <button type="button" onClick={cerrarSesion}>Salir</button>
    </div>;
  }

  return <>
    <header className="site-header">
      <nav className="site-navbar" aria-label="Navegación principal">
        <div className="contenedor nav-principal">
          <Link className="marca-logo" to="/" onClick={cerrarMenu}><img src="/img/logo.png" alt="Sonido Vivo" /></Link>
          <div className="navegacion-escritorio">{navegacion()}</div>
          <form className="buscador-navbar" role="search" onSubmit={buscar}>
            <label className="visually-hidden" htmlFor="buscar-navbar">Buscar productos</label>
            <input id="buscar-navbar" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar instrumentos, marcas y más..." />
            <button type="submit" aria-label="Buscar productos">⌕</button>
          </form>
          <div className="acciones-navbar">
            <div className="acceso-escritorio">{acceso()}</div>
            <NavLink className="carrito-nav" to="/carrito" onClick={cerrarMenu} aria-label={`Ir al carrito, ${cantidad} productos`}><span aria-hidden="true">🛒</span><span className="contador">{cantidad}</span></NavLink>
            <button className="menu-toggle" type="button" aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"} aria-controls="menuPrincipal" aria-expanded={menuAbierto} onClick={() => setMenuAbierto((abierto) => !abierto)}><span /><span /><span /></button>
          </div>
        </div>
      </nav>
      <div id="menuPrincipal" className={`menu-movil ${menuAbierto ? "abierto" : ""}`}>
        <div className="contenedor">{navegacion()}<div className="acceso-movil">{acceso()}</div></div>
      </div>
    </header>
    <main className="contenedor main-content"><Outlet /></main>
    <footer className="site-footer">
      <div className="contenedor footer-principal">
        <div className="footer-marca"><Link className="marca-logo footer-logo" to="/"><img src="/img/logo.png" alt="Sonido Vivo" /></Link><p>Instrumentos, equipos, accesorios y taller para acompañar cada etapa de tu música.</p></div>
        <div><h2>Explora</h2><nav aria-label="Navegación del pie">{enlaces.map(({ to, texto }) => <Link key={to} to={to}>{texto}</Link>)}</nav></div>
        <div><h2>Sonido Vivo</h2><p>Viña del Mar, Chile</p><Link className="footer-enlace" to="/contacto">Contáctanos</Link></div>
      </div>
      <div className="contenedor footer-inferior"><span>© {new Date().getFullYear()} Sonido Vivo</span><span>Proyecto académico frontend</span></div>
    </footer>
  </>;
}