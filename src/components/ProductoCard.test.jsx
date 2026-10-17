import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductoCard from "./ProductoCard.jsx";
import { StoreProvider } from "../context/StoreContext.jsx";

const producto = { id: "GA001", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990, descripcion: "Prueba" };
describe("ProductoCard", () => {
  it("muestra datos del producto oficial, precio e imagen derivada desde su ID", () => { render(<MemoryRouter><StoreProvider><ProductoCard producto={producto} /></StoreProvider></MemoryRouter>); expect(screen.getByRole("heading", { name: producto.nombre })).toBeInTheDocument(); expect(screen.getByText("$129.990")).toBeInTheDocument(); expect(screen.getByText("8 disponibles")).toBeInTheDocument(); expect(screen.getByRole("img", { name: "Guitarra Acústica Folk Yamaha F310" })).toHaveAttribute("src", "/productos/ga001.webp"); });
});