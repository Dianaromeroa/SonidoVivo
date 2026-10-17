# Sonido Vivo

Aplicación frontend para una tienda de instrumentos musicales, accesorios y servicios de reparación, desarrollada con **React**, **Vite** y **Bootstrap 5**.

> Proyecto académico: los datos se guardan localmente para demostrar flujos de interfaz. La integración con backend se planifica como una etapa posterior.

## Funcionalidades actuales

- Catálogo de 51 productos con categorías, búsqueda, filtros, detalle, productos similares e imágenes WebP.
- Carrito por cliente, control de stock, cupones y checkout simulado.
- Seguimiento de pedidos con estados: `Confirmado → Preparación → Despacho → Entregado` e historial.
- Registro e inicio de sesión de demostración con roles de cliente, administrador y vendedor.
- **Administración:** creación, edición y eliminación de productos; filtros, ordenamiento, inventario y avance de pedidos.
- **Vendedor:** consulta de inventario, gestión del avance de pedidos y bandeja de mensajes de contacto/reparación con registro local de respuestas.
- Formularios de contacto y reparación, con validaciones y persistencia local.
- Fallback visual si una imagen de producto no puede cargarse.

## Tecnologías

- React 19
- React Router
- Vite
- Bootstrap 5.3
- CSS propio para la identidad visual de Sonido Vivo
- Vitest + React Testing Library

Bootstrap ya está importado en `src/main.jsx`. Se usa junto al CSS propio para mantener el diseño actual mientras se incorporan gradualmente utilidades y componentes Bootstrap donde aporten valor pedagógico.

## Ejecución local

```bash
npm install
npm run dev
```

## Validación

```bash
npm test -- --run
npm run build
git diff --check
```

## Accesos de demostración

- Administrador: `admin@sonidovivo.cl` / `admin123`
- Vendedor: `vendedor@sonidovivo.cl` / `vendedor123`

Las cuentas creadas desde Registro también pueden iniciar sesión dentro del navegador donde fueron registradas.

## Datos e imágenes

- El catálogo inicial se basa en la hoja **“Catálogo de Productos”** del material académico proporcionado.
- Las imágenes se encuentran en `public/productos/`, con el ID del producto en minúsculas; por ejemplo, `GA001` usa `ga001.webp`.
- Para restablecer la demostración, elimina las claves `sonidoVivo.*` en el almacenamiento local del navegador.

## Alcance actual y siguiente etapa

Esta versión usa `localStorage` exclusivamente como persistencia de demostración frontend. No incluye pago, correo, carga de archivos, notificaciones, base de datos ni backend reales.

Las decisiones y tareas para migrar a backend están documentadas en [MEJORAS_FUTURAS_BACKEND.md](MEJORAS_FUTURAS_BACKEND.md).