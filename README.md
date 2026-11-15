# Mi Almacén

Sistema de gestión para almacén o pequeño comercio: punto de venta con lector de códigos de barras, stock, compras, caja y reportes.

**Stack:** React + Vite + Tailwind CSS. Datos guardados en el navegador (localStorage) por ahora; el plan es migrar a Supabase/PostgreSQL.

## Estado

| Etapa | Módulos | Estado |
| --- | --- | --- |
| 1 | Inicio, Stock, Ventas (POS con código de barras, F12 cobrar, Esc cancelar) | ✅ Base lista |
| 2 | Compras, proveedores, clientes | ⏳ |
| 3 | Caja, pagos, cobranzas | ⏳ |
| 4 | Reportes, vencimientos, configuración | ⏳ |

## Correr en local

```bash
npm install
npm run dev
```

## Publicar en GitHub

```bash
git init
git add .
git commit -m "Mi Almacén: base inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mi-almacen.git
git push -u origin main
```

Para la web publicada: en el repo, *Settings → Pages → Source: GitHub Actions*. El workflow `.github/workflows/deploy.yml` la publica en cada push a `main`.

## Lector de códigos de barras

Cualquier lector USB/Bluetooth en modo teclado (HID) funciona: en Ventas, el campo de búsqueda recibe el código y el Enter agrega el producto.

> Los tickets internos no reemplazan una factura fiscal (requeriría integración con ARCA). El modo sin internet hay que desarrollarlo y probarlo expresamente.
