import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { StoreProvider } from "../context/StoreContext.jsx";

const pedidoAna = { id: "SV-000001", fecha: "2026-10-16T12:00:00.000Z", fechaActualizacion: "2026-10-16T13:00:00.000Z", estado: "Despacho", total: 129990, cliente: { nombre: "Ana Música", correo: "ana@sonidovivo.cl" }, items: [{ id: "GA001", nombre: "Guitarra", precio: 129990, cantidad: 1 }], historial: [{ estado: "Confirmado", fecha: "2026-10-16T12:00:00.000Z" }, { estado: "Despacho", fecha: "2026-10-16T13:00:00.000Z" }] };
const pedidoOtroCliente = { ...pedidoAna, id: "SV-000002", cliente: { nombre: "Otra persona", correo: "otra@sonidovivo.cl" } };

function renderApp(ruta) {
  localStorage.setItem("sonidoVivo.pedidos", JSON.stringify([pedidoAna, pedidoOtroCliente]));
  return render(<MemoryRouter initialEntries={[ruta]}><AuthProvider><StoreProvider><App /></StoreProvider></AuthProvider></MemoryRouter>);
}

describe("accesos de seguimiento para clientes", () => {
  it("muestra Mis pedidos a un cliente y filtra compras de otros correos", () => {
    localStorage.setItem("sonidoVivo.sesion", JSON.stringify({ nombre: "Ana Música", correo: "ana@sonidovivo.cl", rol: "CLIENTE" }));
    renderApp("/mis-pedidos");
    expect(screen.getByRole("heading", { name: "Mis pedidos" })).toBeInTheDocument();
    expect(screen.getByText("SV-000001")).toBeInTheDocument();
    expect(screen.queryByText("SV-000002")).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Mis pedidos" }).length).toBeGreaterThan(0);
  });

  it("permite consultar un pedido por código sin iniciar sesión", () => {
    renderApp("/seguimiento");
    fireEvent.change(screen.getByLabelText("Código de pedido"), { target: { value: "sv-000001" } });
    fireEvent.click(screen.getByRole("button", { name: "Ver pedido" }));
    expect(screen.getByRole("heading", { name: "SV-000001" })).toBeInTheDocument();
    expect(screen.getAllByText("Despacho").length).toBeGreaterThan(0);
  });
});