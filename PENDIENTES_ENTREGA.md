# Sonido Vivo — Pendientes y guía para finalizar la entrega

Este documento registra el estado del proyecto y las tareas a realizar antes de la entrega final. Debe actualizarse a medida que se complete cada bloque.

## Estado actual

- Aplicación React + Vite funcional con catálogo, categorías, ofertas, detalle de producto, carrito, checkout y seguimiento simulado.
- Autenticación frontend por roles con cuentas de demostración para administrador y vendedor.
- Inventario local persistente con CRUD para el rol administrador.
- Carrito sincronizado con inventario: evita cantidades inválidas y elimina productos que ya no existen.
- Paneles de administración y vendedor rediseñados como dashboards responsive.
- Pruebas con Vitest y React Testing Library para validaciones, carrito, registro, contexto de tienda, administración, vendedor y tarjeta de producto.
- Imágenes de catálogo preparadas: existe `public/productos/` y el documento `informacion_relevante/prompts-imagenes-productos.md` contiene 51 prompts individuales.

## Prioridad 1 — Integrar imágenes de productos

### Trabajo pendiente

- Generar o seleccionar las 51 imágenes usando el documento de prompts.
- Guardarlas en `public/productos/` como WebP, idealmente a 1024 × 1024 px.
- Nombrarlas exactamente con el ID en minúscula: `GA001` debe ser `ga001.webp`, `TC001` debe ser `tc001.webp`, etc.
- Incorporar el campo/ruta de imagen en el catálogo inicial y en los productos creados desde Administración.
- Actualizar las tarjetas y el detalle de producto para mostrar la imagen real.
- Mantener un placeholder elegante si la imagen todavía no existe, si se elimina o si falla su carga.
- Verificar que las imágenes tengan `alt` descriptivo, por ejemplo: `Guitarra Acústica Folk Yamaha F310`.

### Criterios visuales

- Formato 1:1 consistente y fondo verde salvia `#E6F1ED`.
- Usar `object-fit: cover` o `contain` según el producto, evitando recortes de instrumentos largos.
- Revisar especialmente guitarras, teclados, cables, pedales, soportes y baterías, porque requieren encuadres distintos.
- Optimizar el peso de los archivos: preferir WebP y evitar imágenes excesivamente pesadas.

## Prioridad 2 — Completar gestión de pedidos

**Completado el 14 de octubre de 2026.**

Actualmente un pedido se crea con estado `Confirmado` y se visualiza en los paneles. Para un flujo más completo:

- Administrador y vendedor pueden avanzar: `Confirmado` → `Preparación` → `Despacho` → `Entregado`.
- Las transiciones consecutivas, permisos y persistencia en `localStorage` están validados.
- `SeguimientoPedido` refleja las cuatro etapas, fecha de actualización e historial.
- Hay pruebas para transiciones, persistencia y restricciones de rol en el contexto.

## Prioridad 3 — Mejoras de experiencia de administración

**Completado, excepto la asociación de imágenes que queda fuera de esta iteración.**

- Reemplazado `window.confirm` por un modal accesible y coherente.
- Se muestran mensajes de éxito o error después de crear, editar, eliminar y avanzar pedidos.
- Administración y Vendedor incluyen filtros por categoría/estado de stock y ordenamiento por nombre, precio o stock.
- Permitir asociar una imagen existente desde `public/productos/` al crear o editar productos, sin implementar carga de archivos todavía.
- Definir comportamiento de productos creados localmente después de reiniciar datos del navegador.

## Prioridad 4 — Revisión funcional completa

Probar manualmente en navegador los siguientes flujos antes de entregar:

1. Navegar por Inicio, Catálogo, Categorías, Ofertas, Contacto y detalle de producto.
2. Agregar productos al carrito desde tarjeta y detalle.
3. Modificar cantidades, intentar valores decimales, cero, negativos y superiores al stock.
4. Aplicar cupón, vaciar carrito y confirmar checkout con datos válidos e inválidos.
5. Consultar el pedido generado y su seguimiento.
6. Iniciar sesión como administrador y crear, editar y eliminar un producto.
7. Confirmar que eliminar un producto también lo retira del carrito.
8. Iniciar sesión como vendedor y verificar búsqueda, alertas de inventario y pedidos por preparar.
9. Cerrar sesión y comprobar que rutas protegidas no se puedan abrir sin el rol correcto.
10. Probar en ancho móvil, tablet y escritorio.

## Prioridad 5 — Accesibilidad y calidad visual

**Completado para los flujos intervenidos; quedan pendientes las revisiones asociadas a imágenes.**

- Revisar navegación solo con teclado: foco visible, menú, botones, modales, formularios y cierre de modal.
- Los modales abiertos pueden cerrarse con Escape y están marcados como diálogos modales.
- Verificar etiquetas asociadas a todos los campos y mensajes de error anunciables.
- Confirmar contraste suficiente en textos, badges, alertas y botones de peligro.
- Comprobar textos alternativos de las futuras imágenes.
- Evitar depender solo de color para informar stock crítico, agotado o errores.
- Revisar desbordes de tablas y modales en móviles pequeños.

## Prioridad 6 — Pruebas automatizadas

### Ya cubierto

- Formateo de moneda.
- Validaciones de correo, checkout y producto.
- Carrito y normalización de cantidades.
- Registro simulado.
- CRUD del contexto: creación, ID duplicado, eliminación y sincronización de carrito.
- Interfaz de Administración y Vendedor.

### Por agregar al implementar las funciones pendientes

- Renderizado de imagen real y fallback cuando no exista archivo.
- Selección/asociación de imagen desde Administración.
- Cambio de estado de pedidos, persistencia y restricciones de rol.
- Modal de eliminación y confirmación.
- Casos de filtros y ordenamiento en interfaces operativas.

## Prioridad 7 — Documentación y entrega

- Actualizar `README.md` cuando se integren imágenes y gestión de pedidos.
- Mantener instrucciones exactas para ejecutar: `npm install`, `npm run dev`, `npm test` y `npm run build`.
- Documentar las cuentas de demostración:
  - Administrador: `admin@sonidovivo.cl` / `admin123`.
  - Vendedor: `vendedor@sonidovivo.cl` / `vendedor123`.
- Documentar que autenticación, usuarios, inventario, carrito y pedidos son simulados con `localStorage`.
- Explicar cómo reiniciar una demostración: limpiar datos del sitio o las claves `sonidoVivo.*` de `localStorage`.
- Mantener fuera del repositorio documentos fuente o material de evaluación que no corresponda a la entrega.
- Antes de subir: ejecutar `npm test`, `npm run build` y `git diff --check`.
- Revisar que no se suban secretos, archivos `.env`, `node_modules`, `dist`, archivos temporales o imágenes de tamaño innecesario.

## Limitaciones conocidas de esta versión frontend

- Las credenciales están en el código cliente y son solo para demostración; no son seguras para producción.
- El registro guarda datos localmente, pero no crea credenciales utilizables para iniciar sesión.
- No existe backend, base de datos, pago real, subida real de archivos ni despacho real.
- `localStorage` puede variar entre navegadores, perfiles y dispositivos; los datos se borran al limpiar almacenamiento del sitio.
- Las imágenes IA deben revisarse visualmente antes de usarse para evitar modelos, logotipos o componentes incorrectos.

## Orden recomendado para continuar

1. Generar y guardar las imágenes WebP en `public/productos/`.
2. Integrarlas con fallback en catálogo y detalle.
3. Implementar la gestión de estados de pedido.
4. Mejorar modales, mensajes y filtros del panel administrativo.
5. Realizar revisión responsive y de accesibilidad.
6. Ampliar pruebas de las nuevas funciones.
7. Actualizar README, ejecutar validaciones finales y preparar evidencia para la entrega.