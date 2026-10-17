# Sonido Vivo — Estado previo a entrega

## Estado actual

- Aplicación React + Vite funcional con Bootstrap 5 importado y CSS propio.
- Catálogo de 51 productos con 51 imágenes WebP en `public/productos/`.
- Catálogo, categorías, detalle, carrito, cupones, checkout simulado y seguimiento de pedidos disponibles.
- Registro, login y roles de demostración: cliente, administrador y vendedor.
- Administrador con CRUD de catálogo, filtros, ordenamiento, inventario y gestión de pedidos.
- Vendedor con consulta de inventario, avance de pedidos y bandeja local de contacto/reparaciones.
- Formularios de contacto y reparación con validación; el vendedor puede registrar respuestas locales.
- Lógica compartida de filtro/orden de inventario e imágenes reutilizables extraída a utilidades y componentes comunes.
- Accesibilidad mejorada en la navegación: etiqueta dinámica del menú móvil y acceso permanente a “Mis pedidos” para clientes autenticados.
- Pruebas automatizadas para validaciones, carrito, registro, autenticación, contexto, pedidos, administración, vendedor, mensajes, imágenes y utilidades.

## Validaciones ejecutadas

Ejecutadas correctamente durante la revisión actual:

- `npm test -- --run`
- `npm run build`
- `git diff --check`

Resultado de pruebas: **16 archivos de prueba y 33 pruebas aprobadas**.

## Lista de comprobación manual antes de entregar

1. Revisar Inicio, Catálogo, Categorías, Reparación, Contacto y detalle de producto en escritorio y móvil.
2. Agregar productos desde tarjeta y detalle; verificar el límite de stock.
3. Probar cupón, checkout y seguimiento por código de pedido.
4. Registrar una cuenta cliente, iniciar sesión y abrir “Mis pedidos”.
5. Iniciar sesión como administrador: crear, editar y eliminar un producto; revisar confirmaciones.
6. Iniciar sesión como vendedor: filtrar disponibilidad, revisar pedidos y avanzar un estado válido.
7. Enviar un formulario de Contacto y uno de Reparación; abrir `Mensajes` como vendedor y registrar una respuesta.
8. Comprobar menú móvil, navegación por teclado y cierre de modales con Escape.
9. Ejecutar nuevamente los tres comandos de validación antes del commit final.

## Pendiente para la siguiente mejora frontend

- Migrar progresivamente más bloques de interfaz a componentes/utilidades Bootstrap, manteniendo el diseño visual actual.
- Incorporar ESLint y Prettier para detectar errores comunes y formatear JSX/CSS automáticamente.
- Extraer componentes reutilizables adicionales de modales y tablas operativas si los paneles siguen creciendo.
- Ampliar pruebas de interacción con modales, rutas protegidas y fallback visual de imágenes.

## Fuera del alcance de esta entrega frontend

- Backend, base de datos, autenticación real, autorización de servidor, pagos, correos y notificaciones reales.
- Carga real de archivos e integración de despacho.

La hoja de ruta para esa etapa está en `MEJORAS_FUTURAS_BACKEND.md`.

## Preparación de commit

Antes del commit, revisar `git status --short` y `git diff --check`.

Confirmar que se incluyan las imágenes de `public/img/` y `public/productos/`, los archivos nuevos de `src/`, las pruebas y la documentación actualizada.