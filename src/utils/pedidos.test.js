import { describe, expect, it } from "vitest";
import { siguienteEstadoPedido, transicionPedidoPermitida } from "./pedidos.js";

describe("flujo de pedidos", () => {
  it("solo permite avanzar una etapa a la vez", () => {
    expect(siguienteEstadoPedido("Confirmado")).toBe("Preparación");
    expect(transicionPedidoPermitida("Preparación", "Despacho")).toBe(true);
    expect(transicionPedidoPermitida("Confirmado", "Despacho")).toBe(false);
    expect(siguienteEstadoPedido("Entregado")).toBeNull();
  });
});