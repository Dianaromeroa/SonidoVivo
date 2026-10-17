import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "./Checkout.jsx";
import { StoreProvider } from "../context/StoreContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

describe("Checkout", () => {
  it("confirma la compra mediante un popup y mantiene disponible el seguimiento", () => {
    localStorage.setItem("sonidoVivo.sesion", JSON.stringify({ nombre: "Ana Música", correo: "ana@sonidovivo.cl", rol: "CLIENTE" }));
    localStorage.setItem("sonidoVivo.carrito.ana@sonidovivo.cl", JSON.stringify([{
      id: "GA001", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990, cantidad: 1,
    }]));
    render(<MemoryRouter><AuthProvider><StoreProvider><Checkout /></StoreProvider></AuthProvider></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Nombre completo"), { target: { value: "Ana Música" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@sonidovivo.cl" } });
    fireEvent.change(screen.getByLabelText("Dirección"), { target: { value: "Calle Marina 123" } });
    fireEvent.change(screen.getByLabelText("Comuna"), { target: { value: "Viña del Mar" } });
    fireEvent.click(screen.getByRole("button", { name: "Realizar compra" }));
    expect(screen.getByRole("dialog", { name: "¡Gracias por tu compra!" })).toBeInTheDocument();
    expect(screen.getByText("Compra realizada")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver seguimiento" })).toBeInTheDocument();
  });
});