import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import Inicio from "./pages/Inicio.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Categorias from "./pages/Categorias.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import SeguimientoPedido from "./pages/SeguimientoPedido.jsx";
import Login from "./pages/Login.jsx";
import Contacto from "./pages/Contacto.jsx";
import Admin from "./pages/Admin.jsx";
import Vendedor from "./pages/Vendedor.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

export default function App() { return <Routes><Route element={<Layout />}><Route index element={<Inicio />} /><Route path="catalogo" element={<Catalogo />} /><Route path="categorias" element={<Categorias />} /><Route path="ofertas" element={<Ofertas />} /><Route path="producto/:id" element={<DetalleProducto />} /><Route path="carrito" element={<Carrito />} /><Route path="checkout" element={<Checkout />} /><Route path="compra-exitosa/:id" element={<CompraExitosa />} /><Route path="seguimiento/:id" element={<SeguimientoPedido />} /><Route path="login" element={<Login />} /><Route path="contacto" element={<Contacto />} /><Route path="admin" element={<RutaProtegida rol="ADMIN"><Admin /></RutaProtegida>} /><Route path="vendedor" element={<RutaProtegida rol="VENDEDOR"><Vendedor /></RutaProtegida>} /><Route path="*" element={<NoEncontrado />} /></Route></Routes>; }