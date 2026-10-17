import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import { formatearCLP } from "../utils/formato.js";
import ProductoCard from "../components/ProductoCard.jsx";
import ImagenProducto from "../components/ImagenProducto.jsx";


export default function DetalleProducto() {

  const { id } = useParams();

  const {
    productos,
    agregarAlCarrito
  } = useStore();

  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState(null);
  const [inicioSimilares, setInicioSimilares] = useState(0);

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
  const similares = productos.filter((item) => item.id !== producto.id && item.categoria === producto.categoria);
  const visibles = similares.slice(inicioSimilares, inicioSimilares + 3);

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

    <><section className="detalle">


      {/* IMAGEN */}

      <div className="detalle-imagen-contenedor">

        <ImagenProducto
          producto={producto}
          alt={`${producto.nombre} ${producto.marca} ${producto.modelo}`}
          className="detalle-imagen"
          fallbackClassName="detalle-icono"
        />

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

    </section>{similares.length > 0 && <section className="productos-similares"><div className="productos-similares-cabecera"><div><p className="eyebrow">Sigue explorando</p><h2>Productos similares</h2><p>Más opciones de {producto.categoria.toLowerCase()} para complementar tu elección.</p></div>{similares.length > 3 && <div className="carrusel-controles"><button type="button" aria-label="Ver productos similares anteriores" disabled={inicioSimilares === 0} onClick={() => setInicioSimilares((inicio) => Math.max(0, inicio - 3))}>←</button><button type="button" aria-label="Ver más productos similares" disabled={inicioSimilares + 3 >= similares.length} onClick={() => setInicioSimilares((inicio) => Math.min(similares.length - 3, inicio + 3))}>→</button></div>}</div><div className="carrusel-similares">{visibles.map((item) => <ProductoCard key={item.id} producto={item} />)}</div></section>}</>

  );
}