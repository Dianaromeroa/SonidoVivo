import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";


export default function DetalleProducto() {

  const { id } = useParams();

  const {
    productos,
    agregarAlCarrito
  } = useStore();

  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState(null);
  const [imagenConError, setImagenConError] = useState("");

  const producto =
    productos.find((item) => item.id === id);


  if (!producto) {

    return (
      <section className="empty">

        <h1>
          Producto no encontrado
        </h1>

        <Link
          className="boton"
          to="/catalogo"
        >
          Volver al catálogo
        </Link>

      </section>
    );

  }


  const sinStock = producto.stock < 1;

  const imagenProducto =
    producto.imagen ||
    `/productos/${producto.id.toLowerCase()}.webp`;

  const mostrarImagen =
    imagenConError !== imagenProducto;


  function agregar() {

    const resultado =
      agregarAlCarrito(
        producto,
        cantidad
      );

    setMensaje({
      texto: resultado.ok
        ? `${cantidad} ${
            cantidad === 1
              ? "producto agregado"
              : "productos agregados"
          } al carrito.`
        : resultado.mensaje,

      tipo: resultado.ok
        ? "success"
        : "danger"
    });

  }


  return (

    <section className="detalle">


      {/* IMAGEN */}

      <div className="detalle-imagen-contenedor">

        {mostrarImagen ? (

          <img
            src={imagenProducto}
            alt={producto.nombre}
            className="detalle-imagen"
            onError={() =>
              setImagenConError(imagenProducto)
            }
          />

        ) : (

          <div
            className="detalle-icono"
            aria-hidden="true"
          >
            ♫
          </div>

        )}

      </div>


      {/* INFORMACIÓN */}

      <div>

        <p className="eyebrow">
          {producto.categoria}
        </p>

        <h1>
          {producto.nombre}
        </h1>

        <p className="marca">
          {producto.marca} · Modelo {producto.modelo}
        </p>

        <p className="detalle-descripcion">
          {producto.descripcion}
        </p>

        <p className="precio grande">
          {formatearCLP(producto.precio)}
        </p>

        <p
          className={
            sinStock
              ? "stock agotado"
              : "stock"
          }
        >
          {sinStock
            ? "Producto agotado"
            : `${producto.stock} unidades disponibles`}
        </p>


        <div className="d-flex flex-wrap gap-2 align-items-center">

          <label
            className="fw-bold"
            htmlFor="cantidad-producto"
          >
            Cantidad
          </label>


          <select
            id="cantidad-producto"
            className="form-select w-auto"
            disabled={sinStock}
            value={cantidad}
            onChange={(event) =>
              setCantidad(
                Number(event.target.value)
              )
            }
          >

            {Array.from(
              {
                length: Math.min(
                  producto.stock,
                  10
                )
              },
              (_, indice) => indice + 1
            ).map((valor) => (

              <option
                key={valor}
                value={valor}
              >
                {valor}
              </option>

            ))}

          </select>


          <button
            type="button"
            className="boton"
            disabled={sinStock}
            onClick={agregar}
          >
            Agregar al carrito
          </button>

        </div>


        {mensaje && (

          <p
            className={`alert alert-${mensaje.tipo} mt-3 mb-0`}
            role="status"
          >
            {mensaje.texto}
          </p>

        )}

      </div>

    </section>

  );
}