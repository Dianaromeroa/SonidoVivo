import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import Inicio from "./pages/Inicio.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Categorias from "./pages/Categorias.jsx";
import Reparaciones from "./pages/Reparaciones.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import SeguimientoPedido from "./pages/SeguimientoPedido.jsx";
import MisPedidos from "./pages/MisPedidos.jsx";
import ConsultarPedido from "./pages/ConsultarPedido.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Contacto from "./pages/Contacto.jsx";
import Admin from "./pages/Admin.jsx";
import Vendedor from "./pages/Vendedor.jsx";
import VendedorMensajes from "./pages/VendedorMensajes.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="reparaciones" element={<Reparaciones />} />
        <Route
          path="ofertas"
          element={<Navigate to="/reparaciones" replace />}
        />
        <Route path="producto/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="compra-exitosa/:id" element={<CompraExitosa />} />
        <Route path="seguimiento" element={<ConsultarPedido />} />
        <Route path="seguimiento/:id" element={<SeguimientoPedido />} />
        <Route
          path="mis-pedidos"
          element={
            <RutaProtegida rol="CLIENTE">
              <MisPedidos />
            </RutaProtegida>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="contacto" element={<Contacto />} />
        <Route
          path="admin"
          element={
            <RutaProtegida rol="ADMIN">
              <Admin />
            </RutaProtegida>
          }
        />
        <Route
          path="vendedor"
          element={
            <RutaProtegida rol="VENDEDOR">
              <Vendedor />
            </RutaProtegida>
          }
        />
        <Route
          path="vendedor/mensajes"
          element={
            <RutaProtegida rol="VENDEDOR">
              <VendedorMensajes />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
