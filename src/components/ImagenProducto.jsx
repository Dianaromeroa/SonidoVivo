import { useEffect, useState } from "react";

export function rutaImagenProducto(producto) {
  return producto.imagen || `/productos/${producto.id.toLowerCase()}.webp`;
}

export default function ImagenProducto({ producto, alt, className = "", fallbackClassName = "" }) {
  const imagen = rutaImagenProducto(producto);
  const [conError, setConError] = useState(false);

  useEffect(() => {
    setConError(false);
  }, [imagen]);

  if (conError) return <div className={fallbackClassName} aria-hidden="true">♫</div>;

  return <img className={className} src={imagen} alt={alt || `${producto.nombre} ${producto.marca} ${producto.modelo}`} loading="lazy" onError={() => setConError(true)} />;
}