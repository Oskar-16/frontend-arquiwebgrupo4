import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // La landing es estática: se prerenderiza para carga instantánea y SEO.
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    // El login no requiere sesión, se renderiza en el servidor.
    path: 'login',
    renderMode: RenderMode.Server,
  },
  {
    // El resto son rutas protegidas que dependen del token del navegador; se
    // renderizan en el cliente para no intentar renderizarlas en el server.
    path: '**',
    renderMode: RenderMode.Client,
  },
];
