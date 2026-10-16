import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import ProductoCard from "../components/ProductoCard.jsx";


const categoriasDestacadas = [
  {
    nombre: "Guitarras Acústicas",
    imagen: "/productos/ga001.webp",
    icono: "🎸"
  },
  {
    nombre: "Guitarras Eléctricas",
    imagen: "/productos/ge001.webp",
    icono: "🎸"
  },
  {
    nombre: "Bajos Eléctricos",
    imagen: "/productos/ba001.webp",
    icono: "🎸"
  },
  {
    nombre: "Baterías",
    imagen: "/productos/bt001.webp",
    icono: "🥁"
  },
  {
    nombre: "Teclados y Pianos",
    imagen: "/productos/tc001.webp",
    icono: "🎹"
  },
  {
    nombre: "Amplificadores",
    imagen: "/productos/am001.webp",
    icono: "🔊"
  }
];


const tallerItems = [
  {
    titulo: "Instrumentos de cuerda",
    imagen: "/img/taller/instrumentos-cuerda.png"
  },
  {
    titulo: "Mantención y reparación",
    imagen: "/img/taller/mantencion-reparacion.png"
  },
  {
    titulo: "Viña del Mar",
    imagen: "/img/taller/ubicacion-vina.png"
  }
];


const beneficiosCompra = [
  {
    titulo: "Compra online segura",
    descripcion: "Tus datos y pagos están protegidos.",
    icono: "🔒"
  },
  {
    titulo: "Despacho a todo Chile",
    descripcion: "Recibe tu pedido en la dirección que elijas.",
    icono: "🚚"
  },
  {
    titulo: "Retiro en tienda",
    descripcion: "Retira tu compra en Viña del Mar.",
    icono: "🏪"
  }
];


export default function Inicio() {

  const { productos } = useStore();

  return (
    <>

      {/* HERO */}

      <section className="hero-home">

        <div className="hero-home-contenido">

          <p className="eyebrow">
            Tu tienda de instrumentos y equipos musicales
          </p>

          <h1>
            Tu próximo sonido
            <span> comienza aquí</span>
          </h1>

          <p className="hero-home-texto">
            Instrumentos, equipos y accesorios para músicos,
            estudiantes y creadores. Encuentra todo lo que
            necesitas para llevar tu música más lejos.
          </p>


          <div className="hero-home-acciones">

            <Link
              className="boton hero-boton-principal"
              to="/catalogo"
            >
              Explorar catálogo →
            </Link>

            <Link
              className="boton hero-boton-secundario"
              to="/contacto"
            >
              Contáctanos →
            </Link>

          </div>


          <div className="hero-home-beneficios">

            <div>
              <strong>11 años</strong>
              <span>de experiencia</span>
            </div>

            <div>
              <strong>Despacho</strong>
              <span>a todo Chile</span>
            </div>

            <div>
              <strong>Retiro</strong>
              <span>en Viña del Mar</span>
            </div>

          </div>

        </div>


        <div className="hero-home-visual">

          <img
            src="/img/hero-sonido-vivo.png"
            alt="Instrumentos y equipos musicales de Sonido Vivo"
          />

          <div className="hero-home-catalogo">
            <strong>{productos.length}</strong>
            <span>productos disponibles</span>
          </div>

        </div>

      </section>


      {/* CATEGORÍAS DESTACADAS */}

      <section className="home-categorias">

        <div className="home-seccion-titulo">

          <div>
            <p className="eyebrow">
              Encuentra tu sonido
            </p>

            <h2>
              Explora por categoría
            </h2>
          </div>

          <Link to="/categorias">
            Ver todas →
          </Link>

        </div>


        <div className="home-categorias-grid">

          {categoriasDestacadas.map((categoria) => (

            <Link
              key={categoria.nombre}
              to={`/catalogo?categoria=${encodeURIComponent(
                categoria.nombre
              )}`}
              className="home-categoria-card"
            >

              <img
                src={categoria.imagen}
                alt={categoria.nombre}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="home-categoria-fondo">
                <span>{categoria.icono}</span>
              </div>

              <div className="home-categoria-overlay">

                <strong>
                  {categoria.nombre}
                </strong>

                <span>
                  Explorar →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* PRODUCTOS DESTACADOS */}

      <section className="home-destacados">

        <div className="home-seccion-titulo">

          <div>
            <p className="eyebrow">
              Recomendados por Sonido Vivo
            </p>

            <h2>
              Favoritos de los músicos
            </h2>
          </div>

          <Link to="/catalogo">
            Ver todos →
          </Link>

        </div>


        <div className="home-productos-grid">

          {productos
            .slice(0, 4)
            .map((producto) => (

              <ProductoCard
                key={producto.id}
                producto={producto}
              />

            ))}

        </div>

      </section>


      {/* TALLER */}

      <section className="taller-home">

        <div className="taller-home-contenido">

          <p className="eyebrow">
            Taller Sonido Vivo
          </p>

          <h2>
            Tu instrumento,
            <span> en buenas manos.</span>
          </h2>

          <p>
            Realizamos mantención y reparación de instrumentos
            de cuerda para que vuelvas a tocar con el mejor sonido.
          </p>

          <Link
            className="boton"
            to="/contacto"
          >
            Consultar reparación →
          </Link>

        </div>


        <div className="taller-home-datos">

          {tallerItems.map((item) => (

            <div
              className="taller-home-item"
              key={item.titulo}
            >

              <img
                src={item.imagen}
                alt={item.titulo}
              />

              <span>
                {item.titulo}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* BENEFICIOS DE COMPRA */}

      <section className="home-beneficios">

        {beneficiosCompra.map((beneficio) => (

          <article
            className="home-beneficio-item"
            key={beneficio.titulo}
          >

            <span
              className="home-beneficio-icono"
              aria-hidden="true"
            >
              {beneficio.icono}
            </span>

            <div>

              <strong>
                {beneficio.titulo}
              </strong>

              <p>
                {beneficio.descripcion}
              </p>

            </div>

          </article>

        ))}

      </section>

    </>
  );
}