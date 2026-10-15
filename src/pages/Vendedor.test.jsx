import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Vendedor from "./Vendedor.jsx";

vi.mock("../context/StoreContext.jsx", () => ({
  useStore: () => ({
    productos: [
      { id: "GA001", nombre: "Guitarra Folk", categoria: "Guitarras", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990 },
      { id: "TE001", nombre: "Teclado portátil", categoria: "Teclados", marca: "Casio", modelo: "CT-S1", stock: 0, precio: 249990 },
    ],
    pedidos: [{ id: "SV-000001", estado: "Confirmado", cliente: { nombre: "Ana" }, items: [{ id: "GA001" }], total: 129990 }],
  }),
}));

describe("Vendedor", () => {
  it("muestra la operación y permite filtrar la disponibilidad", () => {
    render(<Vendedor />);
    expect(screen.getByRole("heading", { name: "Operación de tienda" })).toBeInTheDocument();
    expect(screen.getAllByText("Pedidos por preparar")).toHaveLength(2);
    fireEvent.change(screen.getByLabelText("Buscar disponibilidad"), { target: { value: "teclado" } });
    expect(screen.getAllByText("Teclado portátil")).toHaveLength(2);
    expect(screen.queryByText("Guitarra Folk")).not.toBeInTheDocument();
  });
});