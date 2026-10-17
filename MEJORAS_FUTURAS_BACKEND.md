# Sonido Vivo — Consideraciones para la etapa backend

Este documento no bloquea la entrega frontend actual. Registra el trabajo necesario cuando Sonido Vivo se conecte a un backend real.

## Persistencia y modelo de datos

- Sustituir `localStorage` por una API y una base de datos.
- Crear entidades para usuarios, productos, categorías, carritos, pedidos, ítems de pedido, solicitudes de reparación, mensajes y respuestas.
- Migrar los datos iniciales del catálogo y conservar imágenes con rutas administradas por el servidor o un servicio de almacenamiento.
- Definir respaldo, validación y manejo de errores de persistencia.

## Autenticación y autorización

- Reemplazar las cuentas y contraseñas de demostración por registro e inicio de sesión gestionados por el servidor.
- Almacenar contraseñas usando hash seguro; nunca como texto plano.
- Emitir sesiones o tokens seguros y validar el rol en cada endpoint.
- Mantener permisos separados: administrador edita catálogo; vendedor gestiona pedidos, mensajes y reparaciones; cliente consulta sólo su información.

## Pedidos, mensajes y reparación

- Generar identificadores no predecibles para pedidos, solicitudes y mensajes.
- Restringir la consulta de pedidos a su dueño autenticado o incorporar una segunda verificación cuando se requiera seguimiento público.
- Registrar historial de cambios con usuario responsable, fecha y motivo.
- Convertir las respuestas del vendedor en correos/notificaciones reales y mantener su historial.

## Operación y calidad

- Validar todos los datos nuevamente en servidor; la validación frontend sólo mejora experiencia de usuario.
- Implementar control de stock transaccional para evitar ventas superiores a la disponibilidad.
- Añadir pruebas de API, integración, permisos y casos de concurrencia.
- Configurar variables de entorno, registro de errores, monitoreo y despliegue.

## Orden sugerido de implementación

1. Diseñar base de datos y contratos API.
2. Implementar autenticación y roles de servidor.
3. Migrar catálogo e inventario.
4. Migrar carrito, checkout y pedidos.
5. Migrar contacto y reparaciones con notificaciones.
6. Reemplazar gradualmente los servicios locales del frontend por clientes de API.
7. Ejecutar pruebas integrales y preparar despliegue.