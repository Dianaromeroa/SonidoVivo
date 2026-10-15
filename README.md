# Sonido Vivo

Aplicación frontend para una tienda de instrumentos musicales y audio, desarrollada con React + Vite.

## Datos del catálogo

Los productos iniciales se generaron **exclusivamente** desde la hoja **“Catálogo de Productos”** de:

`FORMA B-SonidoVivo/DSY1104 - Forma B - Catalogo Sonido Vivo.xlsx`

No se utilizaron datos de la hoja “Categorías” ni productos del proyecto Level-Up Gamer.

## Ejecutar

```bash
npm install
npm run dev
```

## Validar

```bash
npm test
npm run build
```

## Funcionalidades de entrega

- Catálogo, carrito, cupones, checkout simulado y seguimiento de pedidos.
- Flujo operativo de pedidos: `Confirmado → Preparación → Despacho → Entregado`, con historial y fecha de actualización.
- Administración: CRUD de inventario, filtros por categoría/stock, ordenamiento y confirmación accesible para eliminar.
- Vendedor: consulta filtrable de inventario y avance controlado de pedidos.
- Las imágenes de productos siguen en preparación y no forman parte de esta iteración.

## Accesos de demostración

- Administrador: `admin@sonidovivo.cl` / `admin123`
- Vendedor: `vendedor@sonidovivo.cl` / `vendedor123`

La autenticación, el carrito, el inventario y los pedidos se simulan con `localStorage` para el alcance frontend de la evaluación. Para reiniciar una demo, elimina las claves `sonidoVivo.*` desde el almacenamiento local del navegador.