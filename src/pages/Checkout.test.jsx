import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "./Checkout.jsx";
import { StoreProvider } from "../context/StoreContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import * as api from "../services/sonidoVivoApi.js";

describe("Checkout", () => {
  it("confirma la compra mediante un popup y mantiene disponible el seguimiento", async () => {
    localStorage.setItem("sonidoVivo.sesion", JSON.stringify({ nombre: "Ana Música", correo: "ana@sonidovivo.cl", rol: "CLIENTE" }));
    localStorage.setItem("sonidoVivo.carrito.ana@sonidovivo.cl", JSON.stringify([{
      id: "GA001", apiId: 1, categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990, cantidad: 1,
    }]));
    vi.mocked(api.listarProductos).mockResolvedValue([{ id: "GA001", apiId: 1, categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990, descripcion: "Prueba", oferta: false }]);
    vi.mocked(api.crearPedido).mockResolvedValue({ id: "SV-PRUEBA", apiId: 1, fecha: new Date().toISOString(), fechaActualizacion: new Date().toISOString(), estado: "Confirmado", total: 129990, cliente: { nombre: "Ana Música", correo: "ana@sonidovivo.cl" }, items: [], historial: [] });
    render(<MemoryRouter><AuthProvider><StoreProvider><Checkout /></StoreProvider></AuthProvider></MemoryRouter>);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Datos de entrega" })).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText("Nombre completo"), { target: { value: "Ana Música" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@sonidovivo.cl" } });
    fireEvent.change(screen.getByLabelText("Dirección"), { target: { value: "Calle Marina 123" } });
    fireEvent.change(screen.getByLabelText("Comuna"), { target: { value: "Viña del Mar" } });
    fireEvent.click(screen.getByRole("button", { name: "Realizar compra" }));
    await waitFor(() => expect(screen.getByRole("dialog", { name: "¡Gracias por tu compra!" })).toBeInTheDocument());
    expect(screen.getByText("Compra realizada")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver seguimiento" })).toBeInTheDocument();
  });
});