import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Vendedor from "./Vendedor.jsx";

vi.mock("../context/StoreContext.jsx", () => ({
  useStore: () => ({
    productos: [
      { id: "GA001", nombre: "Guitarra Folk", categoria: "Guitarras", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990 },
      { id: "TE001", nombre: "Teclado portátil", categoria: "Teclados", marca: "Casio", modelo: "CT-S1", stock: 0, precio: 249990 },
    ],
    pedidos: [{ id: "SV-000001", estado: "Confirmado", cliente: { nombre: "Ana", correo: "ana@sonidovivo.cl", direccion: "Calle Marina 123", comuna: "Viña del Mar" }, items: [{ id: "GA001", nombre: "Guitarra Folk", marca: "Yamaha", modelo: "F310", precio: 129990, cantidad: 1 }], total: 129990 }], actualizarEstadoPedido: vi.fn(() => ({ ok: true })),
  }),
}));

describe("Vendedor", () => {
  it("muestra la operación y permite filtrar la disponibilidad", () => {
    render(<Vendedor />);
    expect(screen.getByRole("heading", { name: "Operación de tienda" })).toBeInTheDocument();
    expect(screen.getAllByText("Pedidos por preparar")).toHaveLength(1);
    fireEvent.change(screen.getByLabelText("Buscar disponibilidad"), { target: { value: "teclado" } });
    expect(screen.getAllByText("Teclado portátil")).toHaveLength(1);
    expect(screen.queryByText("Guitarra Folk")).not.toBeInTheDocument();
  });

  it("muestra el detalle y solicita confirmación antes de avanzar un pedido", () => {
    render(<Vendedor />);
    expect(screen.queryByRole("button", { name: "Avanzar" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Ver detalle" }));
    expect(screen.getByRole("dialog", { name: "Detalle de despacho" })).toBeInTheDocument();
    expect(screen.getByText("Calle Marina 123")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Avanzar a Preparación" }));
    expect(screen.getByRole("dialog", { name: "¿Avanzar este pedido?" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Sí, avanzar pedido" }));
    expect(screen.getByText("SV-000001 avanzó a Preparación.")).toBeInTheDocument();
  });
});