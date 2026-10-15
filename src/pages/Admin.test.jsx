import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Admin from "./Admin.jsx";

const crearProducto = vi.fn(() => ({ ok: true }));
const actualizarProducto = vi.fn(() => ({ ok: true }));
const eliminarProducto = vi.fn(() => ({ ok: true }));

vi.mock("../context/StoreContext.jsx", () => ({
  useStore: () => ({
    productos: [{ id: "GA001", nombre: "Guitarra", categoria: "Guitarras", marca: "Yamaha", modelo: "F310", precio: 129990, stock: 8, descripcion: "Prueba" }],
    pedidos: [], crearProducto, actualizarProducto, eliminarProducto,
  }),
}));

describe("Admin", () => {
  it("envía un nuevo producto con el campo de imagen reservado vacío", () => {
    render(<Admin />);
    fireEvent.click(screen.getByRole("button", { name: /Nuevo producto/ }));
    fireEvent.change(screen.getByLabelText("Código"), { target: { value: "te001" } });
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Teclado" } });
    fireEvent.change(screen.getByLabelText("Categoría"), { target: { value: "Teclados" } });
    fireEvent.change(screen.getByLabelText("Marca"), { target: { value: "Yamaha" } });
    fireEvent.change(screen.getByLabelText("Modelo"), { target: { value: "PSR" } });
    fireEvent.change(screen.getByLabelText("Precio (CLP)"), { target: { value: "299990" } });
    fireEvent.change(screen.getByLabelText("Stock"), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Crear producto" }));
    expect(crearProducto).toHaveBeenCalledWith(expect.objectContaining({ id: "te001", imagen: "" }));
  });

  it("solicita confirmación antes de eliminar un producto", () => {
    const confirmacion = vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<Admin />);
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(confirmacion).toHaveBeenCalled();
    expect(eliminarProducto).toHaveBeenCalledWith("GA001");
    confirmacion.mockRestore();
  });
});