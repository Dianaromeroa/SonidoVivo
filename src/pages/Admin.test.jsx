import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Admin from "./Admin.jsx";

const crearProducto = vi.fn(() => ({ ok: true }));
const actualizarProducto = vi.fn(() => ({ ok: true }));
const eliminarProducto = vi.fn(() => ({ ok: true }));
const actualizarEstadoPedido = vi.fn(() => ({ ok: true }));

vi.mock("../context/StoreContext.jsx", () => ({
  useStore: () => ({
    productos: [{ id: "GA001", nombre: "Guitarra", categoria: "Guitarras", marca: "Yamaha", modelo: "F310", precio: 129990, stock: 8, descripcion: "Prueba" }],
    pedidos: [{ id: "SV-000001", fecha: "2026-10-16T12:00:00.000Z", estado: "Confirmado", total: 129990, cliente: { nombre: "Ana Música", correo: "ana@sonidovivo.cl", direccion: "Calle Marina 123", comuna: "Viña del Mar" }, items: [{ id: "GA001", nombre: "Guitarra", marca: "Yamaha", modelo: "F310", precio: 129990, cantidad: 1 }] }], crearProducto, actualizarProducto, eliminarProducto, actualizarEstadoPedido,
  }),
}));

describe("Admin", () => {
  it("envía un nuevo producto con el campo de imagen reservado vacío", () => {
    render(<Admin />);
    fireEvent.click(screen.getByRole("button", { name: /Nuevo producto/ }));
    const formulario = within(screen.getByRole("dialog", { name: "Nuevo producto" }));
    fireEvent.change(formulario.getByLabelText("Código"), { target: { value: "te001" } });
    fireEvent.change(formulario.getByLabelText("Nombre"), { target: { value: "Teclado" } });
    fireEvent.change(formulario.getByLabelText("Categoría"), { target: { value: "Teclados" } });
    fireEvent.change(formulario.getByLabelText("Marca"), { target: { value: "Yamaha" } });
    fireEvent.change(formulario.getByLabelText("Modelo"), { target: { value: "PSR" } });
    fireEvent.change(formulario.getByLabelText("Precio (CLP)"), { target: { value: "299990" } });
    fireEvent.change(formulario.getByLabelText("Stock"), { target: { value: "4" } });
    fireEvent.click(formulario.getByRole("button", { name: "Crear producto" }));
    expect(crearProducto).toHaveBeenCalledWith(expect.objectContaining({ id: "te001", imagen: "" }));
  });

  it("confirma la eliminación mediante un modal accesible", () => {
    render(<Admin />);
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.getByRole("dialog", { name: "Eliminar producto" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Eliminar producto" }));
    expect(eliminarProducto).toHaveBeenCalledWith("GA001");
  });

  it("permite revisar el despacho y exige confirmación antes de avanzar un pedido", () => {
    render(<Admin />);
    fireEvent.click(screen.getByRole("button", { name: "Ver detalle" }));
    expect(screen.getByRole("dialog", { name: "Detalle de despacho" })).toBeInTheDocument();
    expect(screen.getByText("Calle Marina 123")).toBeInTheDocument();
    expect(screen.getAllByText("Guitarra").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Avanzar a Preparación" }));
    expect(screen.getByRole("dialog", { name: "¿Avanzar este pedido?" })).toBeInTheDocument();
    expect(actualizarEstadoPedido).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Sí, avanzar pedido" }));
    expect(actualizarEstadoPedido).toHaveBeenCalledWith("SV-000001", "Preparación", "ADMIN");
  });
});