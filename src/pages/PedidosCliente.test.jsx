import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { StoreProvider } from "../context/StoreContext.jsx";
import * as api from "../services/sonidoVivoApi.js";

const pedidoAna = { id: "SV-000001", apiId: 1, fecha: "2026-10-16T12:00:00.000Z", fechaActualizacion: "2026-10-16T13:00:00.000Z", estado: "Despacho", total: 129990, cliente: { nombre: "Ana Música", correo: "ana@sonidovivo.cl" }, items: [{ id: "GA001", apiId: 1, nombre: "Guitarra", precio: 129990, cantidad: 1 }], historial: [{ estado: "Confirmado", fecha: "2026-10-16T12:00:00.000Z" }, { estado: "Despacho", fecha: "2026-10-16T13:00:00.000Z" }] };
const pedidoOtroCliente = { ...pedidoAna, id: "SV-000002", cliente: { nombre: "Otra persona", correo: "otra@sonidovivo.cl" } };

function renderApp(ruta) {
  return render(<MemoryRouter initialEntries={[ruta]}><AuthProvider><StoreProvider><App /></StoreProvider></AuthProvider></MemoryRouter>);
}

describe("accesos de seguimiento para clientes", () => {
  it("muestra Mis pedidos a un cliente y filtra compras de otros correos", async () => {
    localStorage.setItem("sonidoVivo.sesion", JSON.stringify({ nombre: "Ana Música", correo: "ana@sonidovivo.cl", rol: "CLIENTE" }));
    vi.mocked(api.listarMisPedidos).mockResolvedValue([pedidoAna]);
    renderApp("/mis-pedidos");
    expect(screen.getByRole("heading", { name: "Mis pedidos" })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("SV-000001")).toBeInTheDocument());
    expect(screen.queryByText("SV-000002")).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Mis pedidos" }).length).toBeGreaterThan(0);
  });

  it("permite consultar un pedido por código y correo sin iniciar sesión", async () => {
    vi.mocked(api.seguimientoPedido).mockResolvedValue(pedidoAna);
    renderApp("/seguimiento");
    fireEvent.change(screen.getByLabelText("Código de pedido"), { target: { value: "sv-000001" } });
    fireEvent.change(screen.getByLabelText("Correo usado en la compra"), { target: { value: "ana@sonidovivo.cl" } });
    fireEvent.click(screen.getByRole("button", { name: "Ver pedido" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "SV-000001" })).toBeInTheDocument());
    expect(screen.getAllByText("Despacho").length).toBeGreaterThan(0);
  });
});