import { Link } from "react-router-dom";
import { useState } from "react";
import { formatearCLP } from "../utils/formato.js";
import { useStore } from "../context/StoreContext.jsx";


export default function ProductoCard({ producto }) {

  const { agregarAlCarrito } = useStore();

  const [mensaje, setMensaje] = useState(null);
  const [errorImagen, setErrorImagen] = useState(false);

  const sinStock = producto.stock < 1;

  const imagenProducto =
    producto.imagen ||
    `/productos/${producto.id.toLowerCase()}.webp`;


  function agregar() {

    const resultado = agregarAlCarrito(producto);

    setMensaje({
      texto: resultado.ok
        ? "Producto agregado al carrito."
        : resultado.mensaje,

      tipo: resultado.ok
        ? "exito"
        : "error"
    });

  }


  return (

    <article className="producto-card">

      <div className="producto-imagen-contenedor">

        {!errorImagen ? (

          <img
            src={imagenProducto}
            alt={producto.nombre}
            className="producto-imagen"
            loading="lazy"
            onError={() => setErrorImagen(true)}
          />

        ) : (

          <div
            className="producto-icono producto-icono-fallback"
            aria-hidden="true"
          >
            ♫
          </div>

        )}

      </div>


      <div className="producto-cuerpo">

        <p className="categoria">
          {producto.categoria}
        </p>

        <h3>
          {producto.nombre}
        </h3>

        <p className="marca">
          {producto.marca} · {producto.modelo}
        </p>

        <p className="precio">
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
            ? "Agotado"
            : `${producto.stock} disponibles`}
        </p>


        <div className="acciones">

          <Link
            className="boton secundario"
            to={`/producto/${producto.id}`}
          >
            Ver detalle
          </Link>


          <button
            type="button"
            className="boton"
            disabled={sinStock}
            onClick={agregar}
          >
            Agregar
          </button>

        </div>


        {mensaje && (

          <small
            className={`mensaje mensaje-item ${
              mensaje.tipo === "error"
                ? "error"
                : ""
            }`}
            role="status"
          >
            {mensaje.texto}
          </small>

        )}

      </div>

    </article>

  );
}