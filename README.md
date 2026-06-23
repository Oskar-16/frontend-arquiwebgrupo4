# TuTrade — Frontend

Frontend del proyecto **TuTrade**, plataforma de trueque de items entre usuarios, desarrollado en Angular para el curso de Arquitectura Web (Grupo 4). Consume la API REST del backend [Arqui-Web-Grupo-4](https://github.com/Francesko217/Arqui-Web-Grupo-4).

## Stack

- Angular 21 (standalone components)
- Angular Material
- Angular SSR (`@angular/ssr`)
- RxJS

## Requisitos previos

- Node.js y npm
- Backend de TuTrade corriendo (ver repositorio del backend) con su base de datos PostgreSQL disponible

## Configuración del entorno

La URL del backend se define en `src/Enviroments/`:

- `enviroments.ts` — entorno de producción, apunta a la API desplegada.
- `enviroments.developments.ts` — entorno de desarrollo local. Ajustar `base` al puerto donde corra el backend local (por defecto `http://localhost:8090`, evitando el `8080` si ya está ocupado por otro servicio).

## Servidor de desarrollo

```bash
npm install
npm start
```

La aplicación queda disponible en `http://localhost:4200/` y se recarga automáticamente al modificar el código fuente.

## Build de producción

```bash
npm run build
```

Los artefactos de build se generan en `dist/`.

## Pruebas

```bash
npm test
```

## Estructura principal

```
src/app/
├── Components/        # Componentes de pantalla (homecomponent, itemcomponent, truequecomponent, etc.)
├── Services/          # Servicios HTTP (Itemservice, Categoryservice, Tradeservice, AuthService)
├── Models/             # Modelos/DTOs del lado del cliente
├── Guards/             # Guards de rutas (autenticación)
└── Interceptors/       # Interceptores HTTP (adjuntan el JWT)
```

## Pantallas principales

| Pantalla | Ruta | Descripción |
|---|---|---|
| Explorar | `/homes` | Catálogo de items disponibles, con búsqueda y filtro por categoría |
| Mis items | `/items/listaritem` | Gestión de items propios: publicar, editar, eliminar |
| Publicar item | `/items/insertaritem` | Formulario de alta de un nuevo item |
| Buscar item | `/items/buscaritem` | Búsqueda de items por título y categoría |
| Trueques | `/trueques` | Propuestas de trueque recibidas y enviadas, con aceptar/rechazar/cancelar |

---

## Avance personal — Miguel

Trabajo realizado en la rama `avance-miguel`:

- **Mis items**: rediseño completo de la tabla (íconos por categoría, chips de estado, badge de plan gratuito con contador de items activos), filtrando por el usuario autenticado vía el token JWT.
- **Explorar**: implementación del catálogo (antes vacío), con buscador, chips de filtro por categoría real del backend y grid de cards.
- **Publicar item**: formulario rediseñado con categorías reales desde `/categories`, condición con etiquetas legibles, y corrección de un bug que rompía la navegación tras publicar.
- **Buscar item**: pantalla implementada desde cero (antes era un placeholder vacío); búsqueda por título con filtro de categoría.
- **Trueques**: pantalla nueva conectada a los endpoints reales del backend (`/trades/received`, `/trades/sent`, `accept`, `reject`, `cancel`), con tabs de Recibidos/Enviados.
- **Navbar**: corrección de alineación, centrado al mismo ancho máximo que el contenido de las páginas.
- **Corrección de bug de estados**: los códigos de `statusItem` estaban mal mapeados (se usaba 0/1/2); el valor real del backend es 1=Disponible, 2=Pausado, 3=Intercambiado.
- **CORS / entorno local**: ajuste del entorno de desarrollo para apuntar al puerto donde corre el backend local sin chocar con otros servicios en uso.
