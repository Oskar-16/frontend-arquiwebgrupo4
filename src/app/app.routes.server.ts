import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // La landing es estática: se prerenderiza para carga instantánea y SEO.
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    // El resto de la app se renderiza en el servidor bajo demanda. Evita exigir
    // getPrerenderParams en rutas con parámetros (p. ej. 'explorar/:id').
    path: '**',
    renderMode: RenderMode.Server,
  },
];
