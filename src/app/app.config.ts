import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor';

/**
 * NG0100 (ExpressionChangedAfterItHasBeenChecked) que dispara Angular Material al
 * recalcular internamente (ink-bar de mat-tab-group / notch de mat-form-field) via
 * ResizeObserver cuando el contenido de un tab cambia de alto (ej. aparece un mensaje
 * de error). Es un chequeo exclusivo de modo desarrollo (no existe en build de
 * producción) y sin este handler quedaba como RuntimeError sin capturar, lo que
 * detenía el ciclo de detección de cambios y dejaba la UI "cargando" para siempre.
 */
class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    const msg = (error as { message?: string } | null)?.message ?? '';
    if (msg.includes('NG0100')) {
      console.warn('[NG0100 ignorado - recalculo interno de Angular Material, solo en dev mode]', msg);
      return;
    }
    console.error(error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    { provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-symbols-outlined' } },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ]
};
